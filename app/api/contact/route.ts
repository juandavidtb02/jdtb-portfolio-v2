import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body as {
      name: string;
      email: string;
      message: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email" },
        { status: 400 },
      );
    }

    const safeName = sanitize(name.trim());
    const safeEmail = sanitize(email.trim());
    const safeMessage = sanitize(message.trim()).replace(/\n/g, "<br/>");

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["juanportafolio0@gmail.com"],
      subject: `New message from ${safeName}`,
      html: `
        <div style="font-family: monospace; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 8px; border: 1px solid #00ffff33;">
          <h2 style="color: #00ffff; margin: 0 0 24px; font-size: 20px;">📬 New Portfolio Message</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; width: 80px;">Name:</td>
              <td style="padding: 8px 0; color: #e2e8f0; font-weight: bold;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;">Email:</td>
              <td style="padding: 8px 0; color: #00ffff;">
                <a href="mailto:${safeEmail}" style="color: #00ffff;">${safeEmail}</a>
              </td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #1a1a2e; border-left: 3px solid #00ffff; border-radius: 4px;">
            <p style="color: #94a3b8; margin: 0 0 8px; font-size: 12px;">MESSAGE:</p>
            <p style="margin: 0; color: #e2e8f0; line-height: 1.6;">${safeMessage}</p>
          </div>

          <p style="margin: 24px 0 0; color: #475569; font-size: 11px;">
            Sent from juandavidtorres.dev portfolio
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
