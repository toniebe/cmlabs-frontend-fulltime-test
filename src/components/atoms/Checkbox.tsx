"use client";

interface CheckboxProps {
  label: string;
  measure?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ label, measure, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-gray-300 accent-gray-800 cursor-pointer"
      />
      <span className={`text-sm flex-1 ${checked ? "line-through text-gray-400" : "text-gray-700"}`}>
        {measure && <span className="font-medium">{measure} </span>}
        {label}
      </span>
    </label>
  );
}
