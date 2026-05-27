import { redirect } from "next/navigation";
import clientPromise from "../lib/mongodb";

type Props = {
  params: Promise<{
    url: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { url: shortUrl } = await params;

  type UrlCollection = {
    url: string;
    shorturl: string;
  };

  const client = await clientPromise;
  const db = client.db("url-shortner");
  const collection = db.collection<UrlCollection>("urls");

  const doc = await collection.findOne({
    shorturl: shortUrl,
  });

  if (doc) {
    redirect(doc.url);
  } else {
    redirect(
      process.env.NEXT_PUBLIC_HOST || "http://localhost:3000"
    );
  }
}