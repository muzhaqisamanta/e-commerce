import React, { useEffect, useState } from "react";
import {
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  InputAdornment,
  Badge,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EnumSelect from "../EnumSelect";
import TextField from "@mui/material/TextField";
import { StyledAccordion } from "../../styled-components/StyledComponents";

const PricingForm = ({ register, errors, watchCurrencyValue }) => {
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
        <Typography>Pricing</Typography>{" "}
        <Badge color="error" badgeContent={errorCount}></Badge>
      </AccordionSummary>
      <AccordionDetails>
        <Grid item container spacing={3}>
          <Grid item xs={6}>
            <EnumSelect
              label="Currency"
              registerField={register("postData.currency")}
              values={["ALL", "EUR", "USD", "GBP"]}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              {...register("postData.price")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {watchCurrencyValue}
                  </InputAdornment>
                ),
              }}
              label="Price"
              type="number"
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default PricingForm;
