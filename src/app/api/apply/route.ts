// Steps 1. import getFrameMessage from @coinbase/onchainkit
import { getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../utils/supabaseClient';

type ButtonIndexToJDInterface = Record<number, string>;

const buttonIndexToJDImageMap: ButtonIndexToJDInterface = {
  1: 'success.png',
  2: 'welcome.png',
};

const postUrl = `${process.env.HOST}/api/home`;
const errorImageUrl = `${process.env.HOST}/images/error.png`;

async function getApplyResponse(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();

  const { isValid, message } = await getFrameMessage(body);

  if (isValid) {
    const { buttonIndex, castId, fid } = message;

    // Write to supabase database

    // Use imageUrl
    const fileName = buttonIndexToJDImageMap[buttonIndex];
    const imageUrl: string = `${process.env.HOST}/images/${fileName}`;
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
        <meta name="fc:frame:button:1" content="Home" />
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
  } else {
    // sorry, the message is not valid and it will be undefined
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Farlinked!</title>
          <meta property="og:title" content="Farlink!" />
          <meta property="og:image" content="${errorImageUrl}" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="${errorImageUrl}" />
          <meta name="fc:frame:post_url" content="${postUrl}" />
          <meta name="fc:frame:button:1" content="Home" />
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
}

export async function POST(req: NextRequest): Promise<Response> {
  return getApplyResponse(req);
}

export const dynamic = 'force-dynamic';
