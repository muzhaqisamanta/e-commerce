import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "./DeleteDialog";

const ImageCard = ({ url, onDelete, onView }) => {
  const [openDelete, setOpenDelete] = useState(false);
  if (!url) return <></>;

  return (
    <Card sx={{ width: 120 }}>
      <CardMedia sx={{ height: 120 }} image={url} onClick={onView} />
      <div style={{ textAlign: "center" }}>
        <IconButton onClick={() => setOpenDelete(true)}>
          <DeleteIcon color="primary" />
        </IconButton>
      </div>
      <DeleteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        handleDelete={onDelete}
      />
    </Card>
  );
};

export default ImageCard;
