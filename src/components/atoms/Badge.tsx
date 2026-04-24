interface BadgeProps {
  label: string;
  variant?: "default" | "muted";
}

export default function Badge({ label, variant = "default" }: BadgeProps) {
  const base = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
  const variants = {
    default: "bg-gray-900 text-white",
    muted: "bg-gray-100 text-gray-700",
  };
  return <span className={`${base} ${variants[variant]}`}>{label}</span>;
}
