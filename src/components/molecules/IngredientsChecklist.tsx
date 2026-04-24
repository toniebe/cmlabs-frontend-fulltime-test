"use client";

import { useState } from "react";
import Checkbox from "@/components/atoms/Checkbox";
import type { IngredientMeasure } from "@/types/meal";

interface IngredientsChecklistProps {
  items: IngredientMeasure[];
}

export default function IngredientsChecklist({ items }: IngredientsChecklistProps) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggle = (index: number, value: boolean) => {
    setChecked((prev) => ({ ...prev, [index]: value }));
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <Checkbox
          key={i}
          label={item.ingredient}
          measure={item.measure}
          checked={!!checked[i]}
          onChange={(val) => toggle(i, val)}
        />
      ))}
    </div>
  );
}
