import React, { useState } from 'react'
import './IngredientModalAll.scss'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import IngredientTag from '../../../IngredientTag/IngredientTag'

const IngredientModalAll = ({ ingredientGroup }) => {

  const { title: modalTitle, icon: modalIcon, ingredients: modalIngredients } = ingredientGroup;
  const [isModalExpanded, setIsModalExpanded] = useState(false);

  //Total ingredients selected
  const totalSelectedIngredients = useSelector(state => state.ingredient.selectedIngredients);

  //Ingredients selected from this group alone (e.g. Pantry Essentials, Mushrooms...)
  const modalIngredientsSelected = totalSelectedIngredients.filter(ingredient => modalIngredients.includes(ingredient));

  //First 10 ingredients to show (Modal is not expanded)
  const firstTenIngredients = modalIngredients.slice(0, 10);

  //Number of ingredients left (Modal ingredients - First 10)
  const numOfHiddenIngredients = modalIngredients.length - 10;

  const handleHeaderClick = () => setIsModalExpanded(!isModalExpanded);

  return (
    <div className='ingredientModalAll'>
      <div 
        className="modalHeader"
        onClick={handleHeaderClick}  
      >
        <img src={modalIcon} alt={modalTitle}/>
        <div className="modalHeaderText">
          <div className="titleBar">
            <h4>{modalTitle}</h4>
            {isModalExpanded ? <BiChevronUp/> :<BiChevronDown/>}
          </div>
          <div className="ingredientCount">
            {modalIngredientsSelected.length}/{modalIngredients.length} Ingredients
          </div>
        </div>
      </div>
      <div className="modalIngredientsContainer">
        {isModalExpanded ? 
            modalIngredients.map((ingredient, index) => <IngredientTag key={index} content={ingredient} />)
          : 
            <>
              {firstTenIngredients.map((ingredient,index) => <IngredientTag key={index} content={ingredient}/>)}
              <IngredientTag expandModal={() => setIsModalExpanded(true)} content={`+${numOfHiddenIngredients} More`} />
            </> 
        }
      </div>
    </div>
  )
}

export default IngredientModalAll