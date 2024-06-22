import User from "@/models/user.model";
import nodemailer from "nodemailer";
import { uuid } from "uuidv4";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const token = uuid();
    if (emailType === "Varify") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          varifyToken: token,
          varifyTokenExpiry: Date.now() + 36000000,
        },
      });
    } else if (emailType === "Reset") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgetPasswordToken: token,
          forgetPasswordTokenExpiry: Date.now() + 36000000,
        },
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const varifyEmail = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${token}">here</a> to Verify your email
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${token}
            </p>`;
    const resetPassword = `<p>Click <a href="${process.env.DOMAIN}/updatepassword?token=${token}">here</a> to Reset your password
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/updatepassword?token=${token}
            </p>`;

    const mailOptions = {
      from: "arslan@webdev.io",
      to: email,
      subject:
        emailType === "Varify" ? "Varify your email" : "Reset your password",
      html: emailType === "Varify" ? varifyEmail : resetPassword,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
