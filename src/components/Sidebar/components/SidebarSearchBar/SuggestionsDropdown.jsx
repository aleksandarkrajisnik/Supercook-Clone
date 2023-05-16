import React from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { FaTrashAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { allIngredients } from '../../../../app/const/ingredients'
import { useDispatch } from 'react-redux'
import { addIngredient, removeIngredient } from '../../../../app/redux/ingredientSlice'
import { useSnackbar } from 'react-simple-snackbar'
import { ingredientAdded, ingredientRemoved } from '../../../../app/const/snackbarOptions'


const SuggestionsDropdown = ({ searchQuery, clearSearchQuery, hideDropdown }) => {

  const dispatch = useDispatch()
  const selectedIngredients = useSelector(state => state.ingredient.selectedIngredients);

  const [openGreenSnackbar, closeGreenSnackbar] = useSnackbar(ingredientAdded)
  const [openRedSnackbar, closeRedSnackbar] = useSnackbar(ingredientRemoved)

  const ingredientsThatIncludeQuery = allIngredients.filter(ingredient => ingredient.includes(searchQuery));
  const ingredientDropdownSuggestions = ingredientsThatIncludeQuery.length > 6 ? ingredientsThatIncludeQuery.slice(0, 5) : ingredientsThatIncludeQuery

  const handleDropdownItemClick = (ingredient) => {
    clearSearchQuery();
    hideDropdown();

    if (selectedIngredients.includes(ingredient)){
      dispatch(removeIngredient(ingredient))
      openRedSnackbar('Ingredient removed', [3000])
    } else {
      dispatch(addIngredient(ingredient));
      openGreenSnackbar('Ingredient added', [3000])
    }
  }
  
  return (
    <div className="suggestionsDropdown">
        {ingredientDropdownSuggestions.map((ingredient, index) => 
          <div 
            key={index} 
            className='dropdownItem'
            onClick={() => handleDropdownItemClick(ingredient)}
          >
            {selectedIngredients.includes(ingredient) ? <FaTrashAlt className='trash'/> : <BsPlusLg className='plus'/>}
            {ingredient}
            <span>{selectedIngredients.includes(ingredient) ? 'remove' : 'add'}</span>
          </div>
        )}
      </div>
  )
}

export default SuggestionsDropdown