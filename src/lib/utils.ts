import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
