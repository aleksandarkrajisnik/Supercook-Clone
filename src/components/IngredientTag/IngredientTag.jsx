import React, { useEffect } from 'react'
import './IngredientTag.scss'
import { addIngredient, removeIngredient } from '../../app/redux/ingredientSlice'
import { useDispatch, useSelector } from 'react-redux'

const IngredientTag = ({ content, expandModal }) => {

  const dispatch = useDispatch();
  const selectedIngredients = useSelector(state => state.ingredient.selectedIngredients);

  const tagSelected = selectedIngredients.includes(content)

  const handleTagClick = () => {
    if(expandModal){
      expandModal(); 
    } else {
      if (!tagSelected){
        dispatch(addIngredient(content))
      } else {
        dispatch(removeIngredient(content))
      }
    }
  }

  return (
    <div 
      className={`ingredientTag ${tagSelected ? 'selected' : ''}`}
      onClick={handleTagClick}
    >
        {content}
    </div>
  )
}

export default IngredientTag