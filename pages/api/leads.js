import dbConnect from '../../util/mongodb';
import Leads from '../../models/Leads';

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const leads = await Leads.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: leads })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        const leads = await Leads.create(
            req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: leads })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }

}