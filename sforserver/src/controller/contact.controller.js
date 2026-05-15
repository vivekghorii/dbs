const nodemailer = require("nodemailer");

const sendContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Configure transporter using env vars
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !port || !user || !pass) {
      console.error("SMTP not configured. Missing SMTP_* env vars.");
      return res.status(500).json({ message: "Mail server not configured" });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    const to = process.env.CONTACT_TO || "vivekghori000@gmail.com";

    const mailOptions = {
      from: `\"${name}\" <${email}>`,
      to,
      subject: `New contact from ${name}`,
      text: `You received a new contact message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p>You received a new contact message:</p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ message: "Message sent" });
  } catch (err) {
    console.error("Contact send failed:", err);
    return res.status(500).json({ message: "Failed to send message" });
  }
};

module.exports = { sendContact };
