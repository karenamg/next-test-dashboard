import { DoctorResponse, PacienteResponse, CitaResponse, Cita } from "@/types";
import axios from "axios";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function getCitas(): Promise<Cita[]> {
  try {
    const doctoresResponse = await axios.get(
      `${process.env.SERVER_HOST}/doctores`
    );
    const pacientesesResponse = await axios.get(
      `${process.env.SERVER_HOST}/pacientes`
    );

    const citasResponse = await axios.get(`${process.env.SERVER_HOST}/citas`);

    const doctores = doctoresResponse.data as DoctorResponse[];
    const pacientes = pacientesesResponse.data as PacienteResponse[];
    const citasData = citasResponse.data as CitaResponse[];

    const citas: Cita[] = citasData.map((doc) => {
      return {
        ...doc,
        id: Number(doc.id),
        doctor_id: doctores.find((doctor) => doctor.id === doc.doctor_id),
        paciente_id: pacientes.find(
          (paciente) => paciente.id === doc.paciente_id
        ),
        fecha: doc.fecha,
        hora: doc.hora,
        estatus: doc.estatus,
      } as Cita;
    });

    return citas;
  } catch (error) {
    console.error(error);
  }

  return [];
}

export default async function CitasPage() {
  const citas = await getCitas();

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold">Citas</h1>
      <DataTable data={citas} columns={columns} />
    </div>
  );
}
