import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, BarChart, PieChart, LineChart } from "lucide-react";

export default function FinancialReports() {
  const [period, setPeriod] = useState("month");

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-gray-800">
            Financial Reports
          </CardTitle>
          <Button
            variant="outline"
            className="border-orange-600 text-orange-600 hover:bg-orange-50"
          >
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue="income" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="profit">Profit</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center space-x-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-gray-500">
                Total Income
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-1">
                $24,500.00
              </div>
              <div className="text-sm text-green-600 mt-1">
                +12% from last period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-gray-500">
                Total Expenses
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-1">
                $12,300.00
              </div>
              <div className="text-sm text-red-600 mt-1">
                +5% from last period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-gray-500">
                Net Profit
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-1">
                $12,200.00
              </div>
              <div className="text-sm text-green-600 mt-1">
                +18% from last period
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-md font-medium text-gray-700">
                  Income vs Expenses
                </CardTitle>
                <BarChart className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-gray-400 text-sm">
                  Chart visualization would appear here
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-md font-medium text-gray-700">
                  Expense Breakdown
                </CardTitle>
                <PieChart className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-gray-400 text-sm">
                  Chart visualization would appear here
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
