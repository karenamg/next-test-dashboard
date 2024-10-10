import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeText(specialty: string): string {
  // Reemplazar caracteres con tilde por caracteres sin tilde
  const unaccented = specialty.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Convertir a minúsculas
  const lowercase = unaccented.toLowerCase();

  return lowercase;
}

export async function exportDataToExcel(
  title: string,
  worksheetname: string,
  data: any[]
) {
  try {
    let dataToExport = [];

    if (worksheetname === "pacientes") {
      dataToExport = data.map((pro: any) => ({
        nombre: pro.nombre,
        sexo: pro.sexo,
        fecha_nacimiento: pro.fechaNac,
      }));
    } else if (worksheetname === "citas") {
      dataToExport = data.map((pro: any) => ({
        doctor: pro.doctor_id.nombre,
        paciente: pro.paciente_id.nombre,
        fecha: pro.fecha,
        hora: pro.hora,
        estatus: pro.estatus,
      }));
    } else if (worksheetname === "doctores") {
      dataToExport = data.map((pro: any) => ({
        nombre: pro.nombre,
        especialidad: pro.especialidad.nombre,
        ubicacion: pro.ubicacion.nombre,
      }));
    } else {
      return;
    }
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
    XLSX.writeFile(workbook, `${title}.xlsx`);
  } catch (error: any) {
    console.log("No se pudo exportar el archivo...", error.message);
  }
}
