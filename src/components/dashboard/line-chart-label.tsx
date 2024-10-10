"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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
import { CitasAlMes } from "@/types";

export const description = "A line chart with a label";

type Props = {
  title: string;
  description: string;
  chartData: CitasAlMes[];
};

const chartData = [
  { mes: "January", aprobadas: 186, canceladas: 12 },
  { mes: "February", aprobadas: 305, canceladas: 12 },
  { mes: "March", aprobadas: 237, canceladas: 12 },
  { mes: "April", aprobadas: 73, canceladas: 12 },
  { mes: "May", aprobadas: 209, canceladas: 12 },
  { mes: "June", aprobadas: 214, canceladas: 12 },
];

const chartConfig = {
  aprobadas: {
    label: "Aprobadas",
    color: "hsl(var(--chart-1))",
  },
  canceladas: {
    label: "Canceladas",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function LineChartLabel({ title, description, chartData }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {chartData[0].mes} - {chartData[chartData.length - 1].mes}{" "}
          {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="aprobadas"
              type="natural"
              stroke="var(--color-aprobadas)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-aprobadas)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Total de citas aprobadas en los últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  );
}
