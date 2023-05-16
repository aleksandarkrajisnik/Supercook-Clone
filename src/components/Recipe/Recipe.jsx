import React from "react";
import { useDispatch } from "react-redux";
import { showRecipeModal } from "../../app/redux/modalSlice";
import "./Recipe.scss";

const Recipe = ({ recipe }) => {
  const dispatch = useDispatch();

  const onRecipeClick = (recipe) => {
    dispatch(
      showRecipeModal({
        recipe: recipe,
      })
    );
  };

  return (
    <div className="recipe">
      <div
        className="recipeImage"
        style={{
          backgroundImage: `url(${recipe.image})`,
        }}
      ></div>
      <div onClick={() => onRecipeClick(recipe)} className="recipeText">
        <h4>{recipe.title}</h4>
        {recipe.missedIngredientCount === 0 && (
          <p className="noMissedIngredients">
            You have all {recipe.usedIngredientCount} ingredients
          </p>
        )}
        {recipe.missedIngredientCount > 0 && (
          <p className="missedIngredients">
            You're missing{" "}
            {recipe.missedIngredients
              .map((ingredient) => ingredient.name)
              .join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default Recipe;
