import User from "@/models/user.model";
import { connectDB } from "@/db/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { userName, password } = reqBody;

    const user = await User.findOne({ userName });

    if (!user)
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return NextResponse.json(
        { error: "Invalid user password" },
        { status: 400 }
      );

    const tokenData = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1h", 
    });

    const response = NextResponse.json({
      message: "User signin successfully",
      success: true,
      user
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    response.cookies.set("token", token, options);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
