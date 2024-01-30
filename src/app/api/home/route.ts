// Steps 1. import getFrameMessage from @coinbase/onchainkit
import { getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

const imageUrl = 'https://farlink.vercel.app/images/welcome.png';
const postUrl = 'https://farlink.vercel.app/api/jobs';

async function getHomeResponse(req: NextRequest): Promise<NextResponse> {
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Farlinked!</title>
        <meta property="og:title" content="Farlink!" />
        <meta property="og:image" content="${imageUrl}" />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="${imageUrl}" />
        <meta name="fc:frame:post_url" content="${postUrl}" />
        <meta name="fc:frame:button:1" content="Solidity" />
        <meta name="fc:frame:button:2" content="Fullstack" />
        <meta name="fc:frame:button:3" content="Devrel" />
        <meta name="fc:frame:button:4" content="More" />
      </head>
      <body>Farlink</body>
    </html>`,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getHomeResponse(req);
}

export const dynamic = 'force-dynamic';
export const GET = POST;
