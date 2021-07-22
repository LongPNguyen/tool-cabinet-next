import dbConnect from "../../../util/mongodb";
import Users from "../../../models/User";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "PUT" /* Edit a model by its ID */:
      try {
        const user = await Users.findByIdAndUpdate(session.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
