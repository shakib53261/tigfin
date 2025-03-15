import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: "active" | "on-leave" | "terminated";
  avatar?: string;
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Jane Smith",
    position: "Senior Developer",
    department: "Engineering",
    email: "jane.smith@example.com",
    phone: "(555) 123-4567",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  {
    id: "2",
    name: "John Doe",
    position: "Project Manager",
    department: "Product",
    email: "john.doe@example.com",
    phone: "(555) 987-6543",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "3",
    name: "Emily Johnson",
    position: "UX Designer",
    department: "Design",
    email: "emily.johnson@example.com",
    phone: "(555) 456-7890",
    status: "on-leave",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: "4",
    name: "Michael Brown",
    position: "Financial Analyst",
    department: "Finance",
    email: "michael.brown@example.com",
    phone: "(555) 234-5678",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "5",
    name: "Sarah Wilson",
    position: "HR Specialist",
    department: "Human Resources",
    email: "sarah.wilson@example.com",
    phone: "(555) 876-5432",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
];

export default function EmployeeDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: Employee["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "on-leave":
        return "bg-yellow-100 text-yellow-800";
      case "terminated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Employee Directory</h2>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search employees..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee) => (
          <Card
            key={employee.id}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 border-2 border-orange-100">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback className="bg-orange-100 text-orange-800">
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <p className="text-sm text-gray-500">{employee.position}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(employee.status)}>
                  {employee.status.replace("-", " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="font-medium w-24">Department:</span>
                  <span>{employee.department}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-24">Email:</span>
                  <span className="text-blue-600">{employee.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-24">Phone:</span>
                  <span>{employee.phone}</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No employees found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
