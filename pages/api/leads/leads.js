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
          leadId: session?.id,
        }); /* find all the data in our database */
        res.status(200).json({ success: true, data: leads });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const leads = await Leads.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: leads });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const leads = await Leads.findByIdAndUpdate(
          req.body.id,
          req.body.toolStatus,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!leads) {
          return res.status(400).json({ success: false });
        }
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
