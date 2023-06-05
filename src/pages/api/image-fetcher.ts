// api/imageFetcher.js

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (Array.isArray(url)) {
    return res.status(400).send('Multiple URLs not supported');
  }

  if (!url) {
    return res.status(400).send('Missing URL parameter');
  }

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    res.setHeader('Content-Type', 'application/octet-stream');
    return res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Error fetching image:', error);
    return res.status(500).send('Error fetching image');
  }
}
