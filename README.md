# Arvut Tribe

A modern web application built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, RBAC, RLS)
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel + Supabase Cloud

## ✨ Features

- 🔐 **Authentication**: Secure user authentication with Supabase Auth
- 🎨 **Modern UI**: Beautiful components with shadcn/ui and Tailwind CSS
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🔒 **Security**: Row-level security (RLS) and role-based access control (RBAC)
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
   git clone <your-repo-url>
   cd arvut-tribe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key to `.env.local`
   - Enable authentication providers in your Supabase dashboard

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication routes
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Login page
│   ├── profile/           # User profile
│   ├── signup/            # Signup page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility functions
│   ├── supabase/         # Supabase configuration
│   └── utils.ts         # Helper functions
└── middleware.ts         # Next.js middleware
```

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
   - Add your Supabase credentials:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Deploy**
   - Vercel will automatically deploy on every push to main

### Supabase Setup

1. **Create a new Supabase project**
2. **Set up authentication**
   - Go to Authentication > Settings
   - Configure your site URL (your Vercel domain)
   - Enable desired auth providers (Email, Google, etc.)

3. **Set up Row Level Security (RLS)**
   - Enable RLS on your tables
   - Create policies for user data access

## 🎨 Customization

### Adding New Pages

1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Use the existing components and patterns

### Styling

- Global styles: `src/app/globals.css`
- Component styles: Use Tailwind CSS classes
- Custom components: Add to `src/components/`

### Database Schema

- Define your tables in Supabase
- Use the Supabase dashboard or SQL editor
- Enable RLS for security

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
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