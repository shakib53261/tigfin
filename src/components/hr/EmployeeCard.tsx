import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Mail, Phone, FileText, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EmployeeCardProps {
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    department: string;
    phoneNumber?: string;
    status: "active" | "onLeave" | "terminated";
    avatarUrl?: string;
  };
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onTimeOff: (id: string) => void;
  onDocuments: (id: string) => void;
}

export default function EmployeeCard({
  employee,
  onView,
  onEdit,
  onTimeOff,
  onDocuments,
}: EmployeeCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "onLeave":
        return "bg-amber-100 text-amber-800";
      case "terminated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-orange-50">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 border-2 border-orange-200">
            <AvatarImage
              src={employee.avatarUrl}
              alt={`${employee.firstName} ${employee.lastName}`}
            />
            <AvatarFallback className="bg-orange-600 text-white">
              {getInitials(employee.firstName, employee.lastName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{`${employee.firstName} ${employee.lastName}`}</h3>
            <p className="text-sm text-gray-600">{employee.position}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(employee.id)}>
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(employee.id)}>
              Edit Employee
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onTimeOff(employee.id)}>
              Manage Time Off
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDocuments(employee.id)}>
              View Documents
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(employee.status)}>
              {employee.status === "active"
                ? "Active"
                : employee.status === "onLeave"
                  ? "On Leave"
                  : "Terminated"}
            </Badge>
            <Badge variant="outline" className="bg-gray-50">
              {employee.department}
            </Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span className="truncate">{employee.email}</span>
          </div>
          {employee.phoneNumber && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{employee.phoneNumber}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 pt-3 pb-3">
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => onDocuments(employee.id)}
          >
            <FileText className="h-4 w-4" />
            Documents
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => onTimeOff(employee.id)}
          >
            <Clock className="h-4 w-4" />
            Time Off
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
