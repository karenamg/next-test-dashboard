"use server";

import { Doctor } from "@/types";
import axios from "axios";

export async function verificarDoctor(id: number, doctor: Doctor) {
  axios.put(`${process.env.SERVER_HOST}/doctores/${id}`, {
    ...doctor,
    estatus: "verificado",
    especialidad: doctor.especialidad?.id,
    ubicacion: doctor.ubicacion?.id,
  });
}

export async function denegarDoctor(id: number, doctor: Doctor) {
  axios.put(`${process.env.SERVER_HOST}/doctores/${id}`, {
    ...doctor,
    estatus: "denegado",
    especialidad: doctor.especialidad?.id,
    ubicacion: doctor.ubicacion?.id,
  });
}
