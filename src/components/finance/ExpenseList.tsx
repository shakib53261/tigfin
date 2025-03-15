import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, ArrowUpDown, Receipt } from "lucide-react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  status: "approved" | "pending" | "rejected";
}

const mockExpenses: Expense[] = [
  {
    id: "EXP-001",
    description: "Office Supplies",
    amount: 250.75,
    date: "2023-05-10",
    category: "Supplies",
    status: "approved",
  },
  {
    id: "EXP-002",
    description: "Client Lunch Meeting",
    amount: 120.5,
    date: "2023-05-15",
    category: "Meals",
    status: "approved",
  },
  {
    id: "EXP-003",
    description: "Software Subscription",
    amount: 99.99,
    date: "2023-05-20",
    category: "Software",
    status: "pending",
  },
  {
    id: "EXP-004",
    description: "Travel Expenses",
    amount: 450.0,
    date: "2023-05-18",
    category: "Travel",
    status: "pending",
  },
  {
    id: "EXP-005",
    description: "Hardware Purchase",
    amount: 1200.0,
    date: "2023-05-05",
    category: "Equipment",
    status: "rejected",
  },
];

export default function ExpenseList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredExpenses = mockExpenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-gray-800">
            Expenses
          </CardTitle>
          <Button
            onClick={() => navigate("/finance/expenses/new")}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="h-4 w-4 mr-2" /> New Expense
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-gray-50"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="py-3 px-4 text-left font-medium">
                  <div className="flex items-center">
                    ID
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  <div className="flex items-center">
                    Description
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  <div className="flex items-center">
                    Amount
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  <div className="flex items-center">
                    Category
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  <div className="flex items-center">
                    Status
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="py-3 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/finance/expenses/${expense.id}`)}
                >
                  <td className="py-3 px-4 text-sm">{expense.id}</td>
                  <td className="py-3 px-4 text-sm">{expense.description}</td>
                  <td className="py-3 px-4 text-sm">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm">{expense.date}</td>
                  <td className="py-3 px-4 text-sm">{expense.category}</td>
                  <td className="py-3 px-4 text-sm">
                    <Badge className={getStatusColor(expense.status)}>
                      {expense.status.charAt(0).toUpperCase() +
                        expense.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/finance/expenses/${expense.id}`);
                      }}
                    >
                      <Receipt className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
