import axios from "axios";

const GREEN_API_BASE_URL = "https://api.green-api.com";

/**
 * Format phone number to international format
 * Green API requires phone numbers in format: 972501234567 (without + or leading 0)
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, "");

  // If starts with 0, replace with 972
  if (cleaned.startsWith("0")) {
    cleaned = "972" + cleaned.substring(1);
  } else if (cleaned.startsWith("+")) {
    // Remove the + sign
    cleaned = cleaned.substring(1);
  } else if (!cleaned.startsWith("972")) {
    // If doesn't start with 972, assume Israeli and add 972
    cleaned = "972" + cleaned;
  }

  return cleaned;
}

/**
 * Send a simple text message via Green API
 */
export async function sendWhatsAppTextMessage(
  phoneNumber: string,
  message: string,
): Promise<Record<string, unknown>> {
  const formattedPhone = formatPhoneNumber(phoneNumber);
  const idInstance = process.env.GREEN_API_ID_INSTANCE;
  const apiTokenInstance = process.env.GREEN_API_API_TOKEN;

  if (!idInstance || !apiTokenInstance) {
    throw new Error(
      "Green API configuration missing: GREEN_API_ID_INSTANCE and GREEN_API_API_TOKEN are required",
    );
  }

  try {
    const response = await axios.post(
      `${GREEN_API_BASE_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        chatId: `${formattedPhone}@c.us`,
        message: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data as Record<string, unknown>;
  } catch (error) {
    const axiosError = error as {
      response?: {
        data?: { message?: string; errorCode?: string };
        status?: number;
      };
    };
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Green API Error:", {
      message: axiosError.response?.data?.message || errorMessage,
      code: axiosError.response?.data?.errorCode || axiosError.response?.status,
      status: axiosError.response?.status,
      details: axiosError.response?.data,
    });
    throw error;
  }
}

/**
 * Template messages are not directly supported by Green API
 * You can send formatted text messages instead
 */
export async function sendWhatsAppTemplateMessage(
  phoneNumber: string,
  templateName: string,
  parameters: string[],
): Promise<Record<string, unknown>> {
  // Green API doesn't support template messages like Meta API
  // Instead, format the message manually
  // You can create your own template formatting here
  const message = `Template: ${templateName}\n${parameters.join("\n")}`;
  return sendWhatsAppTextMessage(phoneNumber, message);
}
