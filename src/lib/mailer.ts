import nodemailer from 'nodemailer';
import { BRAND } from '../data/brand.ts';

export const DEFAULT_LEAD_RECIPIENT_EMAIL = 'insiderprateek@gmail.com';

export interface LeadEmailPayload {
  referenceCode: string;
  source: string;
  customerName: string;
  contactPhone: string;
  email?: string | null;
  preferredContactMethod?: string | null;
  interestedPackageName: string;
  travelType?: string | null;
  arrivalDate?: string | null;
  returnDate?: string | null;
  adults?: number | null;
  children?: number | null;
  pickupLocation?: string | null;
  dropLocation?: string | null;
  vehiclePreference?: string | null;
  specialRequirements?: string | null;
  chatSummary?: string | null;
}

export interface LeadEmailResult {
  sent: boolean;
  channel: 'smtp' | 'resend' | 'not-configured' | 'failed';
  recipient: string;
  error?: string;
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function getLeadRecipientEmail(): string {
  return (
    process.env.LEAD_NOTIFICATION_EMAIL?.trim() ||
    process.env.OPERATOR_NOTIFICATION_EMAIL?.trim() ||
    DEFAULT_LEAD_RECIPIENT_EMAIL
  );
}

function buildLeadEmailContent(lead: LeadEmailPayload): {
  subject: string;
  text: string;
  html: string;
} {
  const travelersText = `${lead.adults ?? 2} Adult(s)${
    lead.children && lead.children > 0 ? `, ${lead.children} Child(ren)` : ''
  }`;
  const subject = `[My Ujjain Darshan] New Lead ${lead.referenceCode} — ${lead.customerName} (${lead.interestedPackageName})`;

  const plainLines = [
    `NEW TRAVEL LEAD — ${BRAND.name}`,
    `==================================================`,
    `Reference Code : ${lead.referenceCode}`,
    `Lead Source    : ${lead.source}`,
    `Submitted At   : ${new Date().toISOString()}`,
    ``,
    `CUSTOMER DETAILS`,
    `Name           : ${lead.customerName}`,
    `Phone          : ${lead.contactPhone}`,
    `Email          : ${lead.email || 'Not provided'}`,
    `Preferred Mode : ${lead.preferredContactMethod || 'Phone / WhatsApp'}`,
    ``,
    `JOURNEY REQUIREMENTS`,
    `Package / Plan : ${lead.interestedPackageName}`,
    `Travel Type    : ${lead.travelType || 'Custom Spiritual Journey'}`,
    `Arrival Date   : ${lead.arrivalDate || 'Flexible / To be confirmed'}`,
    `Return Date    : ${lead.returnDate || 'Not specified'}`,
    `Travelers      : ${travelersText}`,
    `Pickup Hub     : ${lead.pickupLocation || 'Not specified'}`,
    `Drop Hub       : ${lead.dropLocation || 'Not specified'}`,
    `Vehicle Pref   : ${lead.vehiclePreference || 'Not specified'}`,
    `Notes          : ${lead.specialRequirements || 'None'}`,
  ];

  if (lead.chatSummary) {
    plainLines.push('', 'TRAVEL BUDDY CONVERSATION SUMMARY', lead.chatSummary);
  }

  const row = (label: string, value: string | null | undefined) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #EAE2D6;font-weight:600;color:#5C4E44;width:36%;font-size:13px;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #EAE2D6;color:#1F1A17;font-size:14px;">${escapeHtml(value || 'Not provided')}</td>
    </tr>
  `;

  const cleanPhoneHref = lead.contactPhone.replace(/[^\d+]/g, '');

  const html = `
  <!doctype html>
  <html lang="en">
    <body style="margin:0;padding:24px;background-color:#FBF8F3;font-family:Arial,Helvetica,sans-serif;color:#1F1A17;">
      <div style="max-width:640px;margin:0 auto;background:#FFFFFF;border:1px solid #E5DDD1;border-radius:10px;overflow:hidden;">
        <div style="background:#7A0806;padding:22px 24px;color:#FBF8F3;">
          <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:#E7C893;">${escapeHtml(BRAND.name)} — Lead Notification</p>
          <h1 style="margin:0;font-size:22px;font-weight:600;color:#FFFFFF;">New Travel Lead: ${escapeHtml(lead.referenceCode)}</h1>
          <p style="margin:6px 0 0 0;font-size:13px;color:#F5E6D3;">Captured via ${escapeHtml(lead.source)}</p>
        </div>

        <div style="padding:20px 24px;">
          <h2 style="margin:0 0 10px 0;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#7A0806;">Customer Contact</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            ${row('Full Name', lead.customerName)}
            <tr>
              <td style="padding:8px 12px;border-bottom:1px solid #EAE2D6;font-weight:600;color:#5C4E44;width:36%;font-size:13px;">Phone / WhatsApp</td>
              <td style="padding:8px 12px;border-bottom:1px solid #EAE2D6;color:#1F1A17;font-size:14px;">
                <a href="tel:${escapeHtml(cleanPhoneHref)}" style="color:#7A0806;font-weight:600;text-decoration:none;">${escapeHtml(lead.contactPhone)}</a>
              </td>
            </tr>
            ${row('Email Address', lead.email || 'Not provided')}
            ${row('Preferred Contact', lead.preferredContactMethod || 'Phone / WhatsApp')}
          </table>

          <h2 style="margin:0 0 10px 0;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#7A0806;">Journey Requirements</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            ${row('Package / Route', lead.interestedPackageName)}
            ${row('Travel Type', lead.travelType || 'Custom Spiritual Journey')}
            ${row('Arrival Date', lead.arrivalDate || 'Flexible / To be confirmed')}
            ${row('Return Date', lead.returnDate || 'Not specified')}
            ${row('Travelers', travelersText)}
            ${row('Pickup Location', lead.pickupLocation || 'Not specified')}
            ${row('Drop Location', lead.dropLocation || 'Not specified')}
            ${row('Vehicle Preference', lead.vehiclePreference || 'Not specified')}
            ${row('Special Notes', lead.specialRequirements || 'None')}
          </table>

          ${
            lead.chatSummary
              ? `
          <div style="background:#FBF8F3;border:1px solid #E5DDD1;border-left:3px solid #A68247;padding:14px 16px;border-radius:6px;margin-bottom:16px;">
            <p style="margin:0 0 6px 0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#7A0806;">Travel Buddy Conversation Summary</p>
            <p style="margin:0;font-size:13px;line-height:1.6;color:#3A312C;white-space:pre-line;">${escapeHtml(lead.chatSummary)}</p>
          </div>
          `
              : ''
          }

          <p style="margin:18px 0 0 0;font-size:12px;color:#786A60;">
            This lead is also stored safely in your My Ujjain Darshan Admin Panel under reference <strong>${escapeHtml(lead.referenceCode)}</strong>.
          </p>
        </div>
      </div>
    </body>
  </html>
  `;

  return {
    subject,
    text: plainLines.join('\n'),
    html,
  };
}

/**
 * Forwards captured customer leads to insiderprateek@gmail.com (or configured
 * LEAD_NOTIFICATION_EMAIL) via SMTP (nodemailer) or Resend HTTPS API.
 */
export async function sendLeadNotificationEmail(
  lead: LeadEmailPayload
): Promise<LeadEmailResult> {
  const recipient = getLeadRecipientEmail();
  const { subject, text, html } = buildLeadEmailContent(lead);

  // 1. Try SMTP via nodemailer if configured
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpSecure =
    process.env.SMTP_SECURE === 'true' || smtpPort === 465;
  const smtpFrom =
    process.env.SMTP_FROM?.trim() ||
    smtpUser ||
    `"${BRAND.name}" <no-reply@myujjaindarshan.in>`;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number.isFinite(smtpPort) ? smtpPort : 587,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: recipient,
        replyTo: lead.email || undefined,
        subject,
        text,
        html,
      });

      return { sent: true, channel: 'smtp', recipient };
    } catch (err) {
      console.error('SMTP lead forwarding failed:', err);
      // Fall through to Resend if configured, else report failure
    }
  }

  // 2. Try Resend HTTPS API if configured
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (resendApiKey) {
    try {
      const fromAddress =
        process.env.SMTP_FROM?.trim() ||
        'My Ujjain Darshan <onboarding@resend.dev>';

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [recipient],
          reply_to: lead.email || undefined,
          subject,
          text,
          html,
        }),
        signal: AbortSignal.timeout(6000),
      });

      if (response.ok) {
        return { sent: true, channel: 'resend', recipient };
      }
      const errBody = await response.text().catch(() => '');
      console.error('Resend lead forwarding failed:', response.status, errBody);
      return {
        sent: false,
        channel: 'failed',
        recipient,
        error: `Email service returned HTTP ${response.status}`,
      };
    } catch (err) {
      console.error('Resend lead forwarding error:', err);
      return {
        sent: false,
        channel: 'failed',
        recipient,
        error: err instanceof Error ? err.message : 'Email request failed',
      };
    }
  }

  // Neither SMTP nor Resend credentials configured in environment yet
  return {
    sent: false,
    channel: 'not-configured',
    recipient,
  };
}
