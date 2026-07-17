import { siteConfig } from "./site";

/**
 * Email delivery abstraction.
 *
 * If RESEND_API_KEY is set, submissions are emailed via Resend's HTTP API (no
 * extra dependency required — we call the REST endpoint directly). Otherwise the
 * submission is safely logged to the server console for development. Swap in
 * Nodemailer or another provider here without touching the route handlers.
 */
export interface EmailPayload {
  subject: string;
  /** Plain-text body */
  text: string;
  /** Reply-to address (the submitter) */
  replyTo?: string;
}

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || siteConfig.email;
const FROM = process.env.EMAIL_FROM || "Herrera Landscape <onboarding@resend.dev>";

export async function sendEmail(payload: EmailPayload): Promise<{ delivered: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Development fallback — never throws, never exposes secrets.
    console.info(
      "\n[email:dev] RESEND_API_KEY not set — logging submission instead of sending.\n" +
        `  To: ${CONTACT_EMAIL}\n  Subject: ${payload.subject}\n  Reply-To: ${payload.replyTo ?? "n/a"}\n` +
        `  Body:\n${payload.text}\n`
    );
    return { delivered: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [CONTACT_EMAIL],
        reply_to: payload.replyTo,
        subject: payload.subject,
        text: payload.text,
      }),
    });

    if (!res.ok) {
      console.error("[email] Resend responded with", res.status);
      return { delivered: false };
    }
    return { delivered: true };
  } catch (err) {
    console.error("[email] Failed to send:", err);
    return { delivered: false };
  }
}
