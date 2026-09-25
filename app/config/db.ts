"use server";
import mongoose from "mongoose";

const uri = process.env.DB_URI;

export async function connectDB() {
  if (!uri) {
    throw new Error("DB_URI is not configured");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(uri);
}