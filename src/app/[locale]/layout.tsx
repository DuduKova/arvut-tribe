import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "../globals.css";
import Link from 'next/link';

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const lato = Lato({ 
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-secondary",
  display: "swap",
});

const locales = ['he', 'en'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Arvut Tribe - Spiritual Retreats",
  description: "A place of healing, growth, and inner connection through spiritual retreats",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Validate that the incoming `locale` parameter is valid
  const { locale } = await params;
  if (!locales.includes(locale as any)) {
    return <div>Locale not found</div>;
  }

  return (
    <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <body className={`${playfairDisplay.variable} ${lato.variable} font-secondary`}>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href={`/${locale}`} className="text-2xl font-bold text-gray-900">
                  Arvut Tribe
                </Link>
                
                <nav className="hidden md:flex items-center space-x-6">
                  <Link href={`/${locale}`} className="text-gray-600 hover:text-gray-900">
                    Home
                  </Link>
                  <Link href={`/${locale}/volunteer-healer`} className="text-gray-600 hover:text-gray-900">
                    Volunteer
                  </Link>
                  <Link href={`/${locale}/register-patient`} className="text-gray-600 hover:text-gray-900">
                    Register
                  </Link>
                </nav>
                
                <div className="flex gap-2">
                  <a href="/he" className={`px-3 py-1 rounded text-sm ${locale === 'he' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    עברית
                  </a>
                  <a href="/en" className={`px-3 py-1 rounded text-sm ${locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    English
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main>
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Arvut Tribe</h3>
                  <p className="text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact</h3>
                  <p className="text-gray-300">Email: info@arvuttribe.com</p>
                  <p className="text-gray-300">Phone: +972-50-123-4567</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Link href={`/${locale}/volunteer-healer`} className="block text-gray-300 hover:text-white">
                      Volunteer as Healer
                    </Link>
                    <Link href={`/${locale}/register-patient`} className="block text-gray-300 hover:text-white">
                      Register as Patient
                    </Link>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                <p>&copy; 2024 Arvut Tribe. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
