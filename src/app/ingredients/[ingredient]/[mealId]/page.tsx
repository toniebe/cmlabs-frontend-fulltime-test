import Image from "next/image";
import {
  getMealById,
  extractIngredients,
  extractSteps,
  getYouTubeId,
} from "@/lib/meals";
import Breadcrumb from "@/components/organisms/Breadcrumb";
import IngredientsChecklist from "@/components/molecules/IngredientsChecklist";
import StepsList from "@/components/molecules/StepsList";
import Button from "@/components/atoms/Button";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ ingredient: string; mealId: string }>;
}

export default async function RecipeDetailsPage({ params }: Props) {
  const { ingredient, mealId } = await params;
  const decoded = decodeURIComponent(ingredient);
  const meal = await getMealById(mealId);

  if (!meal) notFound();

  const ingredients = extractIngredients(meal);
  const steps = extractSteps(meal.strInstructions);
  const youtubeId = meal.strYoutube ? getYouTubeId(meal.strYoutube) : null;

  return (
    <div className="bg-gray-50">
      <Breadcrumb
        items={[
          { label: "Ingredients", href: "/" },
          {
            label: decoded,
            href: `/ingredients/${encodeURIComponent(decoded)}`,
          },
          { label: meal.strMeal },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900 mb-6">{meal.strMeal}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={meal.strMealThumb ?? ""}
            alt={meal.strMeal}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Ingredients Checklist
          </h2>
          <IngredientsChecklist items={ingredients} />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Step-by-Step Instructions
        </h2>
        <StepsList steps={steps} />
      </div>

      {youtubeId && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Video Tutorial
          </h2>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={`${meal.strMeal} tutorial`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <a
            href={meal.strYoutube ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm text-gray-600 underline hover:text-gray-900"
          >
            Watch Full Video
          </a>
        </div>
      )}

      <Button
        href={`/ingredients/${encodeURIComponent(decoded)}`}
        variant="outline"
      >
        ← Back to Meals
      </Button>
    </div>
  );
}
