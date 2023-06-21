import { useRouter as useNavigation } from "next/navigation";
import React, { useState, MouseEvent } from "react";

import { Car } from "@/types/cars";
import { formatKilometer } from "@/util/formatKilometer";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardContent,
  Popover,
  Typography
} from "@mui/material";

type CardCarProps = {
  deleteUser: (event: MouseEvent<HTMLButtonElement>, id: number) => void;
  car: Car;
};

const CardCar = ({ deleteUser, car }: CardCarProps) => {
  const { anoFabricacao, id, kmAtual, marcaModelo, placa } = car;
  const navigation = useNavigation();
  // popover
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Card
      key={id}
      onClick={() => navigation.push(`/cars/edit/${id}`)}
      sx={{
        width: 275,
        minHeight: 120,
        bgcolor: "secondary",
        position: "relative",
        ":hover": {
          boxShadow: 3
        }
      }}
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
          {marcaModelo}
        </Typography>
        <Typography sx={{ fontSize: { fontSize: 14, md: 16 } }}>
          Ano: {anoFabricacao}
        </Typography>
        <Typography sx={{ fontSize: { fontSize: 14, md: 16 } }}>
          Quilometragem: {formatKilometer(kmAtual)}
        </Typography>
      </CardContent>
      <Box>
        <Button
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          sx={{
            float: "right",
            position: "absolute",
            bottom: 0,
            right: 0
          }}
          onClick={event => deleteUser(event, id)}
        >
          <DeleteIcon fontSize="small" />
        </Button>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none"
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography
            sx={{ p: 1, backgroundColor: "darkred", color: "white" }}
            lineHeight={1}
          >
            Deletar
          </Typography>
        </Popover>
      </Box>
    </Card>
  );
};

export default CardCar;
