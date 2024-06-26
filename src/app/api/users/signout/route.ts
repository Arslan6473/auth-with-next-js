import { connectDB } from "@/db/dbConfig";
import { NextResponse } from "next/server";

connectDB();

export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "User signout successfully ",
      success: true,
    });

    const options = {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    };

    response.cookies.set("token", "", options);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
