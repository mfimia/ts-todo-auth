import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/db";
import { UserCredentials } from "../../../types/user";
import bcrypt from "bcrypt";

const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<UserCredentials | string>
) => {
  const { db } = await connectToDatabase();
  const { email, password }: UserCredentials = await req.body;
  try {
    const hashedPassword = await encryptPassword(password);
    const user = { email, password: hashedPassword };
    await db.collection("users").insertOne(user);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export default registerUser;
