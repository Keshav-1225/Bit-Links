"use client";

import axios from "axios";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { urlType } from "@/types/urlType";

type StoredUrl = urlType & { _id: string };

const host = process.env.NEXT_PUBLIC_HOST
  ? process.env.NEXT_PUBLIC_HOST.startsWith("http")
    ? process.env.NEXT_PUBLIC_HOST
    : `http://${process.env.NEXT_PUBLIC_HOST}`
  : "http://localhost:3000";

export default function GeneratePage() {
  const [url, setUrl] = useState("");
  const [shorturl, setShorturl] = useState("");
  const [urls, setUrls] = useState<StoredUrl[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<StoredUrl[]>("/api/generate")
      .then((response) => setUrls(response.data))
      .catch(() => setError("Unable to load your URLs."))
      .finally(() => setLoading(false));
  }, []);

  async function saveUrl(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      const payload = { url: url.trim(), shorturl: shorturl.trim() };
      if (editingId) {
        const response = await axios.put<StoredUrl>(`/api/generate/${editingId}`, payload);
        setUrls((current) =>
          current.map((item) => (item._id === editingId ? response.data : item))
        );
      } else {
        const response = await axios.post<StoredUrl>("/api/generate", payload);
        setUrls((current) => [response.data, ...current]);
      }
      setUrl("");
      setShorturl("");
      setEditingId(null);
    } catch (requestError) {
      setError(
        axios.isAxiosError(requestError)
          ? requestError.response?.data?.error ?? "Unable to save URL."
          : "Unable to save URL."
      );
    }
  }

  function editUrl(item: StoredUrl) {
    setUrl(item.url);
    setShorturl(item.shorturl);
    setEditingId(item._id);
    setError("");
  }

  async function removeUrl(id: string) {
    if (!window.confirm("Delete this short URL?")) return;
    setError("");
    try {
      await axios.delete(`/api/generate/${id}`);
      setUrls((current) => current.filter((item) => item._id !== id));
      if (editingId === id) {
        setEditingId(null);
        setUrl("");
        setShorturl("");
      }
    } catch {
      setError("Unable to delete URL.");
    }
  }

  return (
    <main className="mx-auto my-10 w-full max-w-3xl px-4">
      <section className="rounded bg-blue-100 p-6">
        <h1 className="mb-4 text-3xl font-bold">Manage your short URLs</h1>
        <form className="flex flex-col gap-3" onSubmit={saveUrl}>
          <label htmlFor="url">Destination URL</label>
          <input
            id="url"
            type="url"
            required
            value={url}
            placeholder="https://example.com"
            className="rounded bg-white p-2"
            onChange={(event) => setUrl(event.target.value)}
          />
          <label htmlFor="shorturl">Short URL alias</label>
          <input
            id="shorturl"
            required
            value={shorturl}
            placeholder="my-link"
            className="rounded bg-white p-2"
            onChange={(event) => setShorturl(event.target.value)}
          />
          <div className="flex gap-2">
            <button className="rounded bg-blue-500 p-2 text-white" type="submit">
              {editingId ? "Update URL" : "Create URL"}
            </button>
            {editingId && (
              <button
                className="rounded bg-gray-200 p-2"
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setUrl("");
                  setShorturl("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        {error && <p className="mt-3 text-red-700">{error}</p>}
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-2xl font-bold">Your URLs</h2>
        {loading ? (
          <p>Loading...</p>
        ) : urls.length === 0 ? (
          <p>No short URLs yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {urls.map((item) => (
              <li className="rounded border bg-white p-4" key={item._id}>
                <Link
                  className="font-semibold text-blue-700 underline"
                  href={`${host}/${item.shorturl}`}
                  target="_blank"
                >
                  {host}/{item.shorturl}
                </Link>
                <p className="truncate text-sm text-gray-600">{item.url}</p>
                <div className="mt-3 flex gap-2">
                  <button className="rounded bg-gray-200 px-3 py-1" onClick={() => editUrl(item)}>
                    Edit
                  </button>
                  <button
                    className="rounded bg-red-600 px-3 py-1 text-white"
                    onClick={() => void removeUrl(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
