# Green API WhatsApp Integration Setup

This file contains instructions for setting up WhatsApp integration using Green API for form notifications.

## Prerequisites

1. Green API account - Sign up at [https://console.green-api.com/](https://console.green-api.com/)
2. WhatsApp account (personal or business) - You'll connect it to Green API
3. Green API instance created in the console

## Configuration

### Environment Variables

Add these to your `.env.local` file:

```env
# Green API Configuration
GREEN_API_ID_INSTANCE=your_idInstance_here
GREEN_API_API_TOKEN=your_apiTokenInstance_here

# Admin phone number to receive form notifications
# Can be in format: 972501234567 or +972501234567 (will be auto-formatted)
ADMIN_PHONE_NUMBER=972501234567
```

### Getting Your Credentials

1. Go to [Green API Console](https://console.green-api.com/)
2. Create or select an instance
3. Copy your `idInstance` and `apiTokenInstance` from the instance settings
4. Connect your WhatsApp number by scanning the QR code shown in the console

## Implementation

### 1. Install Dependencies

```bash
npm install axios
```

### 2. WhatsApp Service

The WhatsApp service (`src/lib/whatsapp.ts`) is already configured to use Green API:

- **Endpoint**: `https://api.green-api.com/waInstance{idInstance}/sendMessage/{apiTokenInstance}`
- **Authentication**: Via URL path parameters (idInstance and apiTokenInstance)
- **Phone Format**: Automatically formats to `{phone}@c.us` (e.g., `972501234567@c.us`)

### 3. Form Submission Integration

The form submission functions in `src/lib/supabase/forms.ts` automatically send WhatsApp notifications:

- **Healer Applications**: Sends notification when a new healer application is submitted
- **Patient Registrations**: Sends notification when a new patient registration is submitted

Notifications include:

- Name, age, contact information
- Brief summary of experience/health background
- Link to check the submission in the admin system

## Message Format

Messages are sent as plain text (Green API doesn't require template approval like Meta's API). The format includes:

**Healer Application:**

```
🔔 בקשה חדשה להתנדבות כמרפא

שם: [Name]
גיל: [Age]
טלפון: [Phone]
אימייל: [Email]
מקצוע עיקרי: [Profession]

ניסיון:
[Experience Summary]

אנא בדוק את הבקשה במערכת הניהול.
```

**Patient Registration:**

```
🔔 הרשמה חדשה כמטופל

שם: [Name]
גיל: [Age]
טלפון: [Phone]
עיר: [City]

רקע בריאותי:
[Health Summary]

סיבת פניה: [Reason]

אנא בדוק את ההרשמה במערכת הניהול.
```

## Testing

1. Ensure your Green API instance is active and WhatsApp is connected
2. Test form submission from the website
3. Verify WhatsApp message is received on the admin phone number
4. Check server logs for any errors

## Troubleshooting

### Common Issues

- **"Green API configuration missing"**: Check that `GREEN_API_ID_INSTANCE` and `GREEN_API_API_TOKEN` are set in `.env.local`
- **"Instance not found"**: Verify your instance ID is correct in Green API console
- **"Message not sent"**:
  - Ensure your WhatsApp is connected to the Green API instance (scan QR code)
  - Check that the phone number format is correct (972XXXXXXXXX format)
  - Verify your instance has available messages/quota
- **Phone number format errors**: The service auto-formats numbers, but ensure you provide a valid Israeli phone number

### Phone Number Formatting

The service automatically handles phone number formatting:

- `0501234567` → `972501234567@c.us`
- `+972501234567` → `972501234567@c.us`
- `972501234567` → `972501234567@c.us`

### API Rate Limits

Green API has rate limits based on your plan:

- Check your current plan limits in the Green API console
- Messages are sent asynchronously and won't block form submission if they fail
- Errors are logged but don't prevent form data from being saved

## Security Notes

- Never expose `GREEN_API_ID_INSTANCE` or `GREEN_API_API_TOKEN` in client-side code
- Keep these values in `.env.local` (which is gitignored)
- For production, add these to your hosting provider's environment variables (Vercel, etc.)
- WhatsApp notifications are sent server-side only

## Production Deployment

When deploying to production (e.g., Vercel):

1. Go to your project settings → Environment Variables
2. Add the following variables:
   - `GREEN_API_ID_INSTANCE`
   - `GREEN_API_API_TOKEN`
   - `ADMIN_PHONE_NUMBER`
3. Ensure these are set for Production, Preview, and Development environments
4. Redeploy your application

## Additional Resources

- [Green API Documentation](https://green-api.com/en/docs/)
- [Green API Console](https://console.green-api.com/)
- [Green API FAQ](https://green-api.com/en/docs/faq/)
