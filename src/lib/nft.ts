import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

export const getNFTInformation = async (mintAddress: PublicKey) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const metaplex = Metaplex.make(connection);

  const getToken = await metaplex.nfts().findByMint({
    mintAddress,
  });

  const publicKey = getToken.updateAuthorityAddress?.toBase58();
  const originalMintAddress = getToken.mint.address.toBase58();

  return {
    creator: publicKey,
    mintAddress: originalMintAddress,
    name: getToken.name,
    symbol: getToken.symbol,
    image: getToken.json?.image as string,
  };
};
