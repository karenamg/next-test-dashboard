"use client";

import { Doctor } from "@/types";
import { Badge } from "../ui/badge";
import { DoctorActions } from "./doctor-actions";

type Props = {
  doctor: Doctor;
};

const DoctorListItem: React.FC<Props> = ({ doctor }) => {
  const { id, nombre, especialidad, estatus, ubicacion } = doctor;
  return (
    <div className="mt-4 flex items-center p-4 border rounded-sm mb-4 gap-x-4">
      <h3 className="font-bold line-clamp-1 max-w-[200px]">{nombre}</h3>
      <p className="hidden md:block text-muted-foreground">
        {especialidad != null ? especialidad.nombre : "Indefinida"}
      </p>
      <p className="hidden md:block text-muted-foreground">
        {ubicacion != null ? ubicacion.nombre : "Sin Ubicación"}
      </p>
      <div className="ml-auto flex items-center">
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
        <DoctorActions doctorId={id} doctor={doctor} />
      </div>
    </div>
  );
};

export default DoctorListItem;
