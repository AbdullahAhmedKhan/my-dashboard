"use client";
import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDollarSign, ChartNoAxesCombined, ShoppingBag, Tag, TrendingDown, TrendingUp } from "lucide-react";

const Homepage = () => {
  const date = new Date();
  const formattedDate = date
    .toLocaleDateString('en-GB', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    .replace(/(\w+)\s(\d)/, '$1, $2');
  const salesData = [
  {
    title: 'Total Sales',
    value: 23127,
    growthOrDown: 'growth',
    percentage: 12,
    icon: 'TrendingUp',
    currency: '$',
  },
  {
    title: 'Subscriptions',
    value: 1849,
    growthOrDown: 'growth',
    percentage: 3,
    icon: 'Users',
  },
  {
    title: 'Average Revenue',
    value: 15239,
    growthOrDown: 'growth',
    percentage: 8,
    icon: 'DollarSign',
    currency: '$',
  },
  {
    title: 'Average Order',
    value: 2034,
    growthOrDown: 'down',
    percentage: 3,
    icon: 'ShoppingCart',
  },
];

  return (
    <>
      <div className="mb-3">
        <h1 className="text-2xl font-bold mb-1">Hey, Abdullah</h1>
        <p className="text-muted-foreground text-sm">{formattedDate}</p>
      </div>

      <div className="p-3 border rounded-lg mb-6 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y-1 lg:divide-x-1 lg:divide-y-0 divide-solid">
          <div className="p-3 flex flex-col gap-2">
            <div className="flex gap-3">
              <ChartNoAxesCombined />
              <h3 className="text-lg">Sales Performance</h3>
            </div>
            <div className="flex gap-3 items-center text-sm">
              <p className="text-3xl font-bold tracking-tighter">$23,127</p>
              <p className="text-green-500 flex gap-1 items-center"><TrendingUp /> 12%</p> 
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </div>
          <div className="p-3 flex flex-col gap-2">
            <div className="flex gap-3">
              <Tag />
              <h3 className="text-lg">Total Sales</h3>
            </div>
            <div className="flex gap-3 items-center text-sm">
              <p className="text-3xl font-bold tracking-tighter">1,849</p>
              <p className="text-green-500 flex gap-1 items-center"><TrendingUp /> 3%</p> 
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </div>
          <div className="p-3 flex flex-col gap-2">
            <div className="flex gap-3">
              <BadgeDollarSign />
              <h3 className="text-lg">Average Revenue</h3>
            </div>
            <div className="flex gap-3 items-center text-sm">
              <p className="text-3xl font-bold tracking-tighter">$15,239</p>
              <p className="text-green-500 flex gap-1 items-center"><TrendingUp /> 8%</p> 
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </div>
          <div className="p-3 flex flex-col gap-2">
            <div className="flex gap-3">
              <ShoppingBag />
              <h3 className="text-lg">Average Order</h3>
            </div>
            <div className="flex gap-3 items-center text-sm">
              <p className="text-3xl font-bold tracking-tighter">2,034</p>
              <p className="text-rose-400 flex gap-1 items-center"><TrendingDown /> -3%</p> 
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-6 gap-4">
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-4">
          <AppAreaChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg 2xl:col-span-2">
          <AppBarChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg 2xl:col-span-2">
          <AppPieChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg 2xl:col-span-2">
          <TodoList />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg 2xl:col-span-2"> <CardList title="Latest Transactions" /></div>
      </div>
    </>

  );
}

export default Homepage;