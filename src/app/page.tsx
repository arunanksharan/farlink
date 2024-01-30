import { Metadata } from 'next';
import Image from 'next/image';

const postUrl = `${process.env['HOST']}/api/jobs`;

export async function generateMetadata(): Promise<Metadata> {
  // const imageUrl = `${process.env['HOST']}/images/welcome.png`;
  const imageUrl = 'https://farlink.vercel.app/images/welcome.png';
  return {
    title: 'Farlink',
    description: 'One Click Web3 Jobs!',
    openGraph: {
      title: 'Farlink',
      images: [imageUrl],
    },
    other: {
      'fc:frame': 'vNext',
      'fc:frame:image': imageUrl,
      'fc:frame:post_url': postUrl,
      'fc:frame:button:1': 'Solidity',
      'fc:frame:button:2': 'Fullstack',
      'fc:frame:button:3': 'Devrel',
      'fc:frame:button:4': 'More',
    },
  };
}

export default function Home() {
  return (
    <div className="relative min-w-full min-h-screen flex flex-col items-center justify-center m-0 p-0">
      <Image
        src="/images/more.png"
        layout="fill"
        objectFit="cover"
        alt="Hero Image"
        priority
        className=" bg-black absolute w-full h-full"
      />
    </div>
  );
}
