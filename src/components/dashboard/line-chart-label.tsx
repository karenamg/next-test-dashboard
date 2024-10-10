"use client";

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
  chartData: CitasAlMes[];
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
} satisfies ChartConfig;

export function LineChartLabel({ title, chartData }: Props) {
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
      <CardFooter>
        <div className="leading-none text-muted-foreground text-sm">
          Total de citas aprobadas en los últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  );
}
