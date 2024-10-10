export type EstatusDoctor = "pendiente" | "verificado" | "denegado";
export type EstatusCita = "pendiente" | "aprobada" | "cancelada";
export type Sexo = "Masculino" | "Femenino";

export type DoctorResponse = {
  id: string;
  nombre: string;
  especialidad: number;
  ubicacion: number;
  estatus: EstatusDoctor;
};

export type Doctor = {
  id: number;
  nombre: string;
  especialidad: Especialidad | undefined;
  ubicacion: Ubicacion | undefined;
  estatus: EstatusDoctor;
};

export type Paciente = {
  id: number;
  nombre: string;
  fechaNac: string;
  sexo: Sexo;
};

export type PacienteResponse = {
  id: string;
  nombre: string;
  fecha_nacimiento: string;
  sexo: Sexo;
};

export type Cita = {
  id: number;
  fecha: string;
  hora: string;
  doctor_id: Doctor | undefined;
  paciente_id: Paciente | undefined;
  estatus: EstatusCita;
};

export type CitaResponse = {
  id: number;
  fecha: string;
  hora: string;
  doctor_id: string;
  paciente_id: string;
  estatus: EstatusCita;
};

export type Ubicacion = {
  id: number;
  nombre: string;
};

export type Especialidad = {
  id: number;
  nombre: string;
};

export type DoctoresPorEspecialidad = {
  especialidad: string;
  doctores: number;
  fill: string;
};

export type CitasPorEspecialidad = {
  especialidad: string;
  citas: number;
  fill: string;
};

export type CitasAlMes = {
  mes: string;
  aprobadas: number;
  canceladas: number;
};
