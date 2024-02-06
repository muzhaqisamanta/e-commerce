import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Uploader = ({ addImage }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data = reader.result.split(",")[1];
      console.log(base64Data);
      addImage(base64Data);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Button component="label" startIcon={<CloudUploadIcon />}>
      Upload images
      <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
    </Button>
  );
};

export default Uploader;
