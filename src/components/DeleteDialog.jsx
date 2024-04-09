import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";

export default function DeleteDialog({ open, setOpen, handleDelete }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action cannot be undone. Are you sure you want to delete?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleDelete();
                  handleClose();
                }}
                color="error"
                variant="contained"
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
