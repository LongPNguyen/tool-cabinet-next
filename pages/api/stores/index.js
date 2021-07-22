import dbConnect from "../../../util/mongodb";
import Stores from "../../../models/Stores";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  const session = await getSession({ req });

  switch (method) {
    case "GET":
      try {
        const stores = await Stores.find({
          owner: session?.id,
        }); /* find all the data in our database */
        res.status(200).json({ success: true, data: stores });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const store = await Stores.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: store });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
