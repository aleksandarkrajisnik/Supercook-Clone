import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedIngredients: [],
}

export const ingredientSlice = createSlice({
  name: 'ingredientReducer',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.selectedIngredients = [...state.selectedIngredients, action.payload]
    },
    removeIngredient: (state, action) => {
      state.selectedIngredients = state.selectedIngredients.filter(item => item !== action.payload)
    },
    removeAllIngredients: (state, action) => {
      state.selectedIngredients = []
    },
  },
})

export const { addIngredient, removeIngredient, removeAllIngredients } = ingredientSlice.actions

export default ingredientSlice.reducer