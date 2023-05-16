import React, { useMemo, useEffect } from "react";
import "./Recipes.scss";
import { useSelector, useDispatch } from "react-redux";
import { setRecipes } from "../../../../app/redux/recipeSlice";
import useFetch from "../../../../app/hooks/useFetch";
import Recipe from "../../../Recipe/Recipe";
import { MagnifyingGlass } from "react-loader-spinner";

const Recipes = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector(
    (state) => state.ingredient.selectedIngredients
  );
  const favorites = useSelector((state) => state.recipe.favorites);

  const ingredientQueryString = selectedIngredients.join(", ");
  const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_GET_RECIPES}&ingredients=${ingredientQueryString}&number=50&limitLicense=true&ranking=2&ignorePantry=true`;

  const { data: recipeList, loading, error } = useFetch(url);

  useEffect(() => {
    dispatch(setRecipes(recipeList));
  }, [recipeList]);

  const recipesThatIncludeSearchQuery = useMemo(() => {
    return recipeList?.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [recipeList, searchQuery]);

  // const favoritesThatIncludeSearchQuery = useMemo(() => {
  //   return favorites?.filter((recipe) =>
  //     recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // }, [favorites, searchQuery]);

  const noMissingIngredients = useMemo(
    () =>
      recipesThatIncludeSearchQuery?.filter(
        (recipe) => recipe.missedIngredientCount === 0
      ),
    [recipesThatIncludeSearchQuery]
  );
  const missingOne = useMemo(
    () =>
      recipesThatIncludeSearchQuery?.filter(
        (recipe) => recipe.missedIngredientCount === 1
      ),
    [recipesThatIncludeSearchQuery]
  );
  const missingMultiple = useMemo(
    () =>
      recipesThatIncludeSearchQuery?.filter(
        (recipe) => recipe.missedIngredientCount > 2
      ),
    [recipesThatIncludeSearchQuery]
  );

  return (
    <div className="recipes">
      {loading && (
        <MagnifyingGlass
          visible={true}
          height="120"
          width="120"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#93C759"
        />
      )}

      {recipeList?.length > 0 && (
        <h1>
          You can make <span>{noMissingIngredients.length}</span>{" "}
          {`${noMissingIngredients.length === 1 ? "recipe" : "recipes"}`}
        </h1>
      )}

      {noMissingIngredients?.length > 0 && (
        <>
          <h2>You have everything you need to make:</h2>
          <div className="missingNone">
            {noMissingIngredients &&
              noMissingIngredients.map((recipe, index) => (
                <Recipe key={index} recipe={recipe} />
              ))}
          </div>
        </>
      )}

      {missingOne?.length > 0 && (
        <>
          <h2>Missing only 1 ingredient for:</h2>
          <div className="missingOne">
            {missingOne &&
              missingOne.map((recipe, index) => (
                <Recipe key={index} recipe={recipe} />
              ))}
          </div>
        </>
      )}

      {missingMultiple?.length > 0 && (
        <>
          <h2>Get some groceries and come back for these:</h2>
          <div className="missingMultiple">
            {missingMultiple &&
              missingMultiple.map((recipe, index) => (
                <Recipe key={index} recipe={recipe} />
              ))}
          </div>
        </>
      )}

      {/* {mainView === "FAVORITES" && (
        <div className="favorites">
          {favoritesThatIncludeSearchQuery.map((recipe, index) => (
            <Recipe
              key={index}
              recipe={recipe}
              switchToSignUpPage={switchToSignUpPage}
            />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Recipes;
