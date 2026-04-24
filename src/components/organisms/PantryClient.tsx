"use client";

import { useState } from "react";
import SearchInput from "@/components/atoms/SearchInput";
import IngredientGrid from "@/components/molecules/IngredientGrid";
import type { Ingredient } from "@/types/meal";
import BlurText from "../atoms/BlurText";

interface PantryClientProps {
  ingredients: Ingredient[];
}

export default function PantryClient({ ingredients }: PantryClientProps) {
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? ingredients.filter((ing) =>
        ing.strIngredient.toLowerCase().includes(search.toLowerCase()),
      )
    : ingredients;

  return (
    <div className="flex flex-col items-center gap-6 bg-gray-50">
      <div className="text-center">
        <BlurText
          text="Welcome to the Meal Pantry"
          delay={200}
          animateBy="words"
          direction="top"
          className="text-2xl mb-8 text-blue-950" 
        />
        {/* <h1 className="text-3xl font-bold text-gray-900"></h1>
        <h1 className="text-3xl font-bold text-gray-900">Meal Pantry</h1> */}
      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search Ingredients... (e.g., pasta, chicken, garlic)"
      />

      <p className="text-sm text-gray-500">Start with what you have.</p>

      <div className="w-full">
        <IngredientGrid ingredients={filtered} />
      </div>
    </div>
  );
}
