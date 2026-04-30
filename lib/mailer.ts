import nodemailer from 'nodemailer';

// ─── Transporter ──────────────────────────────────────────────────────────────
// Uses the client's existing SMTP account on serverhostgroup.com.
// Credentials are loaded from Vercel environment variables (never in code/git).
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE !== 'false', // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    // Required for some shared hosting SMTP servers
    rejectUnauthorized: false,
  },
});

// ─── Types ────────────────────────────────────────────────────────────────────
interface InquiryEmailData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  projectName?: string;
}

// ─── HTML Template ────────────────────────────────────────────────────────────
function buildInquiryEmail(data: InquiryEmailData): string {
  const serviceLabel = data.service
    ? data.service.charAt(0).toUpperCase() + data.service.slice(1)
    : 'Not specified';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Inquiry — Arusha Home Design</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:12px;overflow:hidden;border:1px solid #2a2a2a;max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a1a 0%,#2a2a1a 100%);padding:40px 40px 32px;border-bottom:1px solid #2a2a2a;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#b8953a;">Arusha Home Design & Architecture</p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#f5f0e8;line-height:1.2;">New Inquiry Received</h1>
              <p style="margin:12px 0 0;font-size:14px;color:#888;line-height:1.6;">
                A visitor has submitted an inquiry through your website.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">

              <!-- Sender Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td colspan="2" style="padding-bottom:16px;">
                    <p style="margin:0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#b8953a;">Sender Information</p>
                  </td>
                </tr>
                <tr>
                  <td style="width:50%;padding:12px 16px;background:#222;border-radius:8px 0 0 8px;border:1px solid #333;border-right:none;">
                    <p style="margin:0 0 4px;font-size:10px;color:#666;text-transform:uppercase;letter-spacing:0.1em;">Full Name</p>
                    <p style="margin:0;font-size:15px;color:#f5f0e8;font-weight:600;">${data.name}</p>
                  </td>
                  <td style="width:50%;padding:12px 16px;background:#222;border-radius:0 8px 8px 0;border:1px solid #333;">
                    <p style="margin:0 0 4px;font-size:10px;color:#666;text-transform:uppercase;letter-spacing:0.1em;">Email Address</p>
                    <p style="margin:0;font-size:15px;color:#b8953a;font-weight:600;">
                      <a href="mailto:${data.email}" style="color:#b8953a;text-decoration:none;">${data.email}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Phone & Service -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="width:50%;padding:12px 16px;background:#222;border-radius:8px 0 0 8px;border:1px solid #333;border-right:none;">
                    <p style="margin:0 0 4px;font-size:10px;color:#666;text-transform:uppercase;letter-spacing:0.1em;">Phone Number</p>
                    <p style="margin:0;font-size:15px;color:#f5f0e8;font-weight:600;">${data.phone || 'Not provided'}</p>
                  </td>
                  <td style="width:50%;padding:12px 16px;background:#222;border-radius:0 8px 8px 0;border:1px solid #333;">
                    <p style="margin:0 0 4px;font-size:10px;color:#666;text-transform:uppercase;letter-spacing:0.1em;">Service Interested In</p>
                    <p style="margin:0;font-size:15px;color:#f5f0e8;font-weight:600;">${serviceLabel}</p>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="margin-bottom:28px;">
                <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#b8953a;">Message</p>
                <div style="background:#1e1e1e;border:1px solid #2a2a2a;border-left:3px solid #b8953a;border-radius:0 8px 8px 0;padding:20px 24px;">
                  <p style="margin:0;font-size:15px;color:#c8c0b0;line-height:1.8;">${data.message.replace(/\n/g, '<br>')}</p>
                </div>
              </div>

              <!-- CTA -->
              <div style="text-align:center;margin-top:8px;">
                <a href="mailto:${data.email}?subject=Re: Your Inquiry — Arusha Home Design"
                   style="display:inline-block;background:#b8953a;color:#0d0d0d;padding:14px 32px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:700;letter-spacing:0.05em;">
                  Reply to ${data.name}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 32px;border-top:1px solid #2a2a2a;text-align:center;">
              <p style="margin:0;font-size:12px;color:#444;line-height:1.6;">
                This notification was sent automatically from your website contact form.<br/>
                <a href="https://arushahome.com/admin" style="color:#666;text-decoration:none;">View all inquiries in Admin Panel →</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ─── Auto-reply template ──────────────────────────────────────────────────────
function buildAutoReplyEmail(name: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Thank You — Arusha Home Design</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:12px;overflow:hidden;border:1px solid #2a2a2a;max-width:600px;width:100%;">
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a1a 0%,#2a2a1a 100%);padding:40px 40px 32px;border-bottom:1px solid #2a2a2a;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#b8953a;">Arusha Home Design & Architecture</p>
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#f5f0e8;">Thank You, ${name}!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;text-align:center;">
              <p style="margin:0 0 20px;font-size:16px;color:#c8c0b0;line-height:1.8;">
                We've received your message and our team will get back to you within <strong style="color:#f5f0e8;">24 hours</strong>.
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#888;line-height:1.7;">
                In the meantime, feel free to browse our portfolio of completed projects or explore our services.
              </p>
              <a href="https://arushahome.com/projects"
                 style="display:inline-block;background:#b8953a;color:#0d0d0d;padding:14px 32px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:700;letter-spacing:0.05em;">
                View Our Projects
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 32px;border-top:1px solid #2a2a2a;text-align:center;">
              <p style="margin:0;font-size:12px;color:#444;">
                Arusha Home Design & Architecture · Ngaramtoni, Arusha, Tanzania<br/>
                <a href="tel:+255745889764" style="color:#666;text-decoration:none;">+255 745 889 764</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Sends a notification email to the site admin when a new inquiry is received.
 * Also sends an auto-reply to the customer.
 * Silently swallows errors so a mail failure never breaks the form submission.
 */
export async function sendInquiryNotification(data: InquiryEmailData): Promise<void> {
  const notifyTo = process.env.NOTIFY_EMAIL;

  if (!notifyTo || !process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[mailer] SMTP environment variables not configured — skipping email notification.');
    return;
  }

  try {
    // 1. Notify the admin
    await transporter.sendMail({
      from: `"Arusha Home Website" <${process.env.SMTP_USER}>`,
      to: notifyTo,
      subject: `🏠 New Inquiry from ${data.name} — ${data.service || 'General Contact'}`,
      html: buildInquiryEmail(data),
    });

    // 2. Auto-reply to the customer
    await transporter.sendMail({
      from: `"Arusha Home Design" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Thank you for contacting Arusha Home Design`,
      html: buildAutoReplyEmail(data.name),
    });

    console.log(`[mailer] Inquiry notification sent for: ${data.email}`);
  } catch (err) {
    // Log error but never crash — inquiry is already saved to DB
    console.error('[mailer] Failed to send inquiry email:', err);
  }
}
