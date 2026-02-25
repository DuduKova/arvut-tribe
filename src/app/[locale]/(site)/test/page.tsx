import Link from "next/link";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          The Tribe Guardians - Test Page
        </h1>
        <p className="text-lg text-gray-600">
          This is a test page to verify the routing is working.
        </p>
        <div className="mt-8">
          <Link
            href="/he/volunteer-healer"
            className="text-blue-600 hover:underline mr-4"
          >
            Volunteer Form
          </Link>
          <Link
            href="/he/register-patient"
            className="text-blue-600 hover:underline"
          >
            Patient Form
          </Link>
        </div>
      </div>
    </div>
  );
}
