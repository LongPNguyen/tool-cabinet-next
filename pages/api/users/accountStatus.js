import dbConnect from '../../../util/mongodb'
import Users from '../../../models/User'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  const session = await getSession({req})
  const {
      method
    } = req
  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const user = await Users.findById(session?.id)
        if (!user) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: user.business })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
