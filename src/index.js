import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MenuProvider } from "./contexts/menuConttext";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./contexts/snackbarContext";
import AlertDialogProvider from "./contexts/dialogContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertDialogProvider>
        <SnackbarProvider>
          <BrowserRouter>
            <MenuProvider>
              <App />
            </MenuProvider>
          </BrowserRouter>
        </SnackbarProvider>
      </AlertDialogProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
