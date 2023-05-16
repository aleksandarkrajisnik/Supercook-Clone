import React from 'react'
import './IngredientModalSelected.scss'
import { useSelector, useDispatch } from 'react-redux'
import { removeIngredient } from '../../../../app/redux/ingredientSlice'
import { FaTrashAlt } from 'react-icons/fa'

const IngredientModalSelected = ({ ingredientGroup }) => {

    const dispatch = useDispatch()
    const selectedIngredients = useSelector(state => state.ingredient.selectedIngredients)
    const selectedIngredientsFromGroup = ingredientGroup.ingredients.filter(ingredient => selectedIngredients.includes(ingredient))

  return (
    <div className='ingredientModalSelected'>
        <div className="modalHeader">
            <img src={ingredientGroup.icon} alt={ingredientGroup.title} />
            <h3>{ingredientGroup.title}</h3>
        </div>
        <div className="ingredientList">
            {selectedIngredientsFromGroup.map((ingredient, index) => 
                <div key={index} className="ingredientListItem">
                    <span>{ingredient}</span>
                    <div className="icons">
                        <FaTrashAlt 
                            className='trashIcon'
                            onClick={() => dispatch(removeIngredient(ingredient))}
                        />
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default IngredientModalSelected