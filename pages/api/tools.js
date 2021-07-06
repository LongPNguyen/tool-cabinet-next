import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const tools = await db
    .collection("tools")
    .find({})
    .toArray();

  res.json(tools);
};