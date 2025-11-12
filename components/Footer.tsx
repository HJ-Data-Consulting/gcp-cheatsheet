export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} GCP Cheat Sheet. Built for developers.
        </p>
      </div>
    </footer>
  );
}

