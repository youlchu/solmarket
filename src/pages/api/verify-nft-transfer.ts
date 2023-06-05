import { Metaplex, PublicKey } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { prisma } from "db";
import { getNFTInformation } from "lib/nft";
import { confirmTokenTransferTx } from "lib/server/deposit";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { message: string }>
) {
  try {
    const { address, price, tx } = req.body;

    const { mintAddress, publicKey } = await confirmTokenTransferTx(
      tx,
      price,
      address
    );

    await prisma.token.update({
      where: {
        mintAddress: mintAddress,
      },
      data: {
        isForSale: true,
        price: Number(price),
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
