"use server"
import mongoose from "mongoose"

const uri:string = process.env.DB_URI!

export async function connectDB()
{
  try
  {
    if (!uri) throw new Error("Something is wrong with the connection string")

    await mongoose.connect(uri)
    console.log("Database connection established");
  }catch(err)
  {
    console.log("Error while connecting to the db\n",err)
  }
}