import { connectDB } from "@/app/config/db";
import Url from "@/models/model.url";
import { urlType } from "@/types/urlType";

export async function getUrl() {
    try {
        await connectDB()

        const data = await Url.find()
        return data
    } catch (error) {
        console.log("Error in controller", error)
    }
}

export async function PostUrl(payload:urlType) {
    try {
        await connectDB()

        const data = Url.insertOne(payload)
    } catch (error) {
        
    }
}

