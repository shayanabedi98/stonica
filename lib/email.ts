import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  export async function sendResetPasswordEmail(to: string, token: string) {
    const resetUrl = `${process.env.NEXTAUTH_URL}/vendor/reset-password?token=${token}`;
  
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Reset Your Password',
      html: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };
  
    await transporter.sendMail(mailOptions);
  }