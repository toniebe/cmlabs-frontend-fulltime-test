interface StepsListProps {
  steps: string[];
}

export default function StepsList({ steps }: StepsListProps) {
  return (
    <ol className="flex flex-col gap-3 list-decimal list-inside">
      {steps.map((step, i) => (
        <li key={i} className="text-sm text-gray-700 leading-relaxed">
          {step}
        </li>
      ))}
    </ol>
  );
}
