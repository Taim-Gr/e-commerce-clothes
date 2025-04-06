// MenuContext.js
import { createContext, useContext, useReducer, useCallback } from "react";
function menuReducer(state, action) {
  switch (action.type) {
    case "OPEN_MENU":
      return true;
    case "CLOSE_MENU":
      return false;
    default:
      return state;
  }
}

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [isOpen, dispatch] = useReducer(menuReducer, false);

  const value = { isOpen, dispatch };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  return useContext(MenuContext);
}
