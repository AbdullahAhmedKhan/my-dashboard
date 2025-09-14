"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowUp, BanknoteArrowUp } from "lucide-react"

export const description = "An interactive area chart"

const chartData = [
    { date: "2024-04-01", this_month: 222, last_month: 150 },
    { date: "2024-04-02", this_month: 97, last_month: 180 },
    { date: "2024-04-03", this_month: 167, last_month: 120 },
    { date: "2024-04-04", this_month: 242, last_month: 260 },
    { date: "2024-04-05", this_month: 373, last_month: 290 },
    { date: "2024-04-06", this_month: 301, last_month: 340 },
    { date: "2024-04-07", this_month: 245, last_month: 180 },
    { date: "2024-04-08", this_month: 409, last_month: 320 },
    { date: "2024-04-09", this_month: 59, last_month: 110 },
    { date: "2024-04-10", this_month: 261, last_month: 190 },
    { date: "2024-04-11", this_month: 327, last_month: 350 },
    { date: "2024-04-12", this_month: 292, last_month: 210 },
    { date: "2024-04-13", this_month: 342, last_month: 380 },
    { date: "2024-04-14", this_month: 137, last_month: 220 },
    { date: "2024-04-15", this_month: 120, last_month: 170 },
    { date: "2024-04-16", this_month: 138, last_month: 190 },
    { date: "2024-04-17", this_month: 446, last_month: 360 },
    { date: "2024-04-18", this_month: 364, last_month: 410 },
    { date: "2024-04-19", this_month: 243, last_month: 180 },
    { date: "2024-04-20", this_month: 89, last_month: 150 },
    { date: "2024-04-21", this_month: 137, last_month: 200 },
    { date: "2024-04-22", this_month: 224, last_month: 170 },
    { date: "2024-04-23", this_month: 138, last_month: 230 },
    { date: "2024-04-24", this_month: 387, last_month: 290 },
    { date: "2024-04-25", this_month: 215, last_month: 250 },
    { date: "2024-04-26", this_month: 75, last_month: 130 },
    { date: "2024-04-27", this_month: 383, last_month: 420 },
    { date: "2024-04-28", this_month: 122, last_month: 180 },
    { date: "2024-04-29", this_month: 315, last_month: 240 },
    { date: "2024-04-30", this_month: 454, last_month: 380 },
    { date: "2024-05-01", this_month: 165, last_month: 220 },
    { date: "2024-05-02", this_month: 293, last_month: 310 },
    { date: "2024-05-03", this_month: 247, last_month: 190 },
    { date: "2024-05-04", this_month: 385, last_month: 420 },
    { date: "2024-05-05", this_month: 481, last_month: 390 },
    { date: "2024-05-06", this_month: 498, last_month: 520 },
    { date: "2024-05-07", this_month: 388, last_month: 300 },
    { date: "2024-05-08", this_month: 149, last_month: 210 },
    { date: "2024-05-09", this_month: 227, last_month: 180 },
    { date: "2024-05-10", this_month: 293, last_month: 330 },
    { date: "2024-05-11", this_month: 335, last_month: 270 },
    { date: "2024-05-12", this_month: 197, last_month: 240 },
    { date: "2024-05-13", this_month: 197, last_month: 160 },
    { date: "2024-05-14", this_month: 448, last_month: 490 },
    { date: "2024-05-15", this_month: 473, last_month: 380 },
    { date: "2024-05-16", this_month: 338, last_month: 400 },
    { date: "2024-05-17", this_month: 499, last_month: 420 },
    { date: "2024-05-18", this_month: 315, last_month: 350 },
    { date: "2024-05-19", this_month: 235, last_month: 180 },
    { date: "2024-05-20", this_month: 177, last_month: 230 },
    { date: "2024-05-21", this_month: 82, last_month: 140 },
    { date: "2024-05-22", this_month: 81, last_month: 120 },
    { date: "2024-05-23", this_month: 252, last_month: 290 },
    { date: "2024-05-24", this_month: 294, last_month: 220 },
    { date: "2024-05-25", this_month: 201, last_month: 250 },
    { date: "2024-05-26", this_month: 213, last_month: 170 },
    { date: "2024-05-27", this_month: 420, last_month: 460 },
    { date: "2024-05-28", this_month: 233, last_month: 190 },
    { date: "2024-05-29", this_month: 78, last_month: 130 },
    { date: "2024-05-30", this_month: 340, last_month: 280 },
    { date: "2024-05-31", this_month: 178, last_month: 230 },
    { date: "2024-06-01", this_month: 178, last_month: 200 },
    { date: "2024-06-02", this_month: 470, last_month: 410 },
    { date: "2024-06-03", this_month: 103, last_month: 160 },
    { date: "2024-06-04", this_month: 439, last_month: 380 },
    { date: "2024-06-05", this_month: 88, last_month: 140 },
    { date: "2024-06-06", this_month: 294, last_month: 250 },
    { date: "2024-06-07", this_month: 323, last_month: 370 },
    { date: "2024-06-08", this_month: 385, last_month: 320 },
    { date: "2024-06-09", this_month: 438, last_month: 480 },
    { date: "2024-06-10", this_month: 155, last_month: 200 },
    { date: "2024-06-11", this_month: 92, last_month: 150 },
    { date: "2024-06-12", this_month: 492, last_month: 420 },
    { date: "2024-06-13", this_month: 81, last_month: 130 },
    { date: "2024-06-14", this_month: 426, last_month: 380 },
    { date: "2024-06-15", this_month: 307, last_month: 350 },
    { date: "2024-06-16", this_month: 371, last_month: 310 },
    { date: "2024-06-17", this_month: 475, last_month: 520 },
    { date: "2024-06-18", this_month: 107, last_month: 170 },
    { date: "2024-06-19", this_month: 341, last_month: 290 },
    { date: "2024-06-20", this_month: 408, last_month: 450 },
    { date: "2024-06-21", this_month: 169, last_month: 210 },
    { date: "2024-06-22", this_month: 317, last_month: 270 },
    { date: "2024-06-23", this_month: 480, last_month: 530 },
    { date: "2024-06-24", this_month: 132, last_month: 180 },
    { date: "2024-06-25", this_month: 141, last_month: 190 },
    { date: "2024-06-26", this_month: 434, last_month: 380 },
    { date: "2024-06-27", this_month: 448, last_month: 490 },
    { date: "2024-06-28", this_month: 149, last_month: 200 },
    { date: "2024-06-29", this_month: 103, last_month: 160 },
    { date: "2024-06-30", this_month: 446, last_month: 400 },
]

