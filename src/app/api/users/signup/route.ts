import User from "@/models/user.model";
import { connectDB } from "@/db/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { email, userName, password } = reqBody;

    const user = await User.findOne({ email });

    if (user)
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      userName,
      password: hashPassword,
    });

    //user created now varify the email

    await sendEmail({ email, emailType: "Varify", userId: newUser._id });

    

    return NextResponse.json(
      {
        message: "User registerd successfully",
        success: true,
        newUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
