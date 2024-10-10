import React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { File, ListFilter } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Paciente, PacienteResponse } from "@/types";
import PacienteListItem from "@/components/pacientes/paciente-list-item";

async function getPacientes(): Promise<Paciente[]> {
  try {
    const pacientesResponse = await axios.get(
      `${process.env.SERVER_HOST}/pacientes`
    );

    const pacientesData = pacientesResponse.data as PacienteResponse[];

    const pacientes: Paciente[] = pacientesData.map((doc) => {
      return {
        ...doc,
        id: Number(doc.id),
        nombre: doc.nombre,
        fechaNac: doc.fecha_nacimiento,
        sexo: doc.sexo,
      } as Paciente;
    });

    return pacientes;
  } catch (error) {
    console.error(error);
  }

  return [];
}

export default async function PacientesPages() {
  const pacientes = await getPacientes();

  return (
    <div>
      <h1 className="text-2xl font-bold">Pacientes</h1>
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Edad</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Sexo
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pacientes.map((paciente) => (
                      <PacienteListItem key={paciente.id} paciente={paciente} />
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  <strong>1-{pacientes.length}</strong> de{" "}
                  <strong>{pacientes.length}</strong> pacientes
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
