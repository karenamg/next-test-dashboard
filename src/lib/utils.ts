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

export async function exportDataToCSV(
  filename: string,
  worksheetname: string,
  data: any[]
) {
  try {
    let dataToExport: any[] = [];

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

    // Convert data to CSV format
    const header = Object.keys(dataToExport[0]).join(",");
    const csvRows = dataToExport
      .map((row) => Object.values(row).join(","))
      .join("\n");
    const csvString = `${header}\n${csvRows}`;

    // Create a Blob from the CSV string
    const csvData = new Blob([csvString], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvData);

    // Create a link and trigger the download
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error: any) {
    console.log("No se pudo exportar el archivo...", error.message);
  }
}
