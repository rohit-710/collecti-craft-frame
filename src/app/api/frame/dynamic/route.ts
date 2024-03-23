import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
import { Frame, FrameFlattened } from "frames.js";
import { getFarcasterUserAddress } from "@coinbase/onchainkit/farcaster";
import { randomInt } from "crypto";
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

    if (!message) {
      throw new Error("Message not defined");
    }

    /*if (message.following === false) {
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
    }

    if (input.includes("@")) {
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

    let image = randomInt(1, 6);

    const idempotencyKey = input;
    const crossmintURL = `https://${env}.crossmint.com/api/2022-06-09/collections/${process.env.CROSSMINT_COLLECTION_ID}/nfts/${input}`;
    const crossmintOptions = {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": process.env.CROSSMINT_API_KEY!,
      },
      body: JSON.stringify({
        metadata: {
          name: "Frame NFT on Base",
          image: `${NEXT_PUBLIC_URL}/${image}.png`,
          description:
            "This is an NFT that was minted on Base from a Warpcast Frame using Crossmint",
        },
        reuploadLinkedFiles: true,
      }),
    };

    const response = await fetch(crossmintURL, crossmintOptions);
    await response.json();

    return new NextResponse(
      getFrameHtmlResponse({
        image: {
          src: `${NEXT_PUBLIC_URL}/update.png`,
        },
        buttons: [
          {
            label: "Your NFT image will be updated soon!",
            action: "link",
            target: `https://${env}.crossmint.com//signin?callbackUrl=/user/collection/?utm_source=rohit&utm_medium=github&utm_campaign=frameworks-hack`,
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
