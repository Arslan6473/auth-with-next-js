import User from "@/models/user.model";
import { connectDB } from "@/db/dbConfig";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { token } = reqBody;

    const user = await User.findOne({
      varifyToken: token,
      varifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });

    user.isVarified = true;
    user.varifyToken = undefined;
    user.varifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Email varified successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
