import React, { useState, useMemo } from 'react'
import './Sidebar.scss'
import SidebarSearchBar from './components/SidebarSearchBar/SidebarSearchBar'
import IngredientModalAll from './components/IngredientModalAll/IngredientModalAll'
import IngredientModalSelected from './components/IngredientModalSelected/IngredientModalSelected'
import { allIngredientsCategorized } from '../../app/const/ingredients'
import OptionsBar from './components/OptionsBar/OptionsBar'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  
  //Sidebar view = ALL_INGREDIENTS || SELECTED_INGREDIENTS
  const [sidebarView, setSidebarView] = useState('ALL_INGREDIENTS') 

  const selectedIngredients = useSelector(state => state.ingredient.selectedIngredients)

  //This array is needed to render the SELECTED_INGREDIENTS view, to show designated groups of each
  //ingredient and not to render them under 'Pantry Essentials'
  const allIngredientsWithoutPantryEssentials = [...allIngredientsCategorized].filter(ingredientGroup => ingredientGroup.title !== 'Pantry Essentials')

  return (
    <div className='sidebar'>
        <div className="sidebarHeader">
          <OptionsBar 
            sidebarView={sidebarView}
            setSidebarView={(view) => setSidebarView(view)}
          />
          <SidebarSearchBar/>
        </div>
        <div className="ingredientContainer">
          {sidebarView === 'ALL_INGREDIENTS' && allIngredientsCategorized.map((ingredientGroup, index) => 
            <IngredientModalAll key={index} ingredientGroup={ingredientGroup}/>
          )}
          {sidebarView === 'SELECTED_INGREDIENTS' && allIngredientsWithoutPantryEssentials.map((ingredientGroup, index) => 
            ingredientGroup.ingredients.some(ingredient => selectedIngredients.includes(ingredient)) && 
            <IngredientModalSelected key={index} ingredientGroup={ingredientGroup}/>) 
          }
        </div>
    </div>
  )
}

export default Sidebar