import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Badge from "@mui/material/Badge";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { StyledAccordion } from "../../styled-components/StyledComponents";

const BasicInformationForm = ({ control, register, errors, postTypeValue }) => {
  const [errorCount, setErrorCount] = useState(0);
  const [postTypeState, setPostTypeState] = useState(postTypeValue);

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
            <FormControl component="fieldset">
              <FormLabel component="legend">Post Type</FormLabel>
              <Controller
                rules={{ required: true }}
                name="postData.postType"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={postTypeState}
                    onChange={(e) => setPostTypeState(e.target.value)}
                  >
                    <FormControlLabel
                      {...field}
                      value="RENT"
                      control={<Radio />}
                      label="RENT"
                    />
                    <FormControlLabel
                      {...field}
                      value="SALE"
                      control={<Radio />}
                      label="SALE"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default BasicInformationForm;
