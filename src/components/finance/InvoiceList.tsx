import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FileText, ArrowUpDown } from "lucide-react";

interface Invoice {
  id: string;
  client: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

const mockInvoices: Invoice[] = [
  {
    id: "INV-001",
    client: "Acme Corp",
    amount: 1500.0,
    date: "2023-05-15",
    dueDate: "2023-06-15",
    status: "paid",
  },
  {
    id: "INV-002",
    client: "Globex Inc",
    amount: 2750.5,
    date: "2023-05-20",
    dueDate: "2023-06-20",
    status: "pending",
  },
  {
    id: "INV-003",
    client: "Stark Industries",
    amount: 4200.75,
    date: "2023-04-10",
    dueDate: "2023-05-10",
    status: "overdue",
  },
  {
    id: "INV-004",
    client: "Wayne Enterprises",
    amount: 3100.25,
    date: "2023-05-25",
    dueDate: "2023-06-25",
    status: "pending",
  },
  {
    id: "INV-005",
    client: "Oscorp",
    amount: 1850.0,
    date: "2023-05-05",
    dueDate: "2023-06-05",
    status: "paid",
  },
];

export default function InvoiceList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredInvoices = mockInvoices.filter(
    (invoice) =>
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
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
            Invoices
          </CardTitle>
          <Button
            onClick={() => navigate("/finance/invoices/new")}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="h-4 w-4 mr-2" /> New Invoice
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search invoices..."
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
                    Invoice ID
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  <div className="flex items-center">
                    Client
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
                    Due Date
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
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/finance/invoices/${invoice.id}`)}
                >
                  <td className="py-3 px-4 text-sm">{invoice.id}</td>
                  <td className="py-3 px-4 text-sm">{invoice.client}</td>
                  <td className="py-3 px-4 text-sm">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm">{invoice.date}</td>
                  <td className="py-3 px-4 text-sm">{invoice.dueDate}</td>
                  <td className="py-3 px-4 text-sm">
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() +
                        invoice.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/finance/invoices/${invoice.id}`);
                      }}
                    >
                      <FileText className="h-4 w-4" />
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
