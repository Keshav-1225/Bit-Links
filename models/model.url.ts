import mongoose,{Schema, Document} from "mongoose";

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
            required: true
        }
    }
)

const Url = mongoose.models.urlSchema || mongoose.model<Iurl>("Url", urlSchema)

export default Url