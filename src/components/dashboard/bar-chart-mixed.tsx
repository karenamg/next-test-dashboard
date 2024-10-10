"use client";
import { TrendingUp } from "lucide-react";
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
export const description = "A mixed bar chart";
import { CitasPorEspecialidad } from "@/types";

type Props = {
  title: string;
  description: string;
  chartData: CitasPorEspecialidad[];
};

// const chartData = [
//   {
//     especialidad: "cardiologia",
//     citas: 275,
//     fill: "var(--color-cardiologia)",
//   },
//   { especialidad: "pediatria", citas: 200, fill: "var(--color-pediatria)" },
//   {
//     especialidad: "dermatologia",
//     citas: 287,
//     fill: "var(--color-dermatologia)",
//   },
//   {
//     especialidad: "ginecologia",
//     citas: 173,
//     fill: "var(--color-ginecologia)",
//   },
//   { especialidad: "oncologia", citas: 190, fill: "var(--color-oncologia)" },
//   {
//     especialidad: "neurologia",
//     citas: 10,
//     fill: "var(--color-neurologia)",
//   },
//   {
//     especialidad: "traumatologia",
//     citas: 90,
//     fill: "var(--color-traumatologia)",
//   },
//   {
//     especialidad: "psiquiatria",
//     citas: 99,
//     fill: "var(--color-psiquiatria)",
//   },
// ];

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
        <CardDescription>January - June 2024</CardDescription>
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
