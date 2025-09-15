"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  LegendProps,
} from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { BadgeCheck } from "lucide-react"

// Define chart config
interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

const productData = [
  {
    name: "Gold Ring",
    thisMonth: 124,
    lastMonth: 98,
  },
  {
    name: "Diamond Earrings",
    thisMonth: 89,
    lastMonth: 76,
  },
  {
    name: "Lipstick",
    thisMonth: 210,
    lastMonth: 185,
  },
  {
    name: "Perfume",
    thisMonth: 145,
    lastMonth: 132,
  },
  {
    name: "Necklace",
    thisMonth: 67,
    lastMonth: 59,
  },
  {
    name: "Nail Polish",
    thisMonth: 92,
    lastMonth: 88,
  },
]

// ✅ Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="rounded-md bg-white dark:bg-black border px-3 py-1 text-sm shadow">
        <p className="font-medium">{data.name}</p>
        <p className="">This Month: {data.thisMonth} units</p>
        <p className="">Last Month: {data.lastMonth} units</p>
      </div>
    )
  }
  return null
}

// ✅ Matching data keys
const chartConfig: ChartConfig = {
  thisMonth: {
    label: "This Month",
    color: "var(--chart-3)",
  },
  lastMonth: {
    label: "Last Month",
    color: "var(--chart-2)", 
  },
}

// ✅ Legend Formatter
const legendFormatter: LegendProps['formatter'] = (value) => {
  const config = chartConfig[value as keyof ChartConfig]
  return <span style={{ color: config?.color }}>{config?.label}</span>
}

export default function ProductBarChart() {
  return (
    <Card className="bg-transparent p-0 border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BadgeCheck className="h-5 w-5" />
          <p className="text-lg">Popular Product</p>
        </CardTitle>
        <CardDescription>Cosmetics & Jewellery – This Month vs Last Month</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <ResponsiveContainer width="100%" height={360}>
          <BarChart
            data={productData}
            layout="vertical"
            margin={{ top: 5, right: 10, left: 0, bottom: 10 }}
            barCategoryGap={20}
          >
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#374151" }}
              width={140}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
            <Legend
              verticalAlign="bottom"
              height={16}
              formatter={legendFormatter}
            />

            {/* Last Month */}
            <Bar
              dataKey="lastMonth"
              fill={chartConfig.lastMonth.color}
              barSize={16}
              radius={[0, 6, 6, 0]}
            >
              <LabelList
                dataKey="lastMonth"
                position="right"
                style={{ fill: "#9ca3af", fontSize: 12 }}
              />
            </Bar>

            {/* This Month */}
            <Bar
              dataKey="thisMonth"
              fill={chartConfig.thisMonth.color}
              barSize={16}
              radius={[0, 6, 6, 0]}
            >
              <LabelList
                dataKey="thisMonth"
                position="right"
                style={{ fill: "#6b7280", fontSize: 12 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
