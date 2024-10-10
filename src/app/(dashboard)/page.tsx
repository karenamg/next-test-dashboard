import { BarChartMixed } from "@/components/dashboard/bar-chart-mixed";
import { LineChartLabel } from "@/components/dashboard/line-chart-label";
import { PieChartDonutText } from "@/components/dashboard/pie-chart-donut-with-text";
import { RadialChartStacked } from "@/components/dashboard/radial-chart-stacked";
import { RadialChartText } from "@/components/dashboard/radial-chart-text";
import { normalizeText } from "@/lib/utils";
import {
  DoctoresPorEspecialidad,
  DoctorResponse,
  Especialidad,
  CitasPorEspecialidad,
  CitaResponse,
  CitasAlMes,
} from "@/types";
import axios from "axios";

async function getData() {
  try {
    const doctoresResponse = await axios.get(
      `${process.env.SERVER_HOST}/doctores`
    );
    const especialidadesResponse = await axios.get(
      `${process.env.SERVER_HOST}/especialidades`
    );
    const citasResponse = await axios.get(`${process.env.SERVER_HOST}/citas`);

    const citasData = citasResponse.data as CitaResponse[];
    const doctoresData = doctoresResponse.data as DoctorResponse[];
    const especialidades = especialidadesResponse.data as Especialidad[];

    return { citasData, doctoresData, especialidades };
  } catch (error) {
    console.error(error);
    return { citasData: [], doctoresData: [], especialidades: [] };
  }
}

async function getDoctoresPorEspecialidad(): Promise<
  DoctoresPorEspecialidad[]
> {
  const { doctoresData, especialidades } = await getData();

  const doctoresPorEspecialidad: { [key: string]: DoctoresPorEspecialidad } =
    {};

  doctoresData.forEach((doc) => {
    const especialidad = especialidades.find(
      (esp) => esp.id === doc.especialidad
    );
    if (especialidad) {
      if (doctoresPorEspecialidad[especialidad.id]) {
        doctoresPorEspecialidad[especialidad.id].doctores += 1;
      } else {
        const color = `var(--color-${normalizeText(especialidad.nombre)})`;
        doctoresPorEspecialidad[especialidad.id] = {
          especialidad: especialidad.nombre,
          doctores: 1,
          fill: color,
        };
      }
    }
  });

  const doctoresPorEspecialidadArray = Object.values(doctoresPorEspecialidad);

  return doctoresPorEspecialidadArray;
}

async function getCitasPorEspecialidad(): Promise<CitasPorEspecialidad[]> {
  const { citasData, doctoresData, especialidades } = await getData();

  const citasPorEspecialidad: { [key: string]: CitasPorEspecialidad } = {};

  especialidades.forEach((especialidad) => {
    const color = `var(--color-${normalizeText(especialidad.nombre)})`;
    citasPorEspecialidad[especialidad.nombre] = {
      especialidad: normalizeText(especialidad.nombre),
      citas: 0,
      fill: color,
    };
  });

  citasData.forEach((cita) => {
    const doctor = doctoresData.find((doc) => doc.id === cita.doctor_id);
    if (doctor) {
      const especialidad = especialidades.find(
        (esp) => esp.id === doctor.especialidad
      );
      if (especialidad) {
        citasPorEspecialidad[especialidad.nombre].citas += 1;
      }
    }
  });

  const citasPorEspecialidadArray = Object.values(citasPorEspecialidad);

  return citasPorEspecialidadArray;
}

async function getCitas(): Promise<{
  aprobadas: number;
  canceladas: number;
  pendientes: number;
}> {
  const { citasData } = await getData();

  let citasAprobadas = 0;
  let citasCanceladas = 0;
  let citasPendientes = 0;

  citasData.forEach((cita) => {
    if (cita.estatus === "aprobada") {
      citasAprobadas++;
    } else if (cita.estatus === "cancelada") {
      citasCanceladas++;
    } else {
      citasPendientes++;
    }
  });

  return {
    aprobadas: citasAprobadas,
    canceladas: citasCanceladas,
    pendientes: citasPendientes,
  };
}

async function getPacientesAtendidos(): Promise<{
  pacientesAtendidos: number;
  meses: string;
}> {
  const { citasData } = await getData();

  const currentDate = new Date();
  let count = 0;
  let oldestDate = new Date(); // Inicializar con la fecha actual
  let currentMonth =
    currentDate.toLocaleString("default", { month: "long" }) +
    " " +
    currentDate.getFullYear();

  citasData.forEach((cita) => {
    if (cita.estatus === "aprobada") {
      const citaDate = new Date(cita.fecha);
      if (citaDate < currentDate) {
        count++;
        if (citaDate < oldestDate) {
          oldestDate = citaDate;
        }
      }
    }
  });

  let oldestMonth =
    oldestDate.toLocaleString("default", { month: "long" }) +
    " - " +
    currentMonth;

  if (!count) oldestMonth = "";
  return { pacientesAtendidos: count, meses: oldestMonth };
}

async function getCitasAlMes(): Promise<CitasAlMes[]> {
  const { citasData } = await getData();

  const currentDate = new Date();
  const lastSixMonths = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - index);
    return date;
  });

  const citasAlMes: CitasAlMes[] = [];

  lastSixMonths.reverse().forEach((month) => {
    const monthName = month.toLocaleString("default", { month: "long" });
    const aprobadas = citasData.filter(
      (cita) =>
        cita.estatus === "aprobada" &&
        new Date(cita.fecha).getMonth() === month.getMonth()
    ).length;
    const canceladas = citasData.filter(
      (cita) =>
        cita.estatus === "cancelada" &&
        new Date(cita.fecha).getMonth() === month.getMonth()
    ).length;

    citasAlMes.push({ mes: monthName, aprobadas, canceladas });
  });

  return citasAlMes;
}

export default async function Dashboard() {
  const doctoresPorEspecialidad = await getDoctoresPorEspecialidad();
  const citasPorEspecialidad = await getCitasPorEspecialidad();
  const { aprobadas, canceladas, pendientes } = await getCitas();
  const { pacientesAtendidos, meses } = await getPacientesAtendidos();
  const citasAlMes = await getCitasAlMes();
  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto w-full pb-10 gap-y-6 p-3">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 h-92 w-full">
        <RadialChartStacked
          title="Total de Citas"
          description=""
          aprobadas={aprobadas}
          canceladas={canceladas}
          pendientes={pendientes}
        />
        <PieChartDonutText
          title="Total de Doctores"
          description=""
          chartData={doctoresPorEspecialidad}
        />
        <RadialChartText
          title="Total de Pacientes atendidos"
          description={meses}
          total={pacientesAtendidos}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-10 h-92 w-full">
        <LineChartLabel title="Total de Citas por Mes" chartData={citasAlMes} />
        <BarChartMixed
          title="Total de Citas por Especialidad"
          description=""
          chartData={citasPorEspecialidad}
        />
      </div>
    </div>
  );
}
