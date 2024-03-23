import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
import { getFarcasterUserAddress } from "@coinbase/onchainkit/farcaster";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  let input: string | undefined = "";
  let recipientAddress = "";
  let isEmail = false;
  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
  const body: FrameRequest = await req.json();
  const env = process.env.CROSSMINT_ENV || "staging";

  try {
    const { message } = await getFrameMessage(body);

    /*if (message.liked === false || message.recasted === false) {
      return new NextResponse(
        getFrameHtmlResponse({
          image: {
            src: `${NEXT_PUBLIC_URL}/error1.png`,
            aspectRatio: "1.91:1",
          },
          buttons: [
            {
              label: "Refresh and try again!",
            },
          ],
        })
      );
    }*/
    if (message?.input) {
      input = message.input;
    } else if (input.includes("@")) {
      recipientAddress = `email:${input}:base`;
      isEmail = true;
    }

    if (!input) {
      return new NextResponse(
        getFrameHtmlResponse({
          image: {
            src: `${NEXT_PUBLIC_URL}/error2.png`,
          },
          ogTitle: "Error! Please enter a valid email address!",
        })
      );
    }

    /*if (!input) {
      input = (body.untrustedData as any).address;
      recipientAddress = `base:${input}`;
    }*/

    //recipientAddress = `astar-zkevm:${input}`;

    const idempotencyKey = input;
    const crossmintURL = `https://${env}.crossmint.com/api/2022-06-09/collections/${process.env.CROSSMINT_COLLECTION_ID}/nfts`;
    const crossmintOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": process.env.CROSSMINT_API_KEY!,
      },
      body: JSON.stringify({
        recipient: recipientAddress,
        metadata: {
          name: "Frame NFT on Base",
          image: `${NEXT_PUBLIC_URL}/nft.png`,
          description:
            "This is an NFT that was minted on Base from a Warpcast Frame using Crossmint",
        },
      }),
    };

    const response = await fetch(crossmintURL, crossmintOptions);
    await response.json();

    return new NextResponse(
      getFrameHtmlResponse({
        image: {
          src: `${NEXT_PUBLIC_URL}/success.png`,
        },
        buttons: [
          isEmail
            ? {
                label:
                  "Your NFT will be delivered to your Email wallet address soon!",
                action: "link",
                target: `https://${env}.crossmint.com/user/collection`,
              }
            : {
                label:
                  "Your NFT will be delivered to your connected EVM wallet soon!",
              },
        ],
      })
    );
  } catch (error) {
    return new NextResponse(
      getFrameHtmlResponse({
        image: {
          src: `${NEXT_PUBLIC_URL}/error.png`,
        },
        ogTitle: "Error",
      })
    );
  }
}

export const dynamic = "force-dynamic";
