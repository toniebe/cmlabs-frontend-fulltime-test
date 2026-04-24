import { getIngredients } from "@/lib/meals";
import PantryClient from "@/components/organisms/PantryClient";

export default async function PantryPage() {
  const ingredients = await getIngredients();

  return <PantryClient ingredients={ingredients} />;
}
