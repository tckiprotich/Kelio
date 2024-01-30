import mongoose from 'mongoose'
import { Schema } from 'mongoose'


const newsletterSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
})

const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema)

export default Newsletter