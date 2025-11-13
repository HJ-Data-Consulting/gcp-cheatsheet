import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            GCP Cheat Sheet
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/topics" className="text-gray-700 hover:text-gray-900">
              Topics
            </Link>
            <Link href="/errors" className="text-gray-700 hover:text-gray-900">
              Common Errors
            </Link>
            <SearchBar />
          </nav>
        </div>
      </div>
    </header>
  );
}

