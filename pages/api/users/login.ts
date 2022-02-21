import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/db";
import { UserCredentials } from "../../../types/user";

const mongoCollection: string | undefined = process.env.MONGODB_COLLECTION;

const loginUser = async (
  req: NextApiRequest,
  res: NextApiResponse<{ msg: string } | { token: string }>
) => {
  const { db } = await connectToDatabase();
  const { email, password }: UserCredentials = await req.body;

  try {
    const user = await db.collection(mongoCollection).findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "Invalid Credentials" });

    const token = jwt.sign(user, process.env.JWT_SECRET as Secret);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

export default loginUser;
