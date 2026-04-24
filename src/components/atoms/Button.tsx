import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
}

export default function Button({ children, onClick, href, variant = "primary", className = "" }: ButtonProps) {
  const base = "inline-flex items-center justify-center px-5 py-2 rounded-lg text-sm font-medium transition-colors";
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return <Link href={href} className={cls}>{children}</Link>;
  }
  return <button onClick={onClick} className={cls}>{children}</button>;
}
