import { api } from "./api";
import type { Ingredient, MealSummary, MealDetail, IngredientMeasure } from "@/types/meal";

export async function getIngredients(): Promise<Ingredient[]> {
  const res = await api.get<{ meals: Ingredient[] }>("/list.php?i=list");
  return res.data?.meals ?? [];
}

export async function getMealsByIngredient(ingredient: string): Promise<MealSummary[]> {
  const res = await api.get<{ meals: MealSummary[] }>(`/filter.php?i=${encodeURIComponent(ingredient)}`);
  return res.data?.meals ?? [];
}

export async function getMealById(id: string): Promise<MealDetail | null> {
  const res = await api.get<{ meals: MealDetail[] }>(`/lookup.php?i=${id}`);
  return res.data?.meals?.[0] ?? null;
}

export function extractIngredients(meal: MealDetail): IngredientMeasure[] {
  const result: IngredientMeasure[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      result.push({ ingredient: ingredient.trim(), measure: measure?.trim() ?? "" });
    }
  }
  return result;
}

export function extractSteps(instructions: string): string[] {
  return instructions
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function getYouTubeId(url: string): string | null {
  const match = url.match(/[?&]v=([^&]+)/);
  return match?.[1] ?? null;
}

export function getIngredientImageUrl(name: string): string {
  return `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}-Small.png`;
}
