"use client";

import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  free: number;
  pro: number;
  proPlus: number;
}

function PieCharts({ free, pro, proPlus }: Props) {
  const chartData = [
    {
      actors: "free",
      users: free,
      fill: "var(--color-free)",
    },
    {
      actors: "pro",
      users: pro,
      fill: "var(--color-pro)",
    },
    {
      actors: "proPlus",
      users: proPlus,
      fill: "var(--color-proPlus)",
    },
  ];

  const chartConfig = {
    visitors: {
      label: "Users",
    },
    free: {
      label: "Free",
      color: "hsl(var(--chart-1))",
    },
    pro: {
      label: "Pro",
      color: "hsl(var(--chart-2))",
    },
    proPlus: {
      label: "Pro +",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col bg-white border-none shadow shadow-zinc-900 py-5">
      <CardHeader className="items-center pb-0">
        <CardTitle>Users</CardTitle>
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
              dataKey="users"
              nameKey="actors"
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
                          {free + pro + proPlus}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        ></tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground "
                        >
                          Users
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
    </Card>
  );
}

export default PieCharts;
