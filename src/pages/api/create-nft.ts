import { Metaplex, PublicKey } from "@metaplex-foundation/js";
import { prisma } from "db";
import { CreateNFTInput } from "hooks/useNFT";
import { getNFTInformation } from "lib/nft";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { message: string }>
) {
  try {
    const { address, price, description }: CreateNFTInput = req.body;
    const mintAddress = new PublicKey(address as string);

    const token = await getNFTInformation(mintAddress);

    await prisma.userToken.create({
      data: {
        user: {
          connectOrCreate: {
            where: {
              publicKey: token.creator,
            },
            create: {
              publicKey: token.creator,
            },
          },
        },
        token: {
          connectOrCreate: {
            where: {
              mintAddress: token.mintAddress,
            },
            create: {
              mintAddress: token.mintAddress,
              name: token.name,
              symbol: token.symbol,
              description,
              price: Number(price),
              image: token.image as string,
            },
          },
        },
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
