import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Express } from 'express';
import { bootstrap } from '../dist/src/vercel.bootstrap';

let server: Express | undefined;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (!server) {
    server = await bootstrap();
  }

  server(req, res);
}
