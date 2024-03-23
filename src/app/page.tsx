// app/page.tsx
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata() {
  return {
    title: "My page",
    // provide full URL to your /frames endpoint
    ...(await fetchMetadata(
      new URL(
        "/frames",
        process.env.VERCEL_URL || "https://base-frame-xi.vercel.app"
      )
    )),
  };
}

export default function Page() {
  return <span>My existing page</span>;
}
