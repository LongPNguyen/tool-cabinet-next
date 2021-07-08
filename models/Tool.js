import mongoose from 'mongoose'

const toolSchema = mongoose.Schema({
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
        type: Number
    },
    depositPrice: {
        type: Number
    },
    damagePrice: {
        type: Number
    },
    category: {
        type: Number
    },
    tags: [String],
    images: [String],
    rating: {
        type: Number,
        stars: 0,
        people: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    outDate: {
        type: Date
    },
    returnDate: {
        type: Date
    },
    status: {
        type: String
    },
    featured: {
        type: Boolean,
    },
})

export default mongoose.model.Tool || mongoose.model('Tool', toolSchema);