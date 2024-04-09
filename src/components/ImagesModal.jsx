import React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";

const ImagesModal = (props) => {
  const {
    openModal,
    setSelectedImageIndex,
    setOpenModal,
    selectedImageIndex,
    data,
  } = props;

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <Modal
      open={openModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      onClose={handleCloseModal}
    >
      <Fade in={openModal}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <IconButton aria-label="Previous" onClick={handlePrevImage}>
            <ArrowBack />
          </IconButton>
          <img
            src={`data:image/jpg;base64,${data[selectedImageIndex]}`}
            style={{ width: "90%", height: "90%" }}
          />
          <IconButton aria-label="Next" onClick={handleNextImage}>
            <ArrowForward />
          </IconButton>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ImagesModal;
