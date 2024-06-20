import User from "@/models/user.model";
import { connectDB } from "@/db/dbConfig";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export const POST = async () => {
  try {
    
  } catch (error) {
    return NextResponse.json({error, status:500});
  }
};
