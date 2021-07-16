import dbConnect from '../../../util/mongodb';
import Users from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const users = await Users.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}