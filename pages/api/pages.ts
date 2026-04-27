import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllPages } from '../../lib/getPages';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const pages = getAllPages();
  res.status(200).json(pages);
}
