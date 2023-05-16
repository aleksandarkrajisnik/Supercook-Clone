import React, { useState, useEffect } from 'react'
import './SidebarSearchBar.scss'
import { SlMagnifier } from 'react-icons/sl'
import SuggestionsDropdown from './SuggestionsDropdown'
import { allIngredients } from '../../../../app/const/ingredients'
import OutsideAlerter from '../../../../app/hoc/OutsideAlerter'
import { useDispatch, useSelector } from 'react-redux'
import { addIngredient, removeIngredient } from '../../../../app/redux/ingredientSlice'
import { showNotificationModal } from '../../../../app/redux/modalSlice'

const SidebarSearchBar = () => {

  const selectedIngredients = useSelector(state => state.ingredient.selectedIngredients);
  const dispatch = useDispatch()
  const [showSuggestionsDropdown, setShowSuggestionDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (allIngredients.includes(searchQuery) && !selectedIngredients.includes(searchQuery)) {
        dispatch(addIngredient(searchQuery))
        setShowSuggestionDropdown(false)
      } else if (selectedIngredients.includes(searchQuery)) {
        dispatch(removeIngredient(searchQuery))
        setShowSuggestionDropdown(false)
      } else {
        dispatch(showNotificationModal({
          title: 'Woops!',
          message: 'No ingredients were recognized in your speech.',
          actionButtonText: '',
          onActionButtonClick: () => {},
          closeButtonText: 'OK',
        }))
      }
    }
  };

  useEffect(() => {
    if(searchQuery === ''){
      setShowSuggestionDropdown(false)
    }
  }, [searchQuery])

  return (
    <div className='searchBar sidebarSearchBar'>
      <SlMagnifier/>
      <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => {
          setShowSuggestionDropdown(true)
          setSearchQuery(e.target.value)
        }} 
        onKeyDown={handleKeyDown}
        placeholder='add/remove/paste ingredients'
      />
      {showSuggestionsDropdown && 
        <OutsideAlerter handleOutsideClick={() => setShowSuggestionDropdown(false)}>
          <SuggestionsDropdown 
            searchQuery={searchQuery} 
            clearSearchQuery={() => setSearchQuery('')}
            hideDropdown={() => setShowSuggestionDropdown(false)}
          />
        </OutsideAlerter>
      }
    </div>
  )
}

export default SidebarSearchBar