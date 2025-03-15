import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  FileText,
  DollarSign,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  lastContact: string;
  totalSpent: number;
  avatar?: string;
  notes?: string[];
  documents?: Array<{
    id: string;
    name: string;
    type: string;
    date: string;
    size: string;
  }>;
  invoices?: Array<{
    id: string;
    number: string;
    date: string;
    amount: number;
    status: "paid" | "pending" | "overdue";
  }>;
}

const mockClient: Client = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah@example.com",
  phone: "+1 (555) 123-4567",
  company: "Acme Inc",
  address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
  status: "active",
  joinDate: "2023-06-15",
  lastContact: "2024-04-15",
  totalSpent: 12500,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  notes: [
    "Initial meeting on 2023-06-15. Discussed website redesign project.",
    "Follow-up call on 2023-07-02. Provided quote for services.",
    "Contract signed on 2023-07-10. Project kickoff scheduled.",
  ],
  documents: [
    {
      id: "doc1",
      name: "Contract Agreement",
      type: "PDF",
      date: "2023-07-10",
      size: "1.2 MB",
    },
    {
      id: "doc2",
      name: "Project Proposal",
      type: "DOCX",
      date: "2023-06-20",
      size: "845 KB",
    },
    {
      id: "doc3",
      name: "Requirements Specification",
      type: "PDF",
      date: "2023-07-25",
      size: "2.1 MB",
    },
  ],
  invoices: [
    {
      id: "inv1",
      number: "INV-2023-001",
      date: "2023-08-01",
      amount: 5000,
      status: "paid",
    },
    {
      id: "inv2",
      number: "INV-2023-008",
      date: "2023-09-01",
      amount: 3500,
      status: "paid",
    },
    {
      id: "inv3",
      number: "INV-2023-015",
      date: "2023-10-01",
      amount: 4000,
      status: "pending",
    },
  ],
};

const getStatusColor = (status: Client["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-50 text-green-600 border-green-200";
    case "inactive":
      return "bg-gray-50 text-gray-600 border-gray-200";
    case "pending":
      return "bg-yellow-50 text-yellow-600 border-yellow-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

const getInvoiceStatusColor = (status: "paid" | "pending" | "overdue") => {
  switch (status) {
    case "paid":
      return "bg-green-50 text-green-600 border-green-200";
    case "pending":
      return "bg-yellow-50 text-yellow-600 border-yellow-200";
    case "overdue":
      return "bg-red-50 text-red-600 border-red-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client] = useState<Client | null>(mockClient); // In a real app, fetch client by ID

  if (!client) {
    return (
      <div className="p-8 text-center">
        <p>Client not found</p>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => navigate("/clients")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Clients
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigate("/clients")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Clients
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
          <Button
            onClick={() => navigate(`/clients/${id}/edit`)}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Edit className="h-4 w-4 mr-2" /> Edit Client
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Info Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={client.avatar} alt={client.name} />
                <AvatarFallback className="text-2xl bg-orange-100 text-orange-800">
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-gray-900">
                {client.name}
              </h2>
              <p className="text-gray-500">{client.company}</p>
              <Badge
                variant="outline"
                className={`mt-2 ${getStatusColor(client.status)}`}
              >
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{client.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">{client.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Company</p>
                  <p className="text-gray-900">{client.company}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-gray-900">{client.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Client Since
                  </p>
                  <p className="text-gray-900">{client.joinDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Spent
                  </p>
                  <p className="text-gray-900">
                    ${client.totalSpent.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Card */}
        <Card className="lg:col-span-2">
          <Tabs defaultValue="notes">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle>Client Details</CardTitle>
                <TabsList>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="invoices">Invoices</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="notes" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Notes & Activity</h3>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Plus className="h-4 w-4 mr-2" /> Add Note
                  </Button>
                </div>
                <div className="space-y-4">
                  {client.notes?.map((note, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-100 rounded-lg"
                    >
                      <p className="text-gray-600">{note}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="documents" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Documents</h3>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Plus className="h-4 w-4 mr-2" /> Upload Document
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-gray-500 border-b">
                        <th className="pb-2 font-medium">Name</th>
                        <th className="pb-2 font-medium">Type</th>
                        <th className="pb-2 font-medium">Date</th>
                        <th className="pb-2 font-medium">Size</th>
                        <th className="pb-2 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {client.documents?.map((doc) => (
                        <tr
                          key={doc.id}
                          className="border-b border-gray-100 text-sm"
                        >
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-400" />
                              <span>{doc.name}</span>
                            </div>
                          </td>
                          <td className="py-3 pr-4">{doc.type}</td>
                          <td className="py-3 pr-4">{doc.date}</td>
                          <td className="py-3 pr-4">{doc.size}</td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="invoices" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Invoices</h3>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Plus className="h-4 w-4 mr-2" /> Create Invoice
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-gray-500 border-b">
                        <th className="pb-2 font-medium">Invoice #</th>
                        <th className="pb-2 font-medium">Date</th>
                        <th className="pb-2 font-medium">Amount</th>
                        <th className="pb-2 font-medium">Status</th>
                        <th className="pb-2 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {client.invoices?.map((invoice) => (
                        <tr
                          key={invoice.id}
                          className="border-b border-gray-100 text-sm"
                        >
                          <td className="py-3 pr-4">{invoice.number}</td>
                          <td className="py-3 pr-4">{invoice.date}</td>
                          <td className="py-3 pr-4">
                            ${invoice.amount.toLocaleString()}
                          </td>
                          <td className="py-3 pr-4">
                            <Badge
                              variant="outline"
                              className={getInvoiceStatusColor(invoice.status)}
                            >
                              {invoice.status.charAt(0).toUpperCase() +
                                invoice.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ClientDetail;
