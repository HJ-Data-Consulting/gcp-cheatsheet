import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-nav transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="text-xl font-semibold tracking-tight text-apple-dark dark:text-white hover:opacity-80 transition-opacity">
            Minimalist
          </Link>
          <nav className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6 text-xs font-medium text-gray-600 dark:text-gray-300">
              <Link href="/cheatsheet" className="hover:text-apple-blue transition-colors">
                Cheat Sheet
              </Link>
              <Link href="/tools/startup-box" className="hover:text-apple-blue transition-colors">
                Startup Box
              </Link>
              <Link href="/cheatsheet/topics" className="hover:text-apple-blue transition-colors">
                Topics
              </Link>
            </div>
            <SearchBar />
          </nav>
        </div>
      </div>
    </header>
  );
}

