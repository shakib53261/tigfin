import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import EmployeeForm from "@/components/hr/EmployeeForm";
import { supabase } from "@/supabase/supabase";

export default function NewEmployee() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Insert the new employee into the database
      const { data: employee, error } = await supabase
        .from("employees")
        .insert([
          {
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
          },
        ])
        .select();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Employee has been added successfully",
        variant: "default",
      });

      // Redirect to the employee list page
      navigate("/hr/employees");
    } catch (error: any) {
      console.error("Error adding employee:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add employee",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Employee</h1>
        <p className="text-gray-600">
          Create a new employee record in the system
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <EmployeeForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
