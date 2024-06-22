import User from "@/models/user.model";
import { connectDB } from "@/db/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { getValuesFromToken } from "@/utils/varifyJwt";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const userId = await getValuesFromToken(request);

    const user = await User.findById(userId).select(
      "-password"
    );

    if (!user)
      return NextResponse.json({ error: "User not exist" }, { status: 400 });

    return NextResponse.json(
      {
        message: "user found",
        success: true,
        user
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
