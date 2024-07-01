import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'IncognitoInbox | Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
          });
        return { success: true, message: "Verification code send successfully"};
    } catch (emailError) {
        console.error("Failed to send verification code", emailError);
        return { success: false, message: "Failed to send verification code"};
    }
}