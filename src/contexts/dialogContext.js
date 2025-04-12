import { createContext, useState, useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import AlertDialog from "../components/Dialogs/Alert";

const DialogContext = createContext();
export default function AlertDialogProvider({ children }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <DialogContext.Provider
      value={{ openDialog: handleClickOpen, closeDialog: handleClose }}
    >
      {children}
      <AlertDialog open={open} />
    </DialogContext.Provider>
  );
}
export const useDialogAlert = () => useContext(DialogContext);
