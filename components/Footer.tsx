export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:bg-slate-900 dark:border-slate-800 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} GCP Developer Platform. Built for developers.
        </p>
      </div>
    </footer>
  );
}

