import MealCard from "@/components/atoms/MealCard";
import type { MealSummary } from "@/types/meal";

interface MealGridProps {
  meals: MealSummary[];
  ingredient: string;
}

export default function MealGrid({ meals, ingredient }: MealGridProps) {
  if (meals.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        No meals found for this ingredient.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {meals.map((meal) => (
        <MealCard
          key={meal.idMeal}
          id={meal.idMeal}
          name={meal.strMeal}
          thumbnail={meal.strMealThumb}
          ingredient={ingredient}
        />
      ))}
    </div>
  );
}