const sumThisMonth = chartData.reduce((total, item) => total + item.this_month, 0);

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    this_month: {
        label: "This Month",
        color: "var(--chart-4)",
    },
    last_month: {
        label: "Last Month",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

export default function ChartAreaInteractive() {
    const [timeRange, setTimeRange] = React.useState("90d")

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="pt-0 bg-transparent border-0 shadow-none">
            <CardHeader className="flex items-start gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>
                        <div className="flex gap-2 items-center">
                            <BanknoteArrowUp />
                            <h3 className="text-lg">Total Revenue</h3>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        <div className="flex gap-2 items-center">
                            <h2 className="text-2xl font-bold">${sumThisMonth.toLocaleString('en-US')}</h2>
                            <div className="text-green-500 flex gap-1 items-center"><ArrowUp size={18} /> <span>9%</span></div>
                            <span>vs last month</span>
                        </div>
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillthis_month" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-this_month)"
                                    stopOpacity={0.5}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-this_month)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="filllast_month" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-last_month)"
                                    stopOpacity={0.5}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-last_month)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={true}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <YAxis
                            tickLine={true}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="last_month"
                            type="natural"
                            fill="url(#filllast_month)"
                            stroke="var(--color-last_month)"
                            stackId="a"
                        />
                        <Area
                            dataKey="this_month"
                            type="natural"
                            fill="url(#fillthis_month)"
                            stroke="var(--color-this_month)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
