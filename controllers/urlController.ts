import { connectDB } from "@/app/config/db";
import Url from "@/models/model.url";
import { urlType } from "@/types/urlType";
import mongoose from "mongoose";

export async function getUrl() {
    await connectDB();
    return Url.find().sort({ createdAt: -1 }).lean();
}

export async function getUrlByShortUrl(shorturl: string) {
    await connectDB();
    return Url.findOne({ shorturl }).lean();
}

export async function getUrlById(id: string) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }

    await connectDB();
    return Url.findById(id).lean();
}

export async function PostUrl(payload: urlType) {
    await connectDB();
    return Url.create(payload);
}

export async function updateUrl(id: string, payload: urlType) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }

    await connectDB();
    return Url.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).lean();
}

export async function deleteUrl(id: string) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }

    await connectDB();
    return Url.findByIdAndDelete(id).lean();
}
