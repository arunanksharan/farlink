// import { Metadata } from 'next';
// import Image from 'next/image';

// const postUrl = `${process.env['HOST']}/api/jobs`;

// export async function generateMetadata(): Promise<Metadata> {
//   // const imageUrl = `${process.env['HOST']}/images/welcome.png`;
//   const imageUrl = 'https://farlink.vercel.app/images/welcome.png';
//   return {
//     title: 'Farlink',
//     description: 'One Click Web3 Jobs!',
//     openGraph: {
//       title: 'Farlink',
//       images: [imageUrl],
//     },
//     other: {
//       'fc:frame': 'vNext',
//       'fc:frame:image': imageUrl,
//       'fc:frame:post_url': postUrl,
//       'fc:frame:button:1': 'Solidity',
//       'fc:frame:button:2': 'Fullstack',
//       'fc:frame:button:3': 'Devrel',
//       'fc:frame:button:4': 'More',
//     },
//   };
// }

// export default function Home() {
//   return (
//     <div className="relative min-w-full min-h-screen flex flex-col items-center justify-center m-0 p-0">
//       <Image
//         src="/images/more.png"
//         layout="fill"
//         objectFit="cover"
//         alt="Hero Image"
//         priority
//         className=" bg-black absolute w-full h-full"
//       />
//     </div>
//   );
// }

// pages/order.js
import Head from 'next/head';

const Home = () => {
  const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta property="og:title" content="Cookiecaster" />
    <meta property="og:image" content="https://cookiecaster.vercel.app/images/welcome.png" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://cookiecaster.vercel.app/images/welcome.png" />
    <meta property="fc:frame:button:1" content="Samoas®" />
    <meta property="fc:frame:button:2" content="Tagalongs®" />
    <meta property="fc:frame:button:3" content="Thin Mints®" />
    <meta property="fc:frame:button:4" content="Trefoils®" />
  </head>
</html>
  `;

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <div>
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {htmlContent}
        </pre>
      </div>
    </>
  );
};

export default Home;
