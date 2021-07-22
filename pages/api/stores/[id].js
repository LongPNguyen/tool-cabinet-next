import dbConnect from "../../../util/mongodb";
import Stores from "../../../models/Stores";

export default async function handler(req, res) {
  await dbConnect();
  const {
    query: { id },
    method,
  } = req;

  console.log(id)

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const store = await Stores.findById(id);
        if (!store) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: store });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const store = await Stores.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!store) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: store });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedStore = await Stores.deleteOne({ _id: id });
        if (!deletedStore) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
