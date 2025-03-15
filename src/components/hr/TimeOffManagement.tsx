import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Plus } from "lucide-react";

interface TimeOffRequest {
  id: string;
  employeeName: string;
  employeeAvatar?: string;
  type: "vacation" | "sick" | "personal" | "bereavement" | "other";
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  notes?: string;
  daysCount: number;
}

const mockRequests: TimeOffRequest[] = [
  {
    id: "1",
    employeeName: "Jane Smith",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    type: "vacation",
    startDate: "2023-07-10",
    endDate: "2023-07-14",
    status: "approved",
    notes: "Annual family vacation",
    daysCount: 5,
  },
  {
    id: "2",
    employeeName: "John Doe",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    type: "sick",
    startDate: "2023-07-05",
    endDate: "2023-07-06",
    status: "approved",
    daysCount: 2,
  },
  {
    id: "3",
    employeeName: "Emily Johnson",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    type: "personal",
    startDate: "2023-07-20",
    endDate: "2023-07-20",
    status: "pending",
    notes: "Doctor's appointment",
    daysCount: 1,
  },
  {
    id: "4",
    employeeName: "Michael Brown",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    type: "bereavement",
    startDate: "2023-07-15",
    endDate: "2023-07-19",
    status: "approved",
    daysCount: 5,
  },
  {
    id: "5",
    employeeName: "Sarah Wilson",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    type: "vacation",
    startDate: "2023-08-01",
    endDate: "2023-08-10",
    status: "pending",
    notes: "Summer vacation",
    daysCount: 10,
  },
];

export default function TimeOffManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [requests, setRequests] = useState<TimeOffRequest[]>(mockRequests);

  const filteredRequests =
    activeTab === "all"
      ? requests
      : requests.filter((request) => request.status === activeTab);

  const getTypeColor = (type: TimeOffRequest["type"]) => {
    switch (type) {
      case "vacation":
        return "bg-blue-100 text-blue-800";
      case "sick":
        return "bg-red-100 text-red-800";
      case "personal":
        return "bg-purple-100 text-purple-800";
      case "bereavement":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: TimeOffRequest["status"]) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Time Off Management
        </h2>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Request Time Off
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card
            key={request.id}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center space-x-3 mb-3 md:mb-0">
                  <Avatar className="h-10 w-10 border-2 border-orange-100">
                    <AvatarImage
                      src={request.employeeAvatar}
                      alt={request.employeeName}
                    />
                    <AvatarFallback className="bg-orange-100 text-orange-800">
                      {request.employeeName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{request.employeeName}</h3>
                    <Badge className={getTypeColor(request.type)}>
                      {request.type.charAt(0).toUpperCase() +
                        request.type.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {formatDate(request.startDate)} -{" "}
                      {formatDate(request.endDate)}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>
                      {request.daysCount}{" "}
                      {request.daysCount === 1 ? "day" : "days"}
                    </span>
                  </div>

                  <Badge className={getStatusColor(request.status)}>
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {request.notes && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Notes:</span> {request.notes}
                  </p>
                </div>
              )}

              {request.status === "pending" && (
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredRequests.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No time off requests found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
