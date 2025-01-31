import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,  // Your email
    pass: process.env.PASSWORD,  // Your email password or app password
  },
});

// Function to send the verification email
const sendVerificationEmail = async (userEmail, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: 'Verify Your Email Address',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${userEmail}`);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      message: "Email delivery failed",
      error: error.message,
    });
    throw new Error("Email delivery failed");
  }
};


export default sendVerificationEmail;
