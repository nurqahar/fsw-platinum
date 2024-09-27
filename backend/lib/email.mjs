import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendResetPasswordEmail({ to, resetToken }) {
  const resetUrl = `${process.env.RESET_PASSWORD_URL}?token=${resetToken}`;

  const mailOptions = {
    from: '"No Reply" <noreply@ethereal.email>',
    to,
    subject: "Reset Your Password",
    html: `<p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="${resetUrl}"> Reset Password</a>
    <p>If you did not request this, please ignore this email</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
