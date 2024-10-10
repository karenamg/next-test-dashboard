import React from "react";
import axios from "axios";
import { Paciente, PacienteResponse } from "@/types";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function getPacientes(): Promise<Paciente[]> {
  try {
    const pacientesResponse = await axios.get(
      `${process.env.SERVER_HOST}/pacientes`
    );

    const pacientesData = pacientesResponse.data as PacienteResponse[];

    const pacientes: Paciente[] = pacientesData.map((doc) => {
      return {
        ...doc,
        id: Number(doc.id),
        nombre: doc.nombre,
        fechaNac: doc.fecha_nacimiento,
        sexo: doc.sexo,
      } as Paciente;
    });

    return pacientes;
  } catch (error) {
    console.error(error);
  }

  return [];
}

export default async function PacientesPages() {
  const pacientes = await getPacientes();

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold">Pacientes</h1>
      <DataTable data={pacientes} columns={columns} />
    </div>
  );
}
