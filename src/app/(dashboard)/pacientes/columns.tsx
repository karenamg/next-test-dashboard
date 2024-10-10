"use client";

import { Paciente } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Paciente>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "fechaNac",
    header: "Edad",
    cell: ({ row }) => {
      const fecha = row.getValue("fechaNac") as string;

      const fechaActual = new Date();
      const nacimiento = new Date(fecha);

      let edad = 0;
      edad = fechaActual.getFullYear() - nacimiento.getFullYear();

      if (
        new Date(fechaActual.setFullYear(nacimiento.getFullYear())) <
        fechaActual
      ) {
        edad--;
      }

      return edad;
    },
  },
  {
    accessorKey: "sexo",
    header: "Sexo",
  },
];
