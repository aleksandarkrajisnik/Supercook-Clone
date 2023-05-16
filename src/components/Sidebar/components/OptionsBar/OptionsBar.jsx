import React, {useState} from 'react'
import './OptionsBar.scss'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { RxHamburgerMenu } from 'react-icons/rx'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'
import OutsideAlerter from '../../../../app/hoc/OutsideAlerter'
import ExtraOptionsDropdown from './ExtraOptionsDropdown'

const OptionsBar = ({ sidebarView, setSidebarView }) => {

    const selectedIngredients = useSelector(state => state.ingredient.selectedIngredients);
    const dispatch = useDispatch()

    const [showExtraOptions, setShowExtraOptions] = useState(false)

    const showAllIngredients = sidebarView === 'ALL_INGREDIENTS'

    // const extraOptionsDropdown = () => 
    //     <OutsideAlerter handleOutsideClick = {() => setShowExtraOptions(false)}>
    //         <div className='extraOptionsDropdown'>
    //             <div 
    //                 className="extraDropdownItem"
    //                 onClick={() => {
    //                     dispatch(removeAllIngredients())
    //                     setShowExtraOptions(false)
    //                 }}
    //             >
    //                 <FaTrashAlt/> <span>remove all ingredients</span>
    //             </div>
    //             <div 
    //                 className="extraDropdownItem"
    //                 onClick={() => {
    //                     copyToClipboard(selectedIngredients)
    //                     setShowExtraOptions(false)
    //                 }}
    //             >
    //                 <FaCopy/> <span>copy your ingredients to clipboard</span>
    //             </div>
    //         </div>
    //     </OutsideAlerter>
        

  return (
    <div className="optionsBar">
        {
            showAllIngredients ? 
            <RxHamburgerMenu onClick={() => setSidebarView('SELECTED_INGREDIENTS')}/> : 
            <AiOutlineAppstoreAdd onClick={() => setSidebarView('ALL_INGREDIENTS')}/>
        }

        <div className="pantryInfo">
            <h3>{showAllIngredients ? 'Pantry' : 'My Pantry'}</h3>
            <span>You have {selectedIngredients.length} Ingredients</span>
        </div>

        <OutsideAlerter handleOutsideClick = {() => setShowExtraOptions(false)}>
            <div 
            className="extraOptions"  
            onClick={() => {
                setShowExtraOptions(!showExtraOptions)
            }}
        >
            <BiDotsVerticalRounded className='dotsIcon'/>
            {showExtraOptions && <ExtraOptionsDropdown hideDropdown = {() => setShowExtraOptions(false)}/>}
            </div>
        </OutsideAlerter>
    </div>
  )
}

export default OptionsBar