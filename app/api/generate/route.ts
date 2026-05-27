import clientPromise from "@/app/lib/mongodb";

type urlCollection = {
    url:string,
    shorturl:string
}
export async function GET(request: Request) {
    // For example, fetch data from your DB here
    const data = { message: "GET Request working" }
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST(request: Request) {
    
    const body = await request.json()
    const client = await clientPromise;
    const db = client.db("url-shortner")
    const collection = db.collection<urlCollection>("urls")

    //Check if the short url exists
    const alreadyExists = await collection.findOne({shorturl:body.shorturl})
    if(alreadyExists) return Response.json({success:false, message:"url already exists"})

    const result = await collection.insertOne({
        url: body.url,
        shorturl: body.shorturl
    })
    return Response.json({success:true ,message:"Data received"})
}