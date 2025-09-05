import { BRAND } from "../utils/core";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {BRAND} - Made with ❤️ by Ishwar Katwe.
        </p>
      </div>
    </footer>
  );
}
