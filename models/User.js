import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    image: String,
    email: String,
    phone: String,
    bio: String,
    business: Boolean
})

module.exports = mongoose.models.Users || mongoose.model('Users', UserSchema);