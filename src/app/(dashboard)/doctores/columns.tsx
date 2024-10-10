"use client";

import { DoctorActions } from "@/components/doctores/doctor-actions";
import { Badge } from "@/components/ui/badge";
import { Doctor, Especialidad, EstatusDoctor, Ubicacion } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Doctor>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "especialidad",
    header: "Especialidad",
    cell: ({ row }) => {
      const especialidad = row.getValue("especialidad") as Especialidad;
      return especialidad.nombre;
    },
  },
  {
    accessorKey: "ubicacion",
    header: "Ubicacion",
    cell: ({ row }) => {
      const ubicacion = row.getValue("ubicacion") as Ubicacion;
      return ubicacion.nombre;
    },
  },
  {
    accessorKey: "estatus",
    header: "Estatus",
    cell: ({ row }) => {
      const estatus = row.getValue("estatus") as EstatusDoctor;
      return (
        <Badge
          className="cursor-pointer capitalize mr-4"
          variant={
            estatus === "pendiente"
              ? "pendiente"
              : estatus === "denegado"
              ? "denegado"
              : "verificado"
          }
        >
          {estatus}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const doctor = row.original;

      return <DoctorActions doctor={doctor} doctorId={doctor.id} />;
    },
  },
];
