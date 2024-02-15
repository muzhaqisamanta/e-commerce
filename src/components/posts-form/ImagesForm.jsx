import React from "react";
import {
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Uploader from "../Uploader";
import ImageHoverCard from "../ImageHoverCard";
import { StyledAccordion } from "../../styled-components/StyledComponents";

const ImagesForm = ({ addImage, imagesList, removeImg, getValues }) => {
  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Images</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Uploader addImage={addImage} />
          </Grid>
          {imagesList.length > 0 &&
            getValues("postData.imageUrls").map((el, index) => {
              return (
                <Grid item key={index}>
                  <ImageHoverCard
                    url={`data:image/jpeg;base64,${el}`}
                    onDelete={() => removeImg(index)}
                    onView={() => {
                      setIsOpenModalImage((prev) => !prev);
                      setUrlImageSelected(el);
                    }}
                  />
                </Grid>
              );
            })}
        </Grid>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default ImagesForm;
