import Link from "next/link";
import { useRouter as useNavigation } from "next/navigation";
import React from "react";

import { Track } from "@/types/tracks";
import { formatKilometer } from "@/util/formatKilometer";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

function TrackTable({ tracks }: { tracks: Track[] }) {
  const navigate = useNavigation();

  return (
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "whitesmoke" }}>
          <TableCell>Km Inicial</TableCell>
          <TableCell>Km Final</TableCell>
          <TableCell>Início Deslocamento</TableCell>
          <TableCell>Checklist</TableCell>
          <TableCell>Motivo</TableCell>
          <TableCell>Observação</TableCell>
          <TableCell>ID Condutor</TableCell>
          <TableCell>ID Veículo</TableCell>
          <TableCell>ID Cliente</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tracks.map(track => (
          <TableRow
            sx={{
              cursor: "pointer",
              "&:nth-of-type(odd)": {
                backgroundColor: "beige"
              },
              "&:nth-of-type(even)": {
                backgroundColor: "white"
              }
            }}
            onClick={() => navigate.push(`/tracks/${track.id}`)}
            key={track.id}
          >
            <TableCell>{formatKilometer(track.kmInicial || 0)}</TableCell>
            <TableCell>{formatKilometer(track.kmFinal || 0)}</TableCell>
            <TableCell>
              {new Date(track.inicioDeslocamento || "").toLocaleString() || ""}
            </TableCell>
            <TableCell>{track.checkList || ""}</TableCell>
            <TableCell>{track.motivo || ""}</TableCell>
            <TableCell>{track.observacao || ""}</TableCell>
            <TableCell>{track.idCondutor || ""}</TableCell>
            <TableCell>{track.idVeiculo || ""}</TableCell>
            <TableCell>{track.idCliente || ""}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TrackTable;
