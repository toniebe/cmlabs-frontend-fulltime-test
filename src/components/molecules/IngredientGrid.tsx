import IngredientCard from "@/components/atoms/IngredientCard";
import type { Ingredient } from "@/types/meal";

interface IngredientGridProps {
  ingredients: Ingredient[];
}

export default function IngredientGrid({ ingredients }: IngredientGridProps) {
  if (ingredients.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        No ingredients found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {ingredients.map((ing) => (
        <IngredientCard key={ing.strIngredient} name={ing.strIngredient} />
      ))}
    </div>
  );
}
