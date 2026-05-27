// lib/mongodb.ts

import { MongoClient, MongoClientOptions } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Add Mongo URI to .env.local')
}

const options: MongoClientOptions = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// Extend the Node.js global type
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }

  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise