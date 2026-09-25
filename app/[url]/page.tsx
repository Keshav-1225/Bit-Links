import { redirect } from "next/navigation";
import { getUrlByShortUrl } from "@/controllers/urlController";

type Props = {
  params: Promise<{
    url: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { url: shortUrl } = await params;

  const doc = await getUrlByShortUrl(shortUrl);

  if (doc) {
    redirect(doc.url);
  } else {
    redirect(
      process.env.NEXT_PUBLIC_HOST || "http://localhost:3000"
    );
  }
}