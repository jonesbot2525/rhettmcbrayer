import { NextRequest, NextResponse } from "next/server";

// TODO: Replace CONTACT_EMAIL with Rhett's real email address
// Set CONTACT_EMAIL env var in Vercel, or replace the default here.
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "rhettmcbrayer@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // If RESEND_API_KEY is configured, send via Resend (recommended for Vercel)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Website Contact <noreply@rhettmcbrayer.com>",
          to: CONTACT_EMAIL,
          reply_to: email,
          subject: `New message from ${name} via rhettmcbrayer.com`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
          html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message.replace(/\n/g, "<br/>")}</p>`,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", err);
        return NextResponse.json({ error: "Email failed" }, { status: 500 });
      }
      return NextResponse.json({ ok: true });
    }

    // Fallback: log to console (will appear in Vercel logs)
    console.log("Contact form submission (no email provider configured):", {
      name,
      email,
      message,
    });
    // Return success so the form UX works — set up Resend to actually send emails
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
