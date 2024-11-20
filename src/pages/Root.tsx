import { useEffect, useState } from "react";
// import ReactPaginate from 'react-paginate';
import { fetchCategories, fetchCountries } from "../services";
import { Categories, Countries } from "../types";
import { Outlet, Link } from "react-router-dom";

// const PAGE_SIZE = 6;

const Root = () => {
  // const [allRecipes, setAllRecipes] = useState<Map<string, Recipe>>(new Map());
  const [categories, setCategories] = useState<Categories>([]);
  const [countries, setCountries] = useState<Countries>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);

      const fetchedCountries = await fetchCountries();
      setCountries(fetchedCountries);

      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <>
      <header className="header">
        <div className="container header__content">
          <Link to={`/`} className="logo">Logo</Link>
          <Link to={`/basket`} className="link">Basket</Link>
          <input type="text" placeholder="Search" />
        </div>
      </header>
      <main className="main container">
        <aside className="side-menu">
          <div className="side-menu--block">
            <div className="side-menu--title">Browse By Categories</div>
            <ul className="side-menu--list">
              {categories.map(category => (
                <li className="side-menu--litem" key={category.strCategory}>
                  {category.strCategory}
                </li>
              ))}
            </ul>
          </div>
          <div className="side-menu--block">
            <div className="side-menu--title">Browse By Countries</div>
            <ul className="side-menu--list">
              {countries.map(country => (
                <li className="side-menu--litem" key={country.strArea}>
                  {country.strArea}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <Outlet />
      </main>
      <footer className="footer"></footer>
    </>
  );
};

export default Root;
