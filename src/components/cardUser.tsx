import React from "react";

import { Card, CardContent, Typography } from "@mui/material";

interface cardUserProps {
  name: string;
  city: string;
  onClick: () => void;
}

const cardUser = ({ name, city, onClick }: cardUserProps) => {
  return (
    <Card sx={{ width: 275, bgcolor: "secondary" }} onClick={onClick}>
      <CardContent>
        <Typography
          sx={{
            fontSize: {
              md: 22
            }
          }}
          fontWeight="bold"
        >
          {name}
        </Typography>
        <Typography sx={{ fontSize: { fontSize: 14, md: 16 } }}>
          {city}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default cardUser;
