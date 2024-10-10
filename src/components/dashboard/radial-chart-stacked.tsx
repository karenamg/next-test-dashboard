"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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

export const description = "A radial chart with stacked sections";

type Props = {
  title: string;
  description: string;
  aprobadas: number;
  canceladas: number;
  pendientes: number;
};

const chartConfig = {
  aprobadas: {
    label: "Aprobadas",
    color: "hsl(var(--chart-1))",
  },
  canceladas: {
    label: "Canceladas",
    color: "hsl(var(--chart-2))",
  },
  pendientes: {
    label: "Pendientes",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function RadialChartStacked({
  title,
  description,
  aprobadas,
  canceladas,
  pendientes,
}: Props) {
  const totalCitas = aprobadas + canceladas + pendientes;
  const aprobadasPercent = ((aprobadas / totalCitas) * 100).toFixed(0) + "%";
  const canceladasPercent = ((canceladas / totalCitas) * 100).toFixed(0) + "%";
  const pendientesPercent = ((pendientes / totalCitas) * 100).toFixed(0) + "%";
  const chartData = [
    { aprobadas: aprobadas, canceladas: canceladas, pendientes: pendientes },
  ];
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalCitas.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Citas
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="aprobadas"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-aprobadas)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="canceladas"
              fill="var(--color-canceladas)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="pendientes"
              fill="var(--color-pendientes)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total de citas registradas
        </div>
        <div className="leading-5 text-muted-foreground text-center">
          {`Aprob: ${aprobadasPercent} | Cancel: ${canceladasPercent} | Pend: ${pendientesPercent}`}
        </div>
      </CardFooter>
    </Card>
  );
}
