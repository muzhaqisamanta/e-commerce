import React from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const EnumSelect = ({ label, registerField, values }) => {
  return (
    <TextField
      fullWidth
      select
      label={label}
      {...registerField}
      defaultValue={values[0]}
    >
      {values.map((value) => (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default EnumSelect;
