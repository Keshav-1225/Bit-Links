import { NextRequest, NextResponse } from "next/server";
import { deleteUrl, getUrlById, updateUrl } from "@/controllers/urlController";
import { urlType } from "@/types/urlType";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: RouteContext) {
    try {
        const { id } = await params;
        const data = await getUrlById(id);
        if (!data) {
            return NextResponse.json({ error: "URL not found" }, { status: 404 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to fetch URL", error);
        return NextResponse.json({ error: "Unable to fetch URL" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
    try {
        const { id } = await params;
        const body = (await request.json()) as Partial<urlType>;
        const url = body.url?.trim();
        const shorturl = body.shorturl?.trim();
        if (!url || !shorturl) {
            return NextResponse.json(
                { error: "Both url and shorturl are required" },
                { status: 400 }
            );
        }

        const data = await updateUrl(id, {
            url,
            shorturl,
        });
        if (!data) {
            return NextResponse.json({ error: "URL not found" }, { status: 404 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to update URL", error);
        return NextResponse.json({ error: "Unable to update URL" }, { status: 500 });
    }
}

export async function DELETE(_: NextRequest, { params }: RouteContext) {
    try {
        const { id } = await params;
        const data = await deleteUrl(id);
        if (!data) {
            return NextResponse.json({ error: "URL not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "URL deleted" });
    } catch (error) {
        console.error("Failed to delete URL", error);
        return NextResponse.json({ error: "Unable to delete URL" }, { status: 500 });
    }
}
