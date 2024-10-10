"use client";

import { verificarDoctor, denegarDoctor } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";

import { MoreHorizontal, Check, X } from "lucide-react";
import { Doctor } from "@/types";

type Props = {
  doctorId: number;
  doctor: Doctor;
};
export const DoctorActions = ({ doctorId, doctor }: Props) => {
  const router = useRouter();

  const handleVerificarDoctor = async () => {
    await verificarDoctor(doctorId, doctor);
    router.refresh();
  };

  const handleDenegarDoctor = async () => {
    await denegarDoctor(doctorId, doctor);
    router.refresh();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={false}
            onClick={handleVerificarDoctor}
          >
            <Check className="size-4 mr-2"></Check>
            Verificar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={false}
            onClick={handleDenegarDoctor}
          >
            <X className="size-4 mr-2"></X>
            Denegar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
