import { Metaplex, PublicKey } from '@metaplex-foundation/js';
import { createTransfer, validateTransfer } from '@solana/pay';
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { Connection, Keypair, Transaction, clusterApiUrl } from '@solana/web3.js';
import { SaleAPIType } from 'assets/data/variables';
import BigNumber from 'bignumber.js';
import bs58 from 'bs58';
import { prisma } from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  unsignedTx: string;
};

type Input = {
  type: SaleAPIType;
  mintAddress: string;
};

type CreateSaleInput = {
  pb: string;
  type: SaleAPIType;
};

type ConfirmSaleInput = {
  tx: string;
  publicKey: string;
};

const fromKeypair = Keypair.fromSecretKey(bs58.decode(process.env.WALLET as string));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { message: string } | { ok: boolean }>
) {
  try {
    const { type, mintAddress }: Input = req.body;

    const token = await prisma.token.findFirst({
      where: {
        mintAddress,
      },
    });

    if (!token) throw new Error('Token not found');

    if (type === SaleAPIType.CREATE) {
      const { pb }: CreateSaleInput = req.body;

      const publicKey = new PublicKey(pb as string);
      const connection = new Connection(clusterApiUrl('devnet'), 'finalized');

      let transactionForSolana = await createTransfer(connection, publicKey, {
        recipient: fromKeypair.publicKey,
        amount: BigNumber(token.price),
      });

      await getOrCreateAssociatedTokenAccount(
        connection,
        fromKeypair,
        new PublicKey(mintAddress),
        publicKey
      );

      let transactionForToken = await createTransfer(connection, fromKeypair.publicKey, {
        recipient: publicKey,
        amount: BigNumber(1),
        splToken: new PublicKey(mintAddress),
      });

      let transaction = new Transaction();

      transaction.add(transactionForSolana);
      transaction.add(transactionForToken);

      transaction.recentBlockhash = transactionForSolana.recentBlockhash;
      transaction.feePayer = publicKey;
      transaction.partialSign(fromKeypair);

      const serialized = transaction.serialize({
        verifySignatures: false,
        requireAllSignatures: false,
      });
      const base64 = serialized.toString('base64');

      res.status(200).json({ unsignedTx: base64 });
    } else if (type === SaleAPIType.CONFIRM) {
      const { tx, publicKey }: ConfirmSaleInput = req.body;

      const transaction = Transaction.from(Buffer.from(tx, 'base64'));
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const signature = await connection.sendRawTransaction(transaction.serialize(), {
        skipPreflight: true,
        preflightCommitment: 'confirmed',
        minContextSlot,
      });

      await connection.confirmTransaction(
        {
          signature,
          blockhash: transaction.recentBlockhash as string,
          lastValidBlockHeight,
        },
        'confirmed'
      );

      const user = await prisma.user.upsert({
        where: {
          publicKey: publicKey as string,
        },
        create: {
          publicKey: publicKey as string,
        },
        update: {},
      });

      await prisma.userToken.updateMany({
        where: {
          token: {
            mintAddress,
          },
        },
        data: {
          userId: user.id,
        },
      });

      await prisma.token.update({
        where: {
          mintAddress,
        },
        data: {
          price: 0,
          isForSale: false,
        },
      });

      res.status(200).json({ ok: true });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error?.response?.data?.message || error.message });
  }
}
