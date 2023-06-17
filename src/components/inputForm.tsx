import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { Grid, TextField, ButtonBase } from "@mui/material";

interface InputFormProps {
  label: string;
  name: string;
  value: string;
}

const InputForm = ({ label, name, value }: InputFormProps) => {
  const [disabled, setDisabled] = useState(true);

  return (
    <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
      <TextField
        variant="filled"
        label={label}
        name={name}
        defaultValue={value}
        disabled={disabled}
        InputLabelProps={{ shrink: true }}
      />
      <ButtonBase
        sx={{ m: "auto 0", ml: 2 }}
        onClick={() => setDisabled(oldValue => !oldValue)}
      >
        <EditIcon color="action" />
      </ButtonBase>
    </Grid>
  );
};

export default InputForm;
