import React, { MouseEvent, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardContent,
  Popover,
  Typography
} from "@mui/material";
interface cardUserProps {
  nome: string;
  additionalInfo: string;
  onClick: () => void;
  deleteUser: (event: MouseEvent<HTMLButtonElement>) => void;
}

const cardUser = ({
  nome,
  additionalInfo,
  onClick,
  deleteUser
}: cardUserProps) => {
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
      sx={{
        position: "relative",
        width: 275,
        minHeight: 100,
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
        <Typography sx={{ fontSize: { fontSize: 14, md: 16 } }} noWrap>
          {additionalInfo}
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
          onClick={deleteUser}
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

export default cardUser;
