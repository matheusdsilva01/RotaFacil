import { Controller, useFormContext } from "react-hook-form";

import { Grid, TextField, TextFieldProps } from "@mui/material";

type InputFormProps = {
  label: string;
  name: string;
  value: string;
} & TextFieldProps;

const InputForm = ({ label, name, value, ...otherProps }: InputFormProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  return (
    <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
      <Controller
        control={control}
        name={name}
        defaultValue={value}
        render={({ field }) => (
          <TextField
            {...otherProps}
            {...field}
            label={label}
            variant="filled"
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
    </Grid>
  );
};

export default InputForm;
