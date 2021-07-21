import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    image: String,
    email: String,
    store: String,
    storeAddress: String,
    storeDescription: String,
    storeImage: String,
    storeNumber: String,
    storeWebSite: String,
    business: Boolean
})

module.exports = mongoose.models.Users || mongoose.model('Users', UserSchema);