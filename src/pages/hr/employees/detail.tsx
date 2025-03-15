import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/supabase/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  FileText,
  Clock,
  Edit,
  ArrowLeft,
} from "lucide-react";

export default function EmployeeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [employee, setEmployee] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (!id) return;

        const { data, error } = await supabase
          .from("employees")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setEmployee(data);
      } catch (error: any) {
        console.error("Error fetching employee:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to load employee data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [id, toast]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-8 w-64 mb-4" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-[300px] col-span-1" />
          <Skeleton className="h-[600px] col-span-2" />
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Employee Not Found
        </h1>
        <p className="text-gray-600 mb-4">
          The employee you are looking for does not exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/hr/employees")}
          className="text-orange-600 hover:text-orange-800"
        >
          Return to Employee List
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => navigate("/hr/employees")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to List
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Employee Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Info Card */}
        <Card className="bg-white">
          <CardHeader className="pb-2 text-center bg-orange-50">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4 border-4 border-orange-200">
                <AvatarImage
                  src={employee.avatar_url}
                  alt={`${employee.first_name} ${employee.last_name}`}
                />
                <AvatarFallback className="bg-orange-600 text-white text-xl">
                  {getInitials(employee.first_name, employee.last_name)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">
                {`${employee.first_name} ${employee.last_name}`}
              </CardTitle>
              <p className="text-gray-600">{employee.position}</p>
              <div className="mt-2">
                <Badge className={getStatusColor(employee.status)}>
                  {employee.status === "active"
                    ? "Active"
                    : employee.status === "onLeave"
                      ? "On Leave"
                      : "Terminated"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{employee.email}</p>
                </div>
              </div>

              {employee.phone_number && (
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{employee.phone_number}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <Briefcase className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="text-gray-900">{employee.department}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="text-gray-900">
                    {formatDate(employee.start_date)}
                  </p>
                </div>
              </div>

              {employee.address && (
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-900">{employee.address}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <Button
                className="w-full bg-orange-600 hover:bg-orange-700"
                onClick={() => navigate(`/hr/employees/edit/${id}`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <div className="col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="timeoff">Time Off</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Employee Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {employee.notes && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Notes
                      </h3>
                      <p className="text-gray-700 whitespace-pre-line">
                        {employee.notes}
                      </p>
                    </div>
                  )}

                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Employment Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs text-gray-500">Position</p>
                      <p className="text-gray-900">{employee.position}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Department</p>
                      <p className="text-gray-900">{employee.department}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="text-gray-900 capitalize">
                        {employee.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Start Date</p>
                      <p className="text-gray-900">
                        {formatDate(employee.start_date)}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Recent Activity
                  </h3>
                  <p className="text-gray-500 text-sm italic">
                    No recent activity to display
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Documents</CardTitle>
                    <Button
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-sm italic">
                    No documents available
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeoff" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Time Off Requests</CardTitle>
                    <Button
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Request Time Off
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-sm italic">
                    No time off requests
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
