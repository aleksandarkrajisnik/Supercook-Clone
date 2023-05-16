import React, { useState, useEffect } from "react";
import "./Main.scss";
import { SlMagnifier } from "react-icons/sl";
import { useSelector } from "react-redux";
import NoRecipes from "./components/NoRecipes/NoRecipes";
import Recipes from "./components/Recipes/Recipes";

const Main = () => {
  const selectedIngredients = useSelector(
    (state) => state.ingredient.selectedIngredients
  );
  const recipes = useSelector((state) => state.recipe.recipes);
  const [showRecipes, setShowRecipes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (showRecipes) {
      setShowRecipes(false);
    }
  }, [selectedIngredients]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchQuery(event.target.value);
    }
  };

  const recipePantryInfo = () => {
    return (
      <>
        <h3>SuperCook</h3>
        {recipes?.length > 0 ? (
          <span>You can make {recipes.length} recipes</span>
        ) : (
          <span>Add some ingredients to start</span>
        )}
        {/* <div className="mainHeaderActions">
          {userIsLoggedIn && (
            <AiOutlineHeart
              onClick={() => {
                setShowRecipes(true);
                setMainView("FAVORITES");
              }}
            />
          )}
          <HiOutlineUserCircle
            onClick={switchToLogInPage}
            className="profileIcon"
          />
        </div> */}
      </>
    );
  };

  return (
    <div className="main">
      <div className="mainHeader">
        <div className="pantryInfo">
          <h3>SuperCook</h3>
          <span>Your stomach's best friend</span>
        </div>
        <div className="searchBar">
          <SlMagnifier />
          <input type="text" placeholder="Find..." onKeyDown={handleKeyDown} />
        </div>
      </div>
      <div className="mainContainer">
        {showRecipes ? (
          <Recipes searchQuery={searchQuery} />
        ) : (
          <NoRecipes searchForRecipes={() => setShowRecipes(true)} />
        )}
      </div>
    </div>
  );
};

export default Main;
