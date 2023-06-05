import { PublicKey } from "@metaplex-foundation/js";
import { createTransfer, validateTransfer } from "@solana/pay";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

import {
  Connection,
  Keypair,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";

import BigNumber from "bignumber.js";
import bs58 from "bs58";

// walletı web3 objesine çevir
const fromKeypair = Keypair.fromSecretKey(
  bs58.decode(process.env.WALLET as string)
);

export const createTransferTokenTx = async (
  pk: string,
  amount: number,
  mintAddress: string
) => {
  const publicKey = new PublicKey(pk);
  const connection = new Connection(clusterApiUrl("devnet"), "finalized");

  console.log(fromKeypair.publicKey.toBase58());

  const test = await getOrCreateAssociatedTokenAccount(
    connection,
    fromKeypair,
    new PublicKey(mintAddress),
    fromKeypair.publicKey
  );

  let transaction = await createTransfer(connection, publicKey, {
    recipient: fromKeypair.publicKey,
    amount: BigNumber(1),
    splToken: new PublicKey(mintAddress),
  });

  transaction = Transaction.from(
    transaction.serialize({
      verifySignatures: false,
      requireAllSignatures: false,
    })
  );

  const serialized = transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  });
  const base64 = serialized.toString("base64");

  return base64;
};

export const confirmTokenTransferTx = async (
  tx: string,
  amount: number,
  mintAddress: string
) => {
  console.log({ tx, amount, mintAddress });
  const transaction = Transaction.from(Buffer.from(tx, "base64"));
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

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

  await validateTransfer(connection, signature, {
    recipient: fromKeypair.publicKey,
    amount: BigNumber(1),
    splToken: new PublicKey(mintAddress),
  });

  return {
    ok: true,
    amount,
    mintAddress,
    signature,
    publicKey: transaction.signatures[0].publicKey.toBase58(),
  };
};
