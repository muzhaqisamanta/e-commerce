import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";

export default function Contact({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Address and Contact</DialogTitle>
        <DialogContent sx={{ width: "600px" }}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              Address:
            </Grid>
            <Grid item xs={12}>
              Contact us on +355...
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">OR send us a message</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Name" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Email" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Phone Number" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Subject" />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Message</InputLabel>
              <TextareaAutosize minRows={5} style={{ width: "100%" }} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
