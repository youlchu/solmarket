import { createTransferTokenTx } from "lib/server/deposit";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  unsignedTx: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { message: string }>
) {
  try {
    const { address, publicKey, price } = req.body;

    const unsignedTx = await createTransferTokenTx(publicKey, price, address);

    res.json({
      unsignedTx,
    });
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ message: error?.response?.data?.message || error.message });
  }
}
