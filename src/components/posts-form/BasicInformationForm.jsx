import React, { useEffect, useState } from "react";
import {
  AccordionDetails,
  AccordionSummary,
  Badge,
  FormHelperText,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import { FormLabel, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { StyledAccordion } from "../../styled-components/StyledComponents";

const BasicInformationForm = ({ register, errors, postTypeValue }) => {
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    setErrorCount(0);
    const arrayErrors = Object.values(errors);
    arrayErrors.forEach((error) => {
      if (error) {
        setErrorCount((count) => count + 1);
      }
    });
  }, [errors]);

  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography sx={{ mr: 2 }}>Basic Information</Typography>
        <Badge color="error" badgeContent={errorCount}></Badge>
      </AccordionSummary>
      <AccordionDetails>
        <Grid item container spacing={3} direction="row">
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Title"
              {...register("postData.title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Description"
              {...register("postData.description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Post Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              defaultValue={postTypeValue}
            >
              <FormControlLabel
                value="RENT"
                control={<Radio {...register("postData.postType")} />}
                label="Rent"
              />
              <FormControlLabel
                value="SALE"
                control={<Radio {...register("postData.postType")} />}
                label="Sale"
              />
            </RadioGroup>
            <FormHelperText error={!!errors?.postType}>
              {errors.postType?.message}
            </FormHelperText>
          </Grid>
        </Grid>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default BasicInformationForm;
