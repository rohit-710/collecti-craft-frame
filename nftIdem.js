const options = {
  method: "POST",
  headers: {
    "X-API-KEY":
      "sk_staging_247o7LZej21ZDW1cnL9STtLEiAtgBYmK6JaT3raAyphQBnPQK1se3isoNxR8aracxnap6AYBfAGUaAj1TLctnLVJ31hPCfLWhLqrpki7ggkrM4qsCJW6J3ri7qbNSKrZ6Tr1UobYXsWMb2oH72Jxmha3kCGvdBa91UNccBDXvY8pWA9J5bhsvN5EuUXkZqdeQd4aX9eWTRrqviogN2rrJfn",
    "Content-Type": "application/json",
  },
  body: '{"reuploadLinkedFiles":true,"metadata":{"description":"This is an NFT that was minted on Base from a Warpcast Frame using Crossmint","image":"https://base-frame-xi.vercel.app/nft.png","name":"Frame NFT on Base"},"recipient":"email:rrohitramesh710@gmail.com:base"}',
};

fetch(
  "https://staging.crossmint.com/api/2022-06-09/collections/d4f84d96-feb7-411b-bf09-c3dc0cd8f619/nfts/rrohitramesh710%40gmail.com",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
