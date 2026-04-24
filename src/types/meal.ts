export interface Ingredient {
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetail {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  strTags: string | null;
  [key: string]: string | null;
}

export interface IngredientMeasure {
  ingredient: string;
  measure: string;
}
