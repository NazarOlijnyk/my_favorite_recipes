import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { fetchAllRecipes } from "../../services";
import { Recipe } from "../../types";
import { Link } from "react-router-dom";

const PAGE_SIZE = 6;

const Home = () => {
  const [allRecipes, setAllRecipes] = useState<Map<string, Recipe>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const recipes = await fetchAllRecipes();
      console.log({recipes});
      setAllRecipes(recipes);

      setLoading(false);
    };

    loadData();
  }, []);

  const recipesArray = Array.from(allRecipes.values());

  const totalPages = Math.ceil(allRecipes.size / PAGE_SIZE);

  const [itemOffset, setItemOffset] = useState(0);
  console.log({itemOffset})

  const endOffset = itemOffset + PAGE_SIZE;
  const currentRecipes = recipesArray.slice(itemOffset, endOffset);

  const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * PAGE_SIZE) % allRecipes.size;
    setItemOffset(newOffset);
  };

  return (
    <section className="content">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              <ul className="meal-list">
                {currentRecipes.map(recipe => (
                  <li className="meal-item" key={recipe.idMeal}>
                    <Link to={`/meal/${recipe.idMeal}`}>
                      <div className="meal-item--wrapper">
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                      </div>
                      <div className="meal-item--title">{recipe.strMeal}</div>
                      <div className="meal-item--category">Category: {recipe.strCategory}</div>
                      <div className="meal-item--country">Country: {recipe.strArea}</div>
                    </Link>
                  </li>
                ))}
              </ul>
              <ReactPaginate
                containerClassName="pagination"
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={7}
                pageCount={totalPages}
                previousLabel="<"
                renderOnZeroPageCount={null}
                marginPagesDisplayed={1}
                pageClassName="pagination-btn"
              />
            </>
          )}
        </section>
  );
};

export default Home;
