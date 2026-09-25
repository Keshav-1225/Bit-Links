import { NextRequest, NextResponse } from "next/server";
import { getUrl, PostUrl } from "@/controllers/urlController";
import { urlType } from "@/types/urlType";

export async function GET() {
    try {
        return NextResponse.json(await getUrl());
    } catch (error) {
        console.error("Failed to fetch URLs", error);
        return NextResponse.json({ error: "Unable to fetch URLs" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as Partial<urlType>;
        const url = body.url?.trim();
        const shorturl = body.shorturl?.trim();
        if (!url || !shorturl) {
            return NextResponse.json(
                { error: "Both url and shorturl are required" },
                { status: 400 }
            );
        }

        const data = await PostUrl({
            url,
            shorturl,
        });
        return NextResponse.json(data, { status: 201 });
    } catch (error: unknown) {
        console.error("Failed to create URL", error);
        const status = error instanceof Error && error.name === "MongoServerError" ? 409 : 500;
        return NextResponse.json(
            { error: status === 409 ? "That short URL already exists" : "Unable to create URL" },
            { status }
        );
    }
}