import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/db";
import { UserCredentials } from "../../../types/user";
import bcrypt from "bcrypt";

const saltRounds = Number(process.env.SALT_ROUNDS);
const mongoCollection: string | undefined = process.env.MONGODB_COLLECTION;

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<UserCredentials | { msg: string }>
) => {
  const { db } = await connectToDatabase();
  const { email, password }: UserCredentials = await req.body;
  try {
    const isEmailInUse = await db
      .collection(mongoCollection)
      .findOne({ email });
    if (isEmailInUse)
      return res.status(400).json({ msg: "Email already exists" });

    const hashedPassword = await encryptPassword(password);
    const user = { email, password: hashedPassword };

    await db.collection(mongoCollection).insertOne(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export default registerUser;
