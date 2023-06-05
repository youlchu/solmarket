import { Metaplex, PublicKey } from "@metaplex-foundation/js";
import { createTransfer } from "@solana/pay";
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import bs58 from "bs58";
import { prisma } from "db";
import { getNFTInformation } from "lib/nft";
import { confirmTokenTransferTx } from "lib/server/deposit";
import type { NextApiRequest, NextApiResponse } from "next";

const fromKeypair = Keypair.fromSecretKey(
  bs58.decode(process.env.WALLET as string)
);
type Data = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { message: string }>
) {
  try {
    const { mintAddress } = req.body;
    const connection = new Connection(clusterApiUrl("devnet"), "finalized");

    const creator = (
      await prisma.userToken.findFirst({
        where: {
          token: {
            mintAddress: mintAddress,
          },
        },
        select: {
          user: {
            select: {
              publicKey: true,
            },
          },
        },
      })
    )?.user.publicKey;

    const transaction = await createTransfer(
      connection,
      fromKeypair.publicKey,
      {
        recipient: new PublicKey(creator as string),
        amount: BigNumber(1),
        splToken: new PublicKey(mintAddress),
      }
    );

    transaction.partialSign(fromKeypair);

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    const signature = await connection.sendRawTransaction(
      transaction.serialize(),
      {
        skipPreflight: true,
        preflightCommitment: "confirmed",
        minContextSlot,
      }
    );

    await connection.confirmTransaction(
      {
        signature,
        blockhash: transaction.recentBlockhash as string,
        lastValidBlockHeight,
      },
      "confirmed"
    );

    await prisma.token.update({
      where: {
        mintAddress,
      },
      data: {
        isForSale: false,
        price: 0,
      },
    });

    res.status(200).json({
      ok: true,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error?.response?.data?.message || error.message });
  }
}
