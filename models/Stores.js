import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    owner: String,
    name: String,
    image: String,
    email: String,
    phone: String,
    address: String,
    description: String,
    website: String
})

module.exports = mongoose.models.Stores || mongoose.model('Stores', StoreSchema);