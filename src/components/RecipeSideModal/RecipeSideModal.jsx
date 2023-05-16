import React, { useState } from "react";
import "./RecipeSideModal.scss";
import { GrFormClose } from "react-icons/gr";
import {
  AiOutlineClockCircle,
  AiFillStar,
  //AiOutlineHeart,
  //AiFillHeart,
  AiFillCheckCircle,
} from "react-icons/ai";
import { SiHappycow } from "react-icons/si";
import { TbMilk, TbBread } from "react-icons/tb";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdStars } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { hideRecipeModal } from "../../app/redux/modalSlice";
import Recipe from "../Recipe/Recipe";
import useFetch from "../../app/hooks/useFetch";

const RecipeSideModal = () => {
  const dispatch = useDispatch();
  const { favorites, recipes } = useSelector((state) => state.recipe);
  const {
    recipe: currentRecipe,
    // addToFavorites,
    //removeFromFavorites,
  } = useSelector((state) => state.modal.recipeInfo);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const {
    data: detailedRecipe,
    loading,
    error,
  } = useFetch(
    `https://api.spoonacular.com/recipes/${currentRecipe.id}/information?apiKey=${process.env.REACT_APP_RECIPE_INFO}&includeNutrition=false`
  );

  const suggestedRecipes = recipes.filter(
    (recipe) => recipe.id !== currentRecipe.id
  );

  {
    detailedRecipe && console.log(detailedRecipe);
  }

  // const isIncludedInFavorites = (recipeId) => {
  //   return favorites?.map((favRecipe) => favRecipe.id).includes(recipeId);
  // };

  return (
    <div className="recipeSideModal">
      <div className="recipeImage">
        <img src={currentRecipe.image} alt={currentRecipe.title} />
        <div
          className="closeButton"
          onClick={() => dispatch(hideRecipeModal())}
        >
          <GrFormClose />
        </div>
      </div>

      <div className="recipeInfo">
        <div className="recipeInfoContent">
          <div className="infoModal">
            <div className="info">
              <h5>{currentRecipe.title}</h5>
              {currentRecipe.missedIngredientCount === 0 && (
                <p className="noMissedIngredients">
                  You have all {currentRecipe.usedIngredientCount} ingredients
                </p>
              )}
              {currentRecipe.missedIngredientCount > 0 && (
                <p className="missedIngredients">
                  You're missing{" "}
                  {currentRecipe.missedIngredients
                    .map((ingredient) => ingredient.name)
                    .join(", ")}
                </p>
              )}
              {/* {isIncludedInFavorites(currentRecipe.id) ? 
                <AiFillHeart onClick={removeFromFavorites} className='redHeart' /> : 
                <AiOutlineHeart onClick={addToFavorites} />
              } */}
              <div className="tag">
                <AiOutlineClockCircle />
                <span>{detailedRecipe?.readyInMinutes} mins</span>
              </div>
            </div>

            <div className="tags">
              {detailedRecipe?.veryPopular && (
                <div className="tag gold">
                  <AiFillStar />
                  <span>Very popular!</span>
                </div>
              )}
              {detailedRecipe?.vegan && (
                <div className="tag green">
                  <SiHappycow />
                  <span>Vegan!</span>
                </div>
              )}
              {detailedRecipe?.dairyFree && (
                <div className="tag green">
                  <TbMilk />
                  <span>Dairy Free!</span>
                </div>
              )}
              {detailedRecipe?.glutenFree && (
                <div className="tag green">
                  <TbBread />
                  <span>Gluten free!</span>
                </div>
              )}
            </div>
          </div>

          <div className="ingredientInfo">
            <h4>Ingredients</h4>
            {currentRecipe.usedIngredients?.map((usedIngredient) => (
              <div className="usedIngredientItem">
                <span>{usedIngredient.name}</span>
                <AiFillCheckCircle />
              </div>
            ))}
          </div>

          <div className="summary">
            <h4 onClick={() => setSummaryExpanded(!summaryExpanded)}>
              Summary
              {summaryExpanded ? <BsChevronUp /> : <BsChevronDown />}
            </h4>
            {detailedRecipe?.summary && summaryExpanded && (
              <div
                className="summaryText"
                dangerouslySetInnerHTML={{ __html: detailedRecipe?.summary }}
              />
            )}
          </div>

          <a className="viewFullRecipeBtn" href={detailedRecipe?.sourceUrl}>
            View Full Recipe <span>{detailedRecipe?.creditsText}</span>
          </a>

          <div className="suggestedRecipes">
            <h4>You might also like</h4>
            {suggestedRecipes.map((recipe, index) => (
              <Recipe key={index} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSideModal;
