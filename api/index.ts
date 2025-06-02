import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Express } from 'express';

import { bootstrap } from 'src/vercel.bootstrap';

const serverPromise: Promise<Express> = bootstrap();

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  const app: Express = await serverPromise;

  app(req, res);
}
