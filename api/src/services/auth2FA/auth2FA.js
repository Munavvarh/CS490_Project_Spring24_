import { db } from 'src/lib/db';
import nodemailer from 'nodemailer';

export const generate2FACode = async (userId) => {
  const [user, smtpSettings] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: { email: true }
    }),
    db.smtpSettings.findFirst()  // Fetch the SMTP settings dynamically
  ]);

  if (!user) {
    throw new Error('User not found');
  }

  if (!smtpSettings) {
    throw new Error('SMTP settings not found');
  }

  const twoFactorCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 10); // Set code to expire in 10 minutes

  await db.user.update({
    where: { id: userId },
    data: {
      twoFactorToken: twoFactorCode,
      tokenCreatedAt: new Date()
    },
  });

  const transporter = nodemailer.createTransport({
    host: smtpSettings.host,
    port: smtpSettings.port,
    secure: smtpSettings.secure, // true for 465, false for other ports
    auth: {
      user: smtpSettings.user,
      pass: smtpSettings.pass
    }
  });

  const mailOptions = {
    from: smtpSettings.user,
    to: user.email,
    subject: 'Your Two-Factor Authentication Code',
    text: `Your verification code is: ${twoFactorCode}`
  };

  await transporter.sendMail(mailOptions);
};
