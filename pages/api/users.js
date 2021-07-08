import { dbConnect } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await dbConnect();

  const users = await db
    .collection("users")
    .find({})
    .toArray();

  res.json(users);
};