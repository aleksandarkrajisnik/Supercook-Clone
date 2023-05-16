import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showNotificationModal: false,
  modalContent: {
    title: "",
    message: "",
    actionButtonText: "",
    onActionButtonClick: () => {},
    closeButtonText: "",
  },
  showRecipeModal: false,
  recipeInfo: {
    recipe: {},
  },
};

export const modalSlice = createSlice({
  name: "modalReducer",
  initialState,
  reducers: {
    showNotificationModal: (state, action) => {
      state.modalContent = action.payload;
      state.showNotificationModal = true;
    },
    hideNotificationModal: (state) => {
      state.showNotificationModal = false;
    },
    showRecipeModal: (state, action) => {
      state.recipeInfo = action.payload;
      state.showRecipeModal = true;
    },
    hideRecipeModal: (state) => {
      state.showRecipeModal = false;
    },
  },
});

export const {
  showNotificationModal,
  hideNotificationModal,
  showRecipeModal,
  hideRecipeModal,
} = modalSlice.actions;

export default modalSlice.reducer;
