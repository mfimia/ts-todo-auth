import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, mongoCollection } from "../../../lib/db";
import { EmailsList } from "../../../types/credentials";

const listEmails = async (
  _: NextApiRequest,
  res: NextApiResponse<EmailsList | { msg: string }>
) => {
  const { db } = await connectToDatabase();

  try {
    const emails = await db
      .collection(mongoCollection)
      .aggregate([
        { $sort: { created_at: -1 } },
        { $project: { email: 1, _id: 0 } },
      ])
      .toArray();

    res.status(200).json(emails as EmailsList);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

export default listEmails;
