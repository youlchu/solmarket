import { prisma } from "db";
import type { NextApiRequest, NextApiResponse } from "next";

export type INFT = {
  id?: string;
  mintAddress: string;
  name: string;
  image: string;
  symbol?: string;
  creator: string;
  price?: number;
  description: string;
  isForSale?: boolean;
};

export type INFTList = {
  user: {
    publicKey: string;
  };
  token: {
    id: string;
    mintAddress: string;
    image: string;
    name: string;
    symbol?: string;
  };
};

export type INFTQueryFilter = {
  isForSale?: boolean;
  isHighlighted?: boolean;
  creator?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<INFT[] | { message: string }>
) {
  try {
    const { isForSale, isHighlighted, creator }: INFTQueryFilter = req.query;

    let where = {
      token: {},
      user: {},
    };

    if (isForSale) where.token = { ...where.token, isForSale: true };
    if (isHighlighted) where.token = { ...where.token, isHighlighted: true };
    if (creator) where.user = { ...where.user, publicKey: creator };

    const nfts = await prisma.userToken.findMany({
      where: {
        ...where,
      },
      select: {
        user: {
          select: {
            publicKey: true,
          },
        },
        token: {
          select: {
            id: true,
            mintAddress: true,
            image: true,
            name: true,
            symbol: true,
            price: true,
            description: true,
            isForSale: true,
          },
        },
      },
    });

    const listedNFTs = nfts.map((nft) => ({
      ...nft.token,
      creator: nft.user.publicKey,
    }));

    res.json(listedNFTs as INFT[]);
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ message: error?.response?.data?.message || error.message });
  }
}
