import { ApiRecipesResponse, Recipe, ApiCategoriesResponse, Categories, ApiCountriesResponse, Countries, Recipes } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchRandomRecipes = async (count: number): Promise<Recipe[]> => {
  const allRecipes: Recipe[] = [];
  const seenIds = new Set<string>();

  while (allRecipes.length < count) {
    const response = await fetch(`${API_BASE_URL}/random.php`);
    const data: ApiRecipesResponse = await response.json();

    if (data.meals && data.meals.length > 0) {
      const recipe = data.meals[0];
      if (!seenIds.has(recipe.idMeal)) {
        seenIds.add(recipe.idMeal);
        allRecipes.push(recipe);
      }
    }
  }

  return allRecipes;
};

export const fetchCategories = async (): Promise<Categories> => {
  const response = await fetch(`${API_BASE_URL}/list.php?c=list`);
  const data: ApiCategoriesResponse = await response.json();

  return data.meals;
}

export const fetchCountries = async (): Promise<Countries> => {
  const response = await fetch(`${API_BASE_URL}/list.php?a=list`);
  const data: ApiCountriesResponse = await response.json();

  return data.meals;
}

export const fetchRecipesByLetter = async (letter: string): Promise<Recipes> => {
  const response = await fetch(`${API_BASE_URL}/search.php?f=${letter}`);
  const data: ApiRecipesResponse = await response.json();
  return data.meals || [];
};

// export const fetchAllRecipes = async (): Promise<Recipes> => {
//   const letters = "abcdefghijklmnopqrstuvwxyz".split("");
//   const allRecipes = await Promise.all(letters.map(fetchRecipesByLetter));
//   return allRecipes.flat();
// };

export const fetchAllRecipes = async (): Promise<Map<string, Recipe>> => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const recipesArray = await Promise.all(letters.map(fetchRecipesByLetter));
  const flatRecipes = recipesArray.flat();
  return new Map(flatRecipes.map(recipe => [recipe.idMeal, recipe]));
};

export const fetchRecipeById = async (id: number): Promise<Recipe> => {
  const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
  const data: ApiRecipesResponse = await response.json();

  return data.meals[0];
}