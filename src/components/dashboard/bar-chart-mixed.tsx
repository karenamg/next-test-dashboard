"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
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

import { CitasPorEspecialidad } from "@/types";

type Props = {
  title: string;
  description: string;
  chartData: CitasPorEspecialidad[];
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

export function BarChartMixed({ title, description, chartData }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 40,
            }}
          >
            <YAxis
              dataKey="especialidad"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="citas" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="citas" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="leading-none text-muted-foreground text-sm">
          Total de citas registradas por especialidad
        </div>
      </CardFooter>
    </Card>
  );
}
