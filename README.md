# The Tribe Guardians - Spiritual Retreats

A bilingual Hebrew/English website for spiritual retreats with volunteer healer and patient registration forms.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Internationalization**: next-intl (Hebrew primary, English secondary)
- **Backend**: Supabase (PostgreSQL, Forms, Notifications)
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel + Supabase Cloud

## ✨ Features

- 🌍 **Bilingual Support**: Hebrew (primary) and English with URL-based routing
- 📝 **Multi-step Forms**: Volunteer healer and patient registration forms
- 🛠️ **Admin Panel**: Secure bilingual admin queue for reviewing submissions
- 🎨 **Modern UI**: Beautiful components with shadcn/ui and Tailwind CSS
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🔔 **Notifications**: Email and WhatsApp notifications for form submissions
- ⚡ **Performance**: Built with Next.js 15 and Turbopack for optimal performance
- 🛡️ **Type Safety**: Full TypeScript support with Zod validation

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DuduKova/thetribeguardians.git
   cd thetribeguardians
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your required credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ADMIN_EMAILS=admin1@example.com,admin2@example.com
   ```

4. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key to `.env.local`
   - Run database migrations:
     - `supabase/migrations/001_create_form_tables.sql`
     - `supabase/migrations/002_extend_form_tables.sql`
     - `supabase/migrations/003_create_admin_submissions_view.sql`

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
src/
├── app/
│   └── [locale]/              # Internationalized routes
│       ├── layout.tsx         # Root locale + i18n provider
│       ├── (site)/            # Public website routes
│       ├── (admin)/admin/     # Admin login and protected queue
│       └── auth/callback/     # Magic-link callback handler
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── LanguageSwitcher.tsx  # Language toggle component
│   └── admin/                # Admin queue and detail panel UI
├── lib/
│   ├── admin/               # Admin auth + shared types
│   ├── supabase/            # Supabase configuration
│   │   ├── client.ts        # Client-side Supabase
│   │   ├── server.ts        # Server-side Supabase
│   │   ├── middleware.ts    # Supabase middleware
│   │   └── forms.ts         # Form submission handlers
│   └── utils.ts            # Helper functions
├── messages/               # Translation files
│   ├── he.json            # Hebrew translations
│   └── en.json            # English translations
└── i18n.ts               # next-intl configuration
```

## 🌍 Internationalization

The website supports Hebrew (primary) and English with URL-based routing:

- Hebrew: `https://yoursite.com/he` (default)
- English: `https://yoursite.com/en`

Language switching is handled by the `LanguageSwitcher` component in the header.

## 📝 Forms

### Healer Volunteer Form
Multi-step form with:
1. Personal information (name, email, phone)
2. Experience & qualifications
3. Availability & preferences

### Patient Registration Form
Multi-step form with:
1. Personal information (name, email, phone)
2. Health background
3. Preferences & availability

Both forms store data in Supabase and send email/WhatsApp notifications.

## 🔐 Admin Panel

- Admin queue URL: `/{locale}/admin` (for example `http://localhost:3000/he/admin`)
- Admin login URL: `/{locale}/admin/login`
- Access control:
  - User must be authenticated with Supabase magic link
  - User email must exist in `ADMIN_EMAILS`
- Supported admin actions (MVP):
  - Unified queue for healer and patient submissions
  - Filter/search/pagination
  - Open full submission details (`form_data`)
  - Update `status` (`pending` / `approved` / `rejected`)
  - Edit single internal `notes` field

### Magic Link Requirement (Supabase Auth)

Enable email authentication in Supabase:

1. Open Supabase Dashboard → **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure your auth URL/site URL to your app domain
4. Ensure redirect URLs include:
   - `http://localhost:3000/he/auth/callback`
   - `http://localhost:3000/en/auth/callback`
   - Production equivalents for your deployed domain

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

2. **Add environment variables**
   - In your Vercel dashboard, go to Settings > Environment Variables
   - Add required variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `ADMIN_EMAILS`

3. **Deploy**
   - Vercel will automatically deploy on every push to main

### Supabase Setup

1. **Create a new Supabase project**
2. **Run database migrations**
   - Execute:
     - `supabase/migrations/001_create_form_tables.sql`
     - `supabase/migrations/002_extend_form_tables.sql`
     - `supabase/migrations/003_create_admin_submissions_view.sql`
3. **Set up Row Level Security (RLS)**
   - Tables are configured with public insert policies for forms
4. **Configure Auth**
   - Enable Email provider for magic-link admin login

## 📱 WhatsApp Integration

See `WHATSAPP_SETUP.md` for detailed instructions on setting up WhatsApp Business API notifications.

## 🎨 Customization

### Adding New Pages

1. Create a new folder in `src/app/[locale]/`
2. Add a `page.tsx` file
3. Use the existing components and patterns

### Adding Translations

1. Add new keys to `messages/he.json` and `messages/en.json`
2. Use `useTranslations()` hook in components

### Styling

- Global styles: `src/app/globals.css`
- Component styles: Use Tailwind CSS classes
- Custom components: Add to `src/components/`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
