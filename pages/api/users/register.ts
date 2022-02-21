import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/db";
import { UserCredentials } from "../../../types/user";

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<UserCredentials | string>
) => {
  const { db } = await connectToDatabase();
  const { email, password }: UserCredentials = await req.body;
  try {
    const user = { email, password };
    await db.collection("users").insertOne(user);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

export default registerUser;
