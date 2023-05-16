import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
};

export const recipeSlice = createSlice({
  name: "recipeReducer",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
  },
});

export const { setRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
