import User from "@/models/user.model";
import { connectDB } from "@/db/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/utils/mailer";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { email } = reqBody;

    if (!email )
      return NextResponse.json(
        { error: "email is required" },
        { status: 400 }
      );

    const user = await User.findOne({ email });

    if (!user)
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );

    await sendEmail({ email, emailType: "Reset", userId: user._id });

    
    return NextResponse.json(
        {
          message: "User verified successfully",
          success: true,
          user
        },
        { status: 200 }
      );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
