# WhatsApp Business API Integration Setup

This file contains instructions for setting up WhatsApp Business API integration for form notifications.

## Prerequisites

1. WhatsApp Business Account
2. Meta Business Account
3. WhatsApp Business API access (via Meta or third-party provider)

## Configuration

### Environment Variables

Add these to your `.env.local` file:

```env
# WhatsApp Business API Configuration
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token
```

### Message Templates

Create message templates in your WhatsApp Business Manager:

#### Healer Application Template
```
Template Name: healer_application_notification
Category: UTILITY
Language: Hebrew/English

Body:
שלום! התקבלה בקשה חדשה להתנדבות כמרפא:

שם: {{1}}
אימייל: {{2}}
טלפון: {{3}}

ניסיון: {{4}}

אנא בדוק את הבקשה במערכת הניהול.
```

#### Patient Registration Template
```
Template Name: patient_registration_notification
Category: UTILITY
Language: Hebrew/English

Body:
שלום! התקבלה הרשמה חדשה כמטופל:

שם: {{1}}
אימייל: {{2}}
טלפון: {{3}}

רקע בריאותי: {{4}}

אנא בדוק את ההרשמה במערכת הניהול.
```

## Implementation

### 1. Install Dependencies

```bash
npm install axios
```

### 2. Create WhatsApp Service

Create `src/lib/whatsapp.ts`:

```typescript
import axios from 'axios'

const WHATSAPP_API_URL = 'https://graph.facebook.com/v18.0'

export async function sendWhatsAppMessage(
  phoneNumber: string,
  templateName: string,
  parameters: string[]
) {
  try {
    const response = await axios.post(
      `${WHATSAPP_API_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'template',
        template: {
          name: templateName,
          language: { code: 'he' },
          components: [
            {
              type: 'body',
              parameters: parameters.map(param => ({ type: 'text', text: param }))
            }
          ]
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    return response.data
  } catch (error) {
    console.error('WhatsApp API Error:', error)
    throw error
  }
}
```

### 3. Update Form Submission

Update `src/lib/supabase/forms.ts` to include WhatsApp notifications:

```typescript
import { sendWhatsAppMessage } from './whatsapp'

export async function submitHealerApplication(data: HealerApplication) {
  // ... existing Supabase code ...
  
  // Send WhatsApp notification
  try {
    await sendWhatsAppMessage(
      process.env.ADMIN_PHONE_NUMBER!, // Admin phone number
      'healer_application_notification',
      [
        data.name,
        data.email,
        data.phone,
        data.experience.substring(0, 100) // Truncate for template
      ]
    )
  } catch (error) {
    console.error('WhatsApp notification failed:', error)
  }
  
  return result
}
```

### 4. Webhook Setup (Optional)

For receiving WhatsApp messages, create `src/app/api/webhook/whatsapp/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get('hub.mode')
  const token = request.nextUrl.searchParams.get('hub.verify_token')
  const challenge = request.nextUrl.searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge)
  }

  return new NextResponse('Forbidden', { status: 403 })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Handle incoming WhatsApp messages
  console.log('WhatsApp webhook received:', body)
  
  return new NextResponse('OK')
}
```

## Testing

1. Test message sending with a verified phone number
2. Verify webhook endpoint is accessible
3. Test form submissions trigger notifications

## Troubleshooting

- Ensure phone numbers are in international format (+972...)
- Check template approval status in Meta Business Manager
- Verify access tokens have correct permissions
- Monitor API rate limits

## Security Notes

- Never expose access tokens in client-side code
- Use environment variables for all sensitive data
- Implement proper error handling
- Consider rate limiting for production use
