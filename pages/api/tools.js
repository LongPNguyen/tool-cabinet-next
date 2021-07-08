import dbConnect from '../../util/mongodb';
import Tools from '../../models/Tool';

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const tools = await Tools.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: tools })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const tool = await Tools.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: tool })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}