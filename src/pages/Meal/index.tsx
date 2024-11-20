import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Recipe } from "../../types";
import { fetchRecipeById } from "../../services";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../store/basketSlice";

const Meal = () => {
  const dispatch = useDispatch();
  const { mealId } = useParams<{ mealId: string }>();
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      if (!mealId) return;
      setLoading(true);

      try {
        const fetchedRecipe = await fetchRecipeById(+mealId);
        setRecipe(fetchedRecipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [mealId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipe) {
    return <div>Recipe not found!</div>;
  }

  return (
    <section className="content">
      <div className="meal-details">
        <h1 className="meal-title">{recipe.strMeal}</h1>
        <div className="meal-content" >
          <div>
            <div className="meal-img">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            </div>
          </div>
          <div>
            <p className="meal-category">Category: {recipe.strCategory}</p>
            <p className="meal-area">Area: {recipe.strArea}</p>
            <p className="meal-instructions">Instructions: {recipe.strInstructions}</p>
            <ul className="meal-ingredients">
              {Array.from({ length: 20 }).map((_, index) => {
                const ingredient = recipe[`strIngredient${index + 1}` as keyof Recipe];
                const measure = recipe[`strMeasure${index + 1}` as keyof Recipe];
                if (!ingredient || ingredient.trim() === "") return null;
                return (
                  <li key={index} className="meal-ingredient">
                    {ingredient} - {measure}
                  </li>
                );
              })}
            </ul>
            <div>
              <button className="button" onClick={() => dispatch(addToBasket(recipe))}>Add to basket</button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Meal;
