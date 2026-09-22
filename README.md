# URL Shortener

A modern URL shortener built with Next.js, TypeScript, and MongoDB. It lets users generate short links, store them in a database, and redirect visitors from the shortened URL to the original destination.

## Features

- Create short links from long URLs
- Support custom short aliases
- Redirect shortened URLs to their original destinations
- MongoDB-backed persistence
- Simple and clean UI built with Next.js and Tailwind CSS
- Route-based redirect handling for shortened links

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- MongoDB
- Tailwind CSS
- Axios

## Project Structure

```bash
.
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts
│   ├── generate/
│   │   └── page.tsx
│   ├── [url]/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── lib/
│   └── mongodb.ts
├── public/
├── .env.local
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

## How It Works

1. The user enters a long URL and a preferred short alias on the generate page.
2. The app sends a POST request to the API route at `/api/generate`.
3. The API validates the input and stores the mapping in MongoDB.
4. A shortened route like `/your-short-code` is resolved in the dynamic route file.
5. If the short code exists, the app redirects the user to the original URL.

## Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_HOST=http://localhost:3000
```

- `MONGODB_URI` connects the app to your MongoDB database.
- `NEXT_PUBLIC_HOST` is used for generating frontend URLs and redirect fallback behavior.

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd url-shortner
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables in `.env.local`.

4. Start the development server:

```bash
npm run dev
```

5. Open the app in your browser:

```bash
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

This project is a simple full-stack URL shortening app designed for learning and small-scale use. The MongoDB connection is configured in the app's server-side utility and the redirect logic is handled through dynamic route parameters.

## License

This project is available for educational and personal use. Add your own license if you plan to publish it.
