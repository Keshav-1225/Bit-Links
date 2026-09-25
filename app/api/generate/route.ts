import { NextRequest, NextResponse } from "next/server";
import { getUrl, PostUrl } from "@/controllers/urlController";
import { urlType } from "@/types/urlType";
import { connect } from "http2";

export async function GET() {
    // For example, fetch data from your DB here
    const data = await getUrl()
    return NextResponse.json(data)
}

export async function POST(request: NextRequest) {

    const body = await request.json()
    const data = await PostUrl(body)
    return NextResponse.json(data)
}