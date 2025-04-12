import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDialogAlert } from "../../contexts/dialogContext";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart } from "../../featuers/api/cartSlice";
import { useEffect } from "react";
export default function AlertDialog({ open }) {
  const { openDialog, closeDialog } = useDialogAlert();
  const SelectedItemId = useSelector((state) => {
    return state.cart.currItemId;
  });
  const dispatch = useDispatch();
  function handleDeleteDialog() {
    console.log(SelectedItemId);
    dispatch(deleteFromCart(SelectedItemId));
    closeDialog();
  }

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title " sx={{ color: "red" }}>
          {"Delete Item From Cart"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            this is gonna delete the item from your cart are you sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Disagree</Button>
          <Button onClick={() => handleDeleteDialog()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
