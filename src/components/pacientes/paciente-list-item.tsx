"use client";

import { Paciente } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";

type Props = {
  paciente: Paciente;
};

const PacienteListItem: React.FC<Props> = ({ paciente }) => {
  const { nombre, fechaNac, sexo } = paciente;

  function calcularEdad(fecha: string) {
    const fechaActual = new Date();
    const nacimiento = new Date(fecha);

    let edad = 0;
    edad = fechaActual.getFullYear() - nacimiento.getFullYear();

    if (
      new Date(fechaActual.setFullYear(nacimiento.getFullYear())) < fechaActual
    ) {
      edad--;
    }

    return edad;
  }

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Profile image"
          className="aspect-square rounded-full object-cover"
          height="30"
          src="/profile.png"
          width="30"
        />
      </TableCell>
      <TableCell className="font-medium">{nombre}</TableCell>
      <TableCell>{calcularEdad(fechaNac)}</TableCell>
      <TableCell className="hidden md:table-cell">{sexo}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default PacienteListItem;
