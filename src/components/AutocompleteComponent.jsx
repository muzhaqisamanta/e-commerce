import React from "react";
import { Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AutocompleteComponent = ({ options, label, error, control, name }) => {
  return (
    <Controller
      render={({ field }) => {
        return (
          <Autocomplete
            options={options || []}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
            value={field.value === "" ? null : field.value}
            onChange={(e, data) => field.onChange(data)}
          />
        );
      }}
      name={name}
      control={control}
    />
  );
};

export default AutocompleteComponent;
