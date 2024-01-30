// Steps 1. import getFrameMessage from @coinbase/onchainkit
import { supabase } from '../../../utils/supabaseClient';
import { getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

type ButtonIndexToJDInterface = Record<number, string>;

const buttonIndexToJDImageMap: ButtonIndexToJDInterface = {
  1: 'solidity.png',
  2: 'fullstack.png',
  3: 'devrel.png',
  4: 'more.png',
};

// const postUrlApply = `${process.env.HOST}/api/apply`;
// const postUrlHome = `${process.env.HOST}/api/home`;
// const errorImageUrl = `${process.env.HOST}/images/error.png`;

const postUrlApply = 'https://farlink.xyz/api/apply';
const postUrlHome = 'https://farlink.xyz/api/home';
const errorImageUrl = 'https://farlink.xyz/images/error.png';

async function getJobsResponse(req: NextRequest): Promise<NextResponse> {
  // Step 2. Read the body from the Next Request
  const body = await req.json();
  console.log('Inside jobs body:', body);
  const { untrustedData: message } = body;
  // Step 3. Validate the message
  // const { isValid, message } = await getFrameMessage(body);
  // console.log('Inside jobs isValid:', isValid);
  console.log('Inside jobs message:', message);

  // Step 4. Determine the experience based on the validity of the message
  // if (isValid) {
  // the message is valid
  const { buttonIndex, fid } = message;
  const fileName = buttonIndexToJDImageMap[buttonIndex];
  const imageUrl: string = `https://farlink.xyz/images/${fileName}`;
  const { data, error } = await supabase
    .from('applications')
    .insert([{ fc_id: fid, job_id: fileName }])
    .select();
  console.log('line 76 Inside jobs error:', { fc_id: fid, job_id: fileName });

  console.log('line 78 Inside jobs data:', data);

  if (buttonIndex === 4) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Farlinked!</title>
          <meta property="og:title" content="Farlink!" />
          <meta property="og:image" content="${imageUrl}" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="${imageUrl}" />
          <meta name="fc:frame:post_url" content="${postUrlHome}" />
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

  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Farlinked!</title>
        <meta property="og:title" content="Farlink!" />
        <meta property="og:image" content="${imageUrl}" />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="${imageUrl}" />
        <meta name="fc:frame:post_url" content="${postUrlApply}" />
        <meta name="fc:frame:button:1" content="Apply" />
        <meta name="fc:frame:button:2" content="Home" />
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
  // } else {
  // sorry, the message is not valid and it will be undefined
  // return new NextResponse(
  //   `<!DOCTYPE html>
  //     <html>
  //       <head>
  //         <title>Farlinked!</title>
  //         <meta property="og:title" content="Farlink!" />
  //         <meta property="og:image" content="${errorImageUrl}" />
  //         <meta name="fc:frame" content="vNext" />
  //         <meta name="fc:frame:image" content="${errorImageUrl}" />
  //         <meta name="fc:frame:post_url" content="${postUrlHome}" />
  //         <meta name="fc:frame:button:1" content="Home" />
  //       </head>
  //       <body>Farlink</body>
  //     </html>`,
  //   {
  //     status: 200,
  //     headers: {
  //       'Content-Type': 'text/html',
  //     },
  //   }
  // );
  // }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getJobsResponse(req);
}
export const GET = POST;

export const dynamic = 'force-dynamic';
