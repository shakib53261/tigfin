import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabase/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import EmployeeCard from "./EmployeeCard";
import { UserPlus, Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EmployeeList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [employees, setEmployees] = useState<any[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departments, setDepartments] = useState<string[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data, error } = await supabase
          .from("employees")
          .select("*")
          .order("last_name", { ascending: true });

        if (error) throw error;

        setEmployees(data || []);
        setFilteredEmployees(data || []);

        // Extract unique departments
        if (data) {
          const uniqueDepartments = [
            ...new Set(data.map((emp) => emp.department)),
          ];
          setDepartments(uniqueDepartments);
        }
      } catch (error: any) {
        console.error("Error fetching employees:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to load employees",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();

    // Set up realtime subscription
    const subscription = supabase
      .channel("employees-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "employees" },
        fetchEmployees,
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let result = [...employees];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (emp) =>
          emp.first_name.toLowerCase().includes(query) ||
          emp.last_name.toLowerCase().includes(query) ||
          emp.email.toLowerCase().includes(query) ||
          emp.position.toLowerCase().includes(query),
      );
    }

    // Apply department filter
    if (departmentFilter !== "all") {
      result = result.filter((emp) => emp.department === departmentFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((emp) => emp.status === statusFilter);
    }

    setFilteredEmployees(result);
  }, [employees, searchQuery, departmentFilter, statusFilter]);

  const handleEmployeeAction = (id: string, action: string) => {
    switch (action) {
      case "view":
        navigate(`/hr/employees/${id}`);
        break;
      case "edit":
        navigate(`/hr/employees/edit/${id}`);
        break;
      case "timeoff":
        navigate(`/hr/time-off/${id}`);
        break;
      case "documents":
        navigate(`/hr/documents/${id}`);
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Employee Directory
          </h1>
          <p className="text-gray-600">
            {filteredEmployees.length}{" "}
            {filteredEmployees.length === 1 ? "employee" : "employees"} found
          </p>
        </div>
        <Button
          onClick={() => navigate("/hr/employees/new")}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Filter by department" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="onLeave">On Leave</SelectItem>
              <SelectItem value="terminated">Terminated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500 mb-2">No employees found</p>
          <p className="text-gray-400 text-sm">
            {searchQuery || departmentFilter !== "all" || statusFilter !== "all"
              ? "Try adjusting your filters"
              : "Add your first employee to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={{
                id: employee.id,
                firstName: employee.first_name,
                lastName: employee.last_name,
                email: employee.email,
                position: employee.position,
                department: employee.department,
                phoneNumber: employee.phone_number,
                status: employee.status,
                avatarUrl: employee.avatar_url,
              }}
              onView={(id) => handleEmployeeAction(id, "view")}
              onEdit={(id) => handleEmployeeAction(id, "edit")}
              onTimeOff={(id) => handleEmployeeAction(id, "timeoff")}
              onDocuments={(id) => handleEmployeeAction(id, "documents")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
