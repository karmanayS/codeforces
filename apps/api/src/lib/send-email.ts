import { Resend } from "resend";
import "dotenv/config"

const resend = new Resend(process.env.RESEND_API_KEY as string)
const emailTemplate = (otp:string) => {
    return `<!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f6f6f6;">
        <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding: 40px 0;">
            <table width="420" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:24px; border-radius:8px;">
                <tr>
                <td align="center">
                    <h2 style="margin:0 0 12px 0; color:#111;">Verify your email</h2>
                    <p style="margin:0 0 24px 0; color:#555; font-size:14px;">
                    Use the OTP below to complete your sign-in.
                    </p>

                    <div style="font-size:28px; font-weight:bold; letter-spacing:6px; color:#111; margin-bottom:24px;">
                    { ${otp} }
                    </div>

                    <p style="margin:0; color:#777; font-size:13px;">
                    This code will expire in 5 minutes.
                    </p>
                </td>
                </tr>
            </table>

            <p style="margin-top:16px; font-size:12px; color:#999;">
                If you didn’t request this, you can safely ignore this email.
            </p>
            </td>
        </tr>
        </table>
    </body>
    </html>
    `
}

export const sendEmail = async(email:string,otp:string) => {
    const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: "Email Verification",
        html: emailTemplate(otp),
    });
    if (error) {
        return false;
    }
    return true
}