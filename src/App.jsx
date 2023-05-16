import React from "react";
import { useSelector } from "react-redux";
import SnackbarProvider from "react-simple-snackbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import NotificationModal from "./components/NotificationModal/NotificationModal";
import RecipeSideModal from "./components/RecipeSideModal/RecipeSideModal";

function App() {
  const showNotificationModal = useSelector(
    (state) => state.modal.showNotificationModal
  );
  const showRecipeModal = useSelector((state) => state.modal.showRecipeModal);

  return (
    <SnackbarProvider>
      <div className="App">
        {showNotificationModal && <NotificationModal />}
        {showRecipeModal && <RecipeSideModal />}
        <Sidebar />
        <Main />
      </div>
    </SnackbarProvider>
  );
}

export default App;
