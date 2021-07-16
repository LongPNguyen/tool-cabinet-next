import dbConnect from '../../../util/mongodb'
import Tools from '../../../models/Tool'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const tool = await Tools.findById(id)
        if (!tool) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: tool })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const tool = await Tools.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!tool) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: tool })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedTool = await Tools.deleteOne({ _id: id })
        if (!deletedTool) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
