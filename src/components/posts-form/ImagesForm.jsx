import React, { useState } from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Uploader from "./Uploader";
import ImageCard from "../ImageCard";
import { StyledAccordion } from "../../styled-components/StyledComponents";
import ImagesModal from "../ImagesModal";

const ImagesForm = ({ addImage, imagesList, removeImg, getValues }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleOpenModal = (index) => {
    setOpenModal(true);
    setSelectedImageIndex(index);
  };

  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography sx={{ mr: 2 }}>Images</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Uploader addImage={addImage} />
          </Grid>
          {imagesList.length > 0 &&
            getValues("postData.imageUrls").map((el, index) => {
              return (
                <Grid style={{ cursor: "pointer" }} item key={index}>
                  <ImageCard
                    url={`data:image/jpeg;base64,${el}`}
                    onDelete={() => removeImg(index)}
                    onView={() => {
                      console.log("test");
                      handleOpenModal(index);
                      setSelectedImageIndex(index);
                    }}
                  />
                </Grid>
              );
            })}
        </Grid>
        <ImagesModal
          openModal={openModal}
          setSelectedImageIndex={setSelectedImageIndex}
          setOpenModal={setOpenModal}
          selectedImageIndex={selectedImageIndex}
          data={getValues("postData.imageUrls")}
        />
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default ImagesForm;
