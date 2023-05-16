import React from 'react'
import { FaCopy, FaTrashAlt } from 'react-icons/fa'
import { showNotificationModal, hideNotificationModal } from '../../../../app/redux/modalSlice'
import { copyToClipboard } from '../../../../app/utils/utils'
import { removeAllIngredients } from '../../../../app/redux/ingredientSlice'
import { useDispatch, useSelector } from 'react-redux'

const ExtraOptionsDropdown = ({ hideDropdown }) => {

    const removeIngredients = {
        title: 'Woah!',
        message: 'Are you sure you want to remove all of your ingredients?',
        actionButtonText: 'Yes',
        onActionButtonClick: () => {
            dispatch(removeAllIngredients())
            dispatch(hideNotificationModal())
        },
        closeButtonText: 'Cancel'
    }
    
    const copyIngredientsSuccessful = {
        title: 'Success!',
        message: 'Your ingredients have been copied to your clipboard.',
        actionButtonText: '',
        onActionButtonClick: null,
        closeButtonText: 'OK'
    }
    
    const copyIngredientsFailed = {
        title: 'Woops!',
        message: 'You have no ingredients. Add some ingredients and try again.',
        actionButtonText: '',
        onActionButtonClick: null,
        closeButtonText: 'OK'
    }

    const dispatch = useDispatch()
    const selectedIngredients = useSelector(state => state.ingredient.selectedIngredients)

  return (
        <div className='extraOptionsDropdown'>
            <div 
                className="extraDropdownItem"
                onClick={() => {
                    dispatch(showNotificationModal(removeIngredients))
                    hideDropdown()
                }}
            >
                <FaTrashAlt/> <span>remove all ingredients</span>
            </div>
            <div 
                className="extraDropdownItem"
                onClick={() => {
                    if(selectedIngredients.length > 0) {
                        copyToClipboard(selectedIngredients)
                        dispatch(showNotificationModal(copyIngredientsSuccessful))
                        hideDropdown()
                    } else {
                        dispatch(showNotificationModal(copyIngredientsFailed))
                    }
                }}
            >
                <FaCopy/> <span>copy your ingredients to clipboard</span>
            </div>
        </div>
  )
}

export default ExtraOptionsDropdown