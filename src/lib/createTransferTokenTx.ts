import { AnchorWallet } from '@solana/wallet-adapter-react';
import { Transaction } from '@solana/web3.js';
import { SaleAPIType } from 'assets/data/variables';
import axios from 'axios';

export const createTokenTransferTx = async (
  wallet: AnchorWallet,
  address: string,
  price: Number
) => {
  const pk = wallet.publicKey;

  const { unsignedTx } = (
    await axios.post('/api/create-nft-transfer', {
      address,
      publicKey: pk.toBase58(),
      price,
    })
  ).data;

  const uParseTx = Transaction.from(Buffer.from(unsignedTx, 'base64'));

  const tx = await wallet.signTransaction(uParseTx);

  const txBase64 = Buffer.from(tx.serialize()).toString('base64');

  const { confirmedTx } = (
    await axios.post('/api/verify-nft-transfer', {
      publicKey: pk.toBase58(),
      tx: txBase64,
      price,
      address,
    })
  ).data;
};

export const createSaleTransferTx = async (wallet: AnchorWallet, address: string) => {
  const pk = wallet.publicKey;

  const { unsignedTx } = (
    await axios.post('/api/sale-tx', {
      mintAddress: address,
      pb: pk.toBase58(),
      type: SaleAPIType.CREATE,
    })
  ).data;

  const uParseTx = Transaction.from(Buffer.from(unsignedTx, 'base64'));

  const tx = await wallet.signTransaction(uParseTx);

  const txBase64 = Buffer.from(tx.serialize()).toString('base64');

  console.log(txBase64);

  const { confirmedTx } = (
    await axios.post('/api/sale-tx', {
      publicKey: pk.toBase58(),
      tx: txBase64,
      mintAddress: address,
      type: SaleAPIType.CONFIRM,
    })
  ).data;
};
