import { getMealsByIngredient } from "@/lib/meals";
import Breadcrumb from "@/components/organisms/Breadcrumb";
import Badge from "@/components/atoms/Badge";
import MealGrid from "@/components/molecules/MealGrid";

interface Props {
  params: Promise<{ ingredient: string }>;
}

export default async function MealIdeasPage({ params }: Props) {
  const { ingredient } = await params;
  const decoded = decodeURIComponent(ingredient);
  const meals = await getMealsByIngredient(decoded);

  return (
    <div className="bg-gray-50">
      <Breadcrumb
        items={[
          { label: "Ingredients", href: "/" },
          { label: decoded },
        ]}
      />

      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Pasta Meals with {decoded}
      </h1>

      <div className="flex items-center gap-2 mb-6">
        <Badge label="By Ingredient" variant="default" />
        <Badge label={`Pasta, ${decoded}`} variant="muted" />
      </div>

      <MealGrid meals={meals} ingredient={decoded} />
    </div>
  );
}
