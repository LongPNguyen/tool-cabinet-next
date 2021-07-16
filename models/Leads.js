import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const LeadSchema = new Schema({
    toolId: {
        type: String
    },
    owner: {
        type: String
    },
    toolImage: {
        type: String
    },
    toolTitle: {
        type: String
    },
    toolStatus: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    message: {
        type: String
    },
    dates: [String]
})

module.exports = mongoose.models.Leads || mongoose.model('Leads', LeadSchema);