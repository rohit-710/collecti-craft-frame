import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Mint to an email address",
      action: "post",
    },
    {
      label: "Mint with Credit Card",
      action: "link",
      target:
        "https://staging.crossmint.com/collections/dynamic-nft-frame/drop",
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
