import jwt, { Secret } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

const secretKey = process.env.JWT_SECRET as string;

const authUser = async (
  req: NextApiRequest,
  res: NextApiResponse<{ msg: string } | { token: string }>
) => {
  try {
    const token = req.headers["x-auth-token"] as string;
    try {
      jwt.verify(token, secretKey as Secret);
      res.status(200).json({ token });
    } catch (err) {
      res.status(400).json({ msg: "Invalid token" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

export default authUser;
