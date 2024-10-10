import { Doctor, Especialidad, DoctorResponse, Ubicacion } from "@/types";
import axios from "axios";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function getDoctores(): Promise<Doctor[]> {
  try {
    const doctoresResponse = await axios.get(
      `${process.env.SERVER_HOST}/doctores`
    );
    const especialidadesResponse = await axios.get(
      `${process.env.SERVER_HOST}/especialidades`
    );

    const ubicacionResponse = await axios.get(
      `${process.env.SERVER_HOST}/estados`
    );

    const doctoresData = doctoresResponse.data as DoctorResponse[];
    const especialidades = especialidadesResponse.data as Especialidad[];

    const ubicaciones = ubicacionResponse.data as Ubicacion[];

    const doctores: Doctor[] = doctoresData.map((doc) => {
      return {
        ...doc,
        id: Number(doc.id),
        especialidad: especialidades.find((esp) => esp.id === doc.especialidad),
        ubicacion: ubicaciones.find((ubi) => ubi.id === doc.ubicacion),
      } as Doctor;
    });

    return doctores;
  } catch (error) {
    console.error(error);
  }

  return [];
}

export default async function DoctoresPage() {
  const doctores = await getDoctores();

  return (
    <div>
      <h1 className="text-2xl font-bold">Doctores</h1>
      <DataTable data={doctores} columns={columns} />
    </div>
  );
}
