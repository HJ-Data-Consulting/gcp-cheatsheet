import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:bg-slate-900 dark:border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            GCP Platform
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/cheatsheet" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
              Cheat Sheet
            </Link>
            <Link href="/tools/startup-box" className="text-gray-700 dark:text-gray-300 hover:text-purple-600">
              Startup Box
            </Link>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
            <Link href="/cheatsheet/topics" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900">
              Topics
            </Link>
            <Link href="/cheatsheet/errors" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900">
              Errors
            </Link>
            <SearchBar />
          </nav>
        </div>
      </div>
    </header>
  );
}

