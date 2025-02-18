import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from './emailTemplates';
import { mailtrapClient, sender } from './mailtrap.config';

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Verify your email address',
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationToken
      ),
      category: 'Email Verification',
    });
    console.log('Email sent successfully', response);
  } catch (error) {
    console.log(`Error sending verification message`, error);
    throw new Error(`Error sending verification message: ${error}`);
  }
};

export const sendWelcomeEmail = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: '3048844d-33ac-4088-a8c9-6ceb5745d984',
      template_variables: {
        company_info_name: 'Temideewan Company',
        name,
      },
    });

    console.log(`Welcome email sent successfully`, response);
  } catch (error) {
    console.log(`Error sending welcome email`, error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetRequestEmail = async (
  email: string,
  resetUrl: string
) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Reset your password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetUrl),
      category: 'Password Reset',
    });
    console.log(`Password reset email sent successfully`, response);
  } catch (error) {
    console.log(`Error sending reset password email`, error);
    throw new Error(`Error sending reset password email: ${error}`);
  }
};

export const sendResetPasswordSuccessEmail = async (email: string) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Password reset successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: 'Password Reset',
    });
    console.log(`Reset password email sent successfully`, response);
  } catch (error) {
    console.log(`Error sending reset password email`, error);
    throw new Error(`Error sending reset password email: ${error}`);
  }
};
