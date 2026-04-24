import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Foods", href: "/foods" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Local Culinary", href: "/local" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-base font-bold text-gray-900 tracking-tight">
          mealapp
        </Link>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
