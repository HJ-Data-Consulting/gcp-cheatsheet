export default function Footer() {
  return (
    <footer className="bg-apple-gray dark:bg-black py-8 mt-auto">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
            Copyright © {new Date().getFullYear()} Minimalist&apos;s Guide to the Cloud. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <span className="text-gray-300">|</span>
                <a href="#" className="hover:underline">Terms of Use</a>
            </div>
        </div>
      </div>
    </footer>
  );
}

