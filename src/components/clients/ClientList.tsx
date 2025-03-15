import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreHorizontal, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "active" | "inactive" | "pending";
  lastContact: string;
  totalSpent: number;
  avatar?: string;
}

interface ClientListProps {
  clients?: Client[];
  isLoading?: boolean;
}

const defaultClients: Client[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    company: "Acme Inc",
    status: "active",
    lastContact: "2024-04-15",
    totalSpent: 12500,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    company: "TechSolutions Ltd",
    status: "active",
    lastContact: "2024-04-10",
    totalSpent: 8750,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "3",
    name: "Jessica Williams",
    email: "jessica@example.com",
    company: "Design Masters",
    status: "inactive",
    lastContact: "2024-03-22",
    totalSpent: 5200,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
  },
  {
    id: "4",
    name: "David Rodriguez",
    email: "david@example.com",
    company: "Global Ventures",
    status: "pending",
    lastContact: "2024-04-18",
    totalSpent: 0,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
  {
    id: "5",
    name: "Emma Thompson",
    email: "emma@example.com",
    company: "Creative Solutions",
    status: "active",
    lastContact: "2024-04-05",
    totalSpent: 15800,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
];

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

const ClientList = ({
  clients = defaultClients,
  isLoading = false,
}: ClientListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleClientClick = (clientId: string) => {
    navigate(`/clients/${clientId}`);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients..."
                className="pl-9 h-10"
                disabled
              />
            </div>
            <Button disabled>
              <Plus className="h-4 w-4 mr-2" /> Add Client
            </Button>
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="p-4 border border-gray-100 rounded-lg animate-pulse"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                  <div className="w-20 h-6 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Clients</CardTitle>
        <Button
          className="bg-orange-600 hover:bg-orange-700 text-white"
          onClick={() => navigate("/clients/new")}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Client
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search clients..."
              className="pl-9 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="space-y-4">
          {filteredClients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No clients found</p>
            </div>
          ) : (
            filteredClients.map((client) => (
              <div
                key={client.id}
                className="p-4 border border-gray-100 rounded-lg hover:border-orange-200 hover:bg-orange-50/30 transition-colors cursor-pointer"
                onClick={() => handleClientClick(client.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={client.avatar} alt={client.name} />
                      <AvatarFallback className="bg-orange-100 text-orange-800">
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {client.name}
                      </h3>
                      <p className="text-sm text-gray-500">{client.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className={getStatusColor(client.status)}
                    >
                      {client.status.charAt(0).toUpperCase() +
                        client.status.slice(1)}
                    </Badge>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${client.totalSpent.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        Last contact: {client.lastContact}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/clients/${client.id}/edit`);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle contact
                          }}
                        >
                          Contact
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle delete
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientList;
