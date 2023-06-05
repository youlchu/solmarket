import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  imageUri?: string;
  prompt: string;
};

import openai from 'lib/openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { message: string }>
) {
  try {
    let { prompt } = req.query;
    prompt = prompt as string;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
    });

    const imageUri = response.data.data[0].url;

    res.status(200).json({
      imageUri,
      prompt,
    });
  } catch (error: any) {
    res.status(500).json({ message: error?.response?.data?.message || error.message });
  }
}
