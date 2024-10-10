"use client";

import { Badge } from "@/components/ui/badge";
import { Cita, Doctor, EstatusCita, Paciente } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { isWithinInterval } from "date-fns";
import { DateRange } from "react-day-picker";

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
    filterFn: (row, columnId, filterValue) => {
      const dateRange = filterValue as DateRange;
      const fechaCita = new Date(row.getValue(columnId));

      if (dateRange == null || dateRange.from == null || dateRange.to == null) {
        return false;
      }

      return isWithinInterval(fechaCita, {
        start: dateRange.from,
        end: dateRange.to,
      });
    },
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
