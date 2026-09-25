import mongoose, { Document, Schema } from "mongoose";

export interface Iurl extends Document
{
    url: string,
    shorturl: string
}

const urlSchema = new Schema<Iurl>(
    {
        url:{
            type: String,
            required: true
        },
        shorturl:{
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    },
    { timestamps: true }
)

const Url = mongoose.models.Url || mongoose.model<Iurl>("Url", urlSchema)

export default Url