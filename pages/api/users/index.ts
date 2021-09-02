import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = "https://6130da888066ca0017fdaae8.mockapi.io/api/v1";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log("ping");
    const response = await fetch(`${BASE_URL}/users`);

    if (response.status !== 200) {
      res.status(500);
    }

    const users = await response.json();

    res.status(200).json(users);
  } else if (req.method === "POST") {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify(req.body),
    });

    if (response.status !== 201) {
      res.status(500);
    }

    const newUser = await response.json();

    console.log("new", newUser);

    res.status(201).json({ success: "ok" });
  }
};
