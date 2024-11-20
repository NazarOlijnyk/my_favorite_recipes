import { useSelector } from "react-redux";
import { selectBasketValue, selectBasketIngridients } from "../../store/basketSlice";
import { Link } from "react-router-dom";

const Basket = () => {
  const recipesList = useSelector(selectBasketValue);
  const basketIngridients = useSelector(selectBasketIngridients);
  console.log({basketIngridients});
  
  return (
    <section className="content">
      <div className="basket-content">
        <div className="basket-list">
        <h2 className="basket-tabel-title">List of Recipes in the Basket:</h2>
          <ul>
            {
              recipesList.map(recipe => (
                <li key={recipe.idMeal}>
                  <Link to={`/meal/${recipe.idMeal}`}>
                    <div>{recipe.strMeal}</div>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="basket-ingridients">
          <h2 className="basket-tabel-title">List of Ingridients in the Basket:</h2>
          <ul>
            {
              Object.entries(basketIngridients).map(([ingridient, count]) => (
                <li key={ingridient} className="basket-ingridient">
                  <span>{ingridient}</span>
                  <span>{count}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Basket;