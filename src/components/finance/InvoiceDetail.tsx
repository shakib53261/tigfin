import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Edit, Send, CheckCircle } from "lucide-react";

interface Invoice {
  id: string;
  client: string;
  clientEmail: string;
  clientAddress: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  items: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
}

const mockInvoices: Record<string, Invoice> = {
  "INV-001": {
    id: "INV-001",
    client: "Acme Corp",
    clientEmail: "billing@acmecorp.com",
    clientAddress: "123 Business Ave, Suite 100, Business City, 12345",
    amount: 1500.0,
    date: "2023-05-15",
    dueDate: "2023-06-15",
    status: "paid",
    items: [
      {
        description: "Web Development Services",
        quantity: 20,
        rate: 75.0,
        amount: 1500.0,
      },
    ],
  },
  "INV-002": {
    id: "INV-002",
    client: "Globex Inc",
    clientEmail: "accounts@globexinc.com",
    clientAddress: "456 Corporate Blvd, Enterprise City, 67890",
    amount: 2750.5,
    date: "2023-05-20",
    dueDate: "2023-06-20",
    status: "pending",
    items: [
      {
        description: "UI/UX Design",
        quantity: 15,
        rate: 90.0,
        amount: 1350.0,
      },
      {
        description: "Frontend Development",
        quantity: 12,
        rate: 85.0,
        amount: 1020.0,
      },
      {
        description: "Project Management",
        quantity: 5,
        rate: 76.1,
        amount: 380.5,
      },
    ],
  },
  "INV-003": {
    id: "INV-003",
    client: "Stark Industries",
    clientEmail: "finance@stark.com",
    clientAddress: "789 Innovation Way, Tech Park, 54321",
    amount: 4200.75,
    date: "2023-04-10",
    dueDate: "2023-05-10",
    status: "overdue",
    items: [
      {
        description: "API Development",
        quantity: 25,
        rate: 95.0,
        amount: 2375.0,
      },
      {
        description: "Database Architecture",
        quantity: 18,
        rate: 101.25,
        amount: 1822.5,
      },
      {
        description: "Documentation",
        quantity: 1,
        rate: 3.25,
        amount: 3.25,
      },
    ],
  },
};

export default function InvoiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isMarkingPaid, setIsMarkingPaid] = useState(false);

  // In a real app, you would fetch this data from your API
  const invoice = id ? mockInvoices[id] : null;

  if (!invoice) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Invoice Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The invoice you're looking for doesn't exist or has been removed.
        </p>
        <Button
          onClick={() => navigate("/finance/invoices")}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Invoices
        </Button>
      </div>
    );
  }

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

  const handleMarkAsPaid = () => {
    setIsMarkingPaid(true);
    // In a real app, you would make an API call here
    setTimeout(() => {
      setIsMarkingPaid(false);
      // Update the invoice status
      // For now we'll just navigate back
      navigate("/finance/invoices");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => navigate("/finance/invoices")}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Invoices
        </Button>

        <div className="flex space-x-2">
          {invoice.status !== "paid" && (
            <Button
              onClick={handleMarkAsPaid}
              disabled={isMarkingPaid}
              className="bg-green-600 hover:bg-green-700"
            >
              {isMarkingPaid ? (
                <span>Processing...</span>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" /> Mark as Paid
                </>
              )}
            </Button>
          )}

          <Button
            variant="outline"
            className="border-orange-600 text-orange-600 hover:bg-orange-50"
          >
            <Send className="h-4 w-4 mr-2" /> Send
          </Button>

          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>

          <Button
            onClick={() => navigate(`/finance/invoices/${id}/edit`)}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
        </div>
      </div>

      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">
                Invoice {invoice.id}
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Issued on {invoice.date}
              </p>
            </div>
            <Badge className={getStatusColor(invoice.status)}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">From</h3>
              <p className="text-sm font-medium text-gray-900">TigFin Inc.</p>
              <p className="text-sm text-gray-600">123 Finance Street</p>
              <p className="text-sm text-gray-600">Business District, 54321</p>
              <p className="text-sm text-gray-600">accounting@tigfin.com</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Bill To
              </h3>
              <p className="text-sm font-medium text-gray-900">
                {invoice.client}
              </p>
              <p className="text-sm text-gray-600">{invoice.clientAddress}</p>
              <p className="text-sm text-gray-600">{invoice.clientEmail}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">
              Invoice Details
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-500">
                    <th className="py-3 px-4 text-left font-medium">
                      Description
                    </th>
                    <th className="py-3 px-4 text-right font-medium">
                      Quantity
                    </th>
                    <th className="py-3 px-4 text-right font-medium">Rate</th>
                    <th className="py-3 px-4 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3 px-4 text-sm">{item.description}</td>
                      <td className="py-3 px-4 text-sm text-right">
                        {item.quantity}
                      </td>
                      <td className="py-3 px-4 text-sm text-right">
                        ${item.rate.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-sm text-right">
                        ${item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">
                  ${invoice.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (0%)</span>
                <span className="font-medium text-gray-900">$0.00</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-900">Total</span>
                <span className="text-orange-600">
                  ${invoice.amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
          <p>Payment due by {invoice.dueDate}. Thank you for your business!</p>
        </CardFooter>
      </Card>
    </div>
  );
}
