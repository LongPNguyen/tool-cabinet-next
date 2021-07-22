import dbConnect from "../../../util/mongodb";
import Leads from "../../../models/Leads";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  await dbConnect();
  const session = await getSession({ req });
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const leads = await Leads.find({
          owner: session.id,
        }); /* find all the data in our database */
        res.status(200).json({ success: true, data: leads });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
