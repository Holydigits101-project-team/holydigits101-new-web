import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

// v3: token is obtained programmatically on submit — no widget rendered
// Call executeRecaptcha(action) inside the form submit handler

export function validateCaptchaToken(
  captchaToken: string | null,
  onError: (message: string) => void
): captchaToken is string {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    onError('Captcha is not configured. Please try again later.');
    return false;
  }

  if (!captchaToken) {
    onError('Captcha verification failed. Please try again.');
    return false;
  }

  return true;
}

// Hook — use this inside any form component that needs a captcha token
export function useRecaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const getToken = async (action: string): Promise<string | null> => {
    if (!executeRecaptcha) return null;
    try {
      return await executeRecaptcha(action);
    } catch {
      return null;
    }
  };

  return { getToken };
}

// Kept for backward compatibility — renders nothing in v3 (token obtained on submit)
export default function RecaptchaField() {
  return null;
}
