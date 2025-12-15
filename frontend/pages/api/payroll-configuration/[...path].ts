import type { NextApiRequest, NextApiResponse } from 'next';

const BACKEND_BASE_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'http://localhost:3001';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const rawPath = req.query.path;
    const parts = Array.isArray(rawPath)
      ? rawPath
      : typeof rawPath === 'string'
        ? [rawPath]
        : [];

    const queryString = req.url?.split('?')[1];
    const targetUrl = `${BACKEND_BASE_URL}/payroll-configuration/${parts
      .map(encodeURIComponent)
      .join('/')}${queryString ? `?${queryString}` : ''}`;

    const method = (req.method ?? 'GET').toUpperCase();

    const upstreamRes = await fetch(targetUrl, {
      method,
      headers: {
        // keep it intentionally minimal
        'content-type': 'application/json',
      },
      body:
        method === 'GET' || method === 'HEAD'
          ? undefined
          : JSON.stringify(req.body ?? {}),
    });

    const contentType = upstreamRes.headers.get('content-type') ?? '';
    const bodyText = await upstreamRes.text();

    res.status(upstreamRes.status);
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    // Send raw text to preserve backend error payloads
    res.send(bodyText);
  } catch (err: any) {
    res.status(500).json({
      message: 'Proxy error while contacting backend payroll-configuration API',
      error: err?.message ?? String(err),
    });
  }
}
