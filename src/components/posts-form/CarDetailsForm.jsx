import React, { useEffect, useState } from "react";
import {
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Badge,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AutocompleteComponent from "../AutocompleteComponent";
import EnumSelect from "../EnumSelect";
import { StyledAccordion } from "../../styled-components/StyledComponents";

const CarDetailsForm = ({
  control,
  errors,
  watchBrandValue,
  data,
  register,
}) => {
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
  //give a defaultvalue to first registration
  const year = new Date().getFullYear();
  const years = Array.from(new Array(30), (val, index) =>
    (year - index).toString()
  );

  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Car Details</Typography>
        <Badge color="error" badgeContent={errorCount}></Badge>
      </AccordionSummary>
      <AccordionDetails>
        <Grid item container spacing={3} direction="row">
          <Grid item xs={6}>
            <AutocompleteComponent
              control={control}
              options={data.types}
              label="Type"
              name="postData.type"
              error={errors.type}
            />
          </Grid>
          <Grid item xs={6}>
            <AutocompleteComponent
              control={control}
              options={data.brands}
              name="postData.brand"
              label="Car Brand"
              error={errors.brand}
            />
          </Grid>
          {watchBrandValue && (
            <Grid item xs={12}>
              <AutocompleteComponent
                control={control}
                options={data.models}
                name="postData.model"
                label="Car Model"
                error={errors.model}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Color"
              {...register("postData.color")}
              error={!!errors.color}
              helperText={errors.color?.message}
            />
          </Grid>
          <Grid item xs={3}>
            <EnumSelect
              label="Transmission"
              registerField={register("postData.transmission")}
              values={["AUTOMATIC", "MANUAL", "ROBOTIC"]}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">km</InputAdornment>
                ),
              }}
              label="Kilometers"
              type="number"
              {...register("postData.kilometers")}
              error={!!errors.kilometers}
              helperText={errors.kilometers?.message}
            />
          </Grid>
          <Grid item xs={3}>
            <EnumSelect
              label="Fuel"
              registerField={register("postData.fuel")}
              values={["DIESEL", "GASOLINE", "GAS"]}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kW</InputAdornment>
                ),
              }}
              label="Power"
              type="number"
              {...register("postData.power")}
              error={!!errors.power}
              helperText={errors.power?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <EnumSelect
              label="First Registration"
              registerField={register("postData.firstRegistration")}
              values={years}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Engine Size"
              type="number"
              {...register("postData.engineSize")}
              error={!!errors.engineSize}
              helperText={errors.engineSize?.message}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default CarDetailsForm;
