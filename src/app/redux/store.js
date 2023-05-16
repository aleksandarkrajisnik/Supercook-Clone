import { configureStore } from '@reduxjs/toolkit'
import ingredientReducer from './ingredientSlice'
import modalReducer from './modalSlice'
import recipeReducer from './recipeSlice'

export const store = configureStore({
  reducer: {
    ingredient: ingredientReducer,
    modal: modalReducer,
    recipe: recipeReducer
  },
})