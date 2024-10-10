import React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { File, ListFilter } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
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
    <div>
      <h1 className="text-2xl font-bold">Pacientes</h1>
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <DataTable data={pacientes} columns={columns} />
      </main>
    </div>
  );
}
