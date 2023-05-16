import React from 'react'
import './NoRecipes.scss'
import recipeBook from '../../../../assets/img/icons/empty-state-icon.png'
import { SlMagnifier } from 'react-icons/sl'
import { useSelector } from 'react-redux'

const NoRecipes = ({ searchForRecipes }) => {

  const selectedIngredients = useSelector(state => state.ingredient.selectedIngredients)

  return (
    <div className='noRecipes'>

      { selectedIngredients.length === 0 ? 
          <>
            <img src={recipeBook} alt="No Recipes" />
            <h1>Add your ingredients to get started</h1>
            <h1>Every ingredient you add unlocks more recipes</h1>
          </>
        : 
          <>
            <div className='searchForRecipes' onClick={searchForRecipes}>
              <SlMagnifier/>
            </div>
            <h1>Click to search</h1>
          </>
      }
    </div>
  )
}

export default NoRecipes