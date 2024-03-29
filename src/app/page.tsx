import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Mint",
      action: "post",
    },
    {
      label: "Credit Card Mint",
      action: "link",
      target: "https://www.crossmint.com/collections/dynamic-nft-frame-46/drop",
    },
    {
      label: "Update NFT",
      action: "post",
      target: `${NEXT_PUBLIC_URL}/api/frame/dynamic`,
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/default.png`,
    aspectRatio: "1.91:1",
  },
  input: {
    text: "Enter your Email Address",
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: "Mint an NFT on Base",
  description: "Mint an NFT on Base",
  openGraph: {
    title: "Mint an NFT on Base",
    description: "Powered by Crossmint and Base",
    images: [`${NEXT_PUBLIC_URL}/default.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Mint an NFT on Base</h1>
    </>
  );
}
