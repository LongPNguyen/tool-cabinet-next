import dbConnect from "../../../util/mongodb";
import Tools from "../../../models/Tool";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  const session = await getSession({ req });

  switch (method) {
    case "GET":
      try {
        const tools = await Tools.find({
          ownerId: session?.id,
        }); /* find all the data in our database */
        res.status(200).json({ success: true, data: tools });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
