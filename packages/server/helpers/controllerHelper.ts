import type { Response } from 'express';

export async function tryCatch(
  response: Response,
  callback: () => Promise<void>,
) {
  try {
    await callback();
  } catch (error) {
    response.status(500).json({ error: (error as Error).message });
  }
}
