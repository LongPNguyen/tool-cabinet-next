import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ToolSchema = new Schema({
    ownerId: {
        type: String
    },
    ownerName: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    pricePerDay: {
        type: String
    },
    depositPrice: {
        type: String
    },
    damagePrice: {
        type: String
    },
    category: {
        type: String
    },
    tags: [String],
    images: {
        String
    },
    rating: {
        type: String
    },
    outDate: {
        type: String
    },
    returnDate: {
        type: String
    },
    status: {
        type: String
    },
    featured: {
        type: Boolean,
    },
})

module.exports = mongoose.models.Tools || mongoose.model('Tools', ToolSchema);