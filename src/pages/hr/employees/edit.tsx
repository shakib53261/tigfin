import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import EmployeeForm from "@/components/hr/EmployeeForm";
import { supabase } from "@/supabase/supabase";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditEmployee() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [employee, setEmployee] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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

        // Transform the data to match our form structure
        setEmployee({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          position: data.position,
          department: data.department,
          startDate: data.start_date,
          phoneNumber: data.phone_number,
          address: data.address,
          notes: data.notes,
          status: data.status,
        });
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

  const handleSubmit = async (data: any) => {
    setIsSaving(true);
    try {
      if (!id) return;

      // Update the employee in the database
      const { error } = await supabase
        .from("employees")
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          position: data.position,
          department: data.department,
          start_date: data.startDate,
          phone_number: data.phoneNumber,
          address: data.address,
          notes: data.notes,
          status: data.status,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Employee has been updated successfully",
        variant: "default",
      });

      // Redirect to the employee details page
      navigate(`/hr/employees/${id}`);
    } catch (error: any) {
      console.error("Error updating employee:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update employee",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-96 mb-8" />
        <div className="space-y-6">
          <Skeleton className="h-[600px] w-full" />
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Employee</h1>
        <p className="text-gray-600">Update employee information</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <EmployeeForm
          initialData={employee}
          onSubmit={handleSubmit}
          isLoading={isSaving}
        />
      </div>
    </div>
  );
}
