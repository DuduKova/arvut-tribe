import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function HomePage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Arvut Tribe
            </h1>
            <p className="text-xl text-gray-600">
              Your modern web application built with Next.js, TypeScript, and Supabase
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>
                  Secure user authentication with Supabase Auth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Built-in authentication with role-based access control (RBAC) and row-level security (RLS).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Database</CardTitle>
                <CardDescription>
                  PostgreSQL database with real-time subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Full-featured PostgreSQL database with real-time capabilities and automatic API generation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modern UI</CardTitle>
                <CardDescription>
                  Beautiful components with shadcn/ui and Tailwind CSS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Pre-built components with dark mode support and responsive design.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Hello, {user.email}!
              </h2>
              <p className="text-gray-600 mb-6">
                You are successfully authenticated and ready to start building your application.
              </p>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/dashboard">
                    Go to Dashboard
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/profile">
                    View Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
