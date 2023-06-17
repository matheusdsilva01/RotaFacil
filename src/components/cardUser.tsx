import React from "react";

import { Card, CardContent, Typography } from "@mui/material";

interface cardUserProps {
  nome: string;
  additionalInfo: string;
  onClick: () => void;
}

const cardUser = ({ nome, additionalInfo, onClick }: cardUserProps) => {
  return (
    <Card
      sx={{
        width: 275,
        bgcolor: "secondary",
        cursor: "pointer",
        ":hover": {
          boxShadow: 3
        }
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: {
              md: 22
            }
          }}
          fontWeight="bold"
          noWrap
        >
          Nome: {nome}
        </Typography>
        <Typography sx={{ fontSize: { fontSize: 14, md: 16 } }}>
          {additionalInfo}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default cardUser;
