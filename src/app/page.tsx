import Link from 'next/link';

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome to the Mini Projects Hub
        </h1>
        <p className="text-gray-600 mb-8">
          Choose one of the projects below to explore.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
              href="/foobar"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-center"
          >
            Go to FooBar Page
          </Link>

          <Link
              href="/weather"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition text-center"
          >
            Go to Weather Page
          </Link>
        </div>
      </main>
  );
}
