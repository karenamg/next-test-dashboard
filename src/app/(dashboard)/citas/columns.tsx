"use client";

import { Badge } from "@/components/ui/badge";
import { Cita, Doctor, EstatusCita, Paciente } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Cita>[] = [
  {
    accessorKey: "doctor_id",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = row.getValue("doctor_id") as Doctor;
      return doctor.nombre;
    },
  },
  {
    accessorKey: "paciente_id",
    header: "Paciente",
    cell: ({ row }) => {
      const paciente = row.getValue("paciente_id") as Paciente;
      return paciente.nombre;
    },
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
  },
  {
    accessorKey: "hora",
    header: "Hora",
  },
  {
    accessorKey: "estatus",
    header: "Estatus",
    cell: ({ row }) => {
      const estatus = row.getValue("estatus") as EstatusCita;
      return (
        <Badge
          className="cursor-pointer capitalize mr-4"
          variant={
            estatus === "pendiente"
              ? "pendiente"
              : estatus === "cancelada"
              ? "cancelada"
              : "aprobada"
          }
        >
          {estatus}
        </Badge>
      );
    },
  },
];
