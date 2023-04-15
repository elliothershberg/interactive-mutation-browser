import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Sequence seen on server: ", req.body.sequence);

  const response = await fetch(
    "https://api.esmatlas.com/foldSequence/v1/pdb/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: req.body.sequence,
    }
  );

  const data = await response.text();

  res.json({ message: data });
}
