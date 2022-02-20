// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/db";

type Data = {
  name: string;
};

const registerUser = async (
  _: NextApiRequest,
  res: NextApiResponse<Data | string>
) => {
  const { db } = await connectToDatabase();
  try {
    const users = await db.collection("users").find({}).toArray();
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

export default registerUser;
