import User from "@/models/user.model";
import { connectDB } from "@/db/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { password, token } = reqBody;

    const user = await User.findOne({
      forgetPasswordToken: token,
      forgetPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user.password = hashPassword;

    await user.save();

    return NextResponse.json(
      {
        message: "password updated successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
