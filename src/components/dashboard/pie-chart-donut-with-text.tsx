"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DoctoresPorEspecialidad } from "@/types";

type Props = {
  title: string;
  description: string;
  chartData: DoctoresPorEspecialidad[];
};

const chartConfig = {
  doctores: {
    label: "Doctores",
  },
  cardiologia: {
    label: "Cardiología",
    color: "hsl(var(--chart-1))",
  },
  pediatria: {
    label: "Pediatría",
    color: "hsl(var(--chart-2))",
  },
  dermatologia: {
    label: "Dermatología",
    color: "hsl(var(--chart-3))",
  },
  ginecologia: {
    label: "Ginecología",
    color: "hsl(var(--chart-4))",
  },
  oncologia: {
    label: "Oncología",
    color: "hsl(var(--chart-5))",
  },
  neurologia: {
    label: "Neurología",
    color: "hsl(var(--chart-6))",
  },
  traumatologia: {
    label: "Traumatología",
    color: "hsl(var(--chart-7))",
  },
  psiquiatria: {
    label: "Psiquiatría",
    color: "hsl(var(--chart-8))",
  },
} satisfies ChartConfig;

export function PieChartDonutText({ title, description, chartData }: Props) {
  const totalDoctores = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.doctores, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="doctores"
              nameKey="especialidad"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalDoctores.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Doctores
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total de doctores registrados
        </div>
        <div className="leading-5 text-muted-foreground text-center">
          Incluye verificados y no verificados
        </div>
      </CardFooter>
    </Card>
  );
}
