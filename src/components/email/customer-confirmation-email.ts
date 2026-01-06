interface CustomerConfirmationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function CustomerConfirmationEmailTemplate({
  name,
  email,
  subject,
  message,
}: CustomerConfirmationEmailProps): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting DotCode</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header -->
        <div style="background: radial-gradient(circle at 50% 50%, #3533cd 0%, #000000 50%, #000000 100%); padding: 40px 30px; text-align: center;">
          <img src="https://vjspmdjvlosgvthhodhu.supabase.co/storage/v1/object/public/DotCode/public/logo.png" alt="DotCode Logo" style="height: 80px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
            Thank you for reaching out!
          </h1>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1a202c; margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
              Hi ${name},
            </h2>
            <p style="color: #4a5568; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
              We've received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you within 24 hours.
            </p>
          </div>

          <!-- Query Summary -->
          <div style="background-color: #f7fafc; border-radius: 12px; padding: 24px; margin-bottom: 30px; border-left: 4px solid #3533cd;">
            <h3 style="color: #3533cd; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
              Your Query Summary
            </h3>
            
            <div style="margin-bottom: 16px;">
              <span style="color: #2d3748; font-weight: 600; display: inline-block; width: 80px;">Subject:</span>
              <span style="color: #4a5568; background-color: #e2e8f0; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                ${subject}
              </span>
            </div>
            
            <div style="margin-bottom: 16px;">
              <span style="color: #2d3748; font-weight: 600; display: inline-block; width: 80px;">Email:</span>
              <span style="color: #4a5568;">${email}</span>
            </div>
            
            <div>
              <span style="color: #2d3748; font-weight: 600; display: block; margin-bottom: 8px;">Message:</span>
              <div style="background-color: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <p style="color: #4a5568; line-height: 1.6; margin: 0; white-space: pre-wrap;">
                  ${message}
                </p>
              </div>
            </div>
          </div>

          <!-- What's Next -->
          <div style="background-color: #f0fff4; border-radius: 12px; padding: 24px; margin-bottom: 30px; border-left: 4px solid #38a169;">
            <h3 style="color: #38a169; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
              What happens next?
            </h3>
            <ul style="color: #4a5568; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Our team will review your inquiry carefully</li>
              <li style="margin-bottom: 8px;">We'll respond within 24 hours (usually much sooner!)</li>
              <li style="margin-bottom: 8px;">If needed, we'll schedule a call to discuss your requirements</li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div style="text-align: center; padding: 24px; background-color: #f7fafc; border-radius: 12px;">
            <h3 style="color: #2d3748; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
              Need immediate assistance?
            </h3>
            <p style="color: #4a5568; margin: 0 0 16px 0; line-height: 1.6;">
              Feel free to reach out to us directly:
            </p>
            <div style="margin-bottom: 12px;">
              <a href="mailto:info@DotCode.com" style="color: #3533cd; text-decoration: none; font-weight: 600;">
                info@DotCode.com
              </a>
            </div>
            <div>
              <a href="https://DotCode.com" style="color: #3533cd; text-decoration: none; font-weight: 600;">
                Visit our website
              </a>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #2d3748; padding: 30px; text-align: center;">
          <p style="color: #a0aec0; font-size: 14px; margin: 0 0 12px 0;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
          <p style="color: #a0aec0; font-size: 14px; margin: 0;">
            © 2025 DotCode. All rights reserved.
          </p>
        </div>

      </div>
    </body>
    </html>
  `;
}

export function CustomerConfirmationEmailPlainText({
  name,
  email,
  subject,
  message,
}: CustomerConfirmationEmailProps): string {
  return `
Hi ${name},

Thank you for reaching out to DotCode! We've received your message and appreciate you taking the time to contact us.

YOUR QUERY SUMMARY
==================
Subject: ${subject}
Email: ${email}

Message:
${message}

WHAT HAPPENS NEXT?
==================
- Our team will review your inquiry carefully
- We'll respond within 24 hours (usually much sooner!)
- If needed, we'll schedule a call to discuss your requirements

NEED IMMEDIATE ASSISTANCE?
=========================
Feel free to reach out to us directly:
Email: info@DotCode.com
Website: https://DotCode.com

---
This is an automated confirmation email. Please do not reply to this email.
© 2025 DotCode. All rights reserved.
  `.trim();
}
