import { useState, useEffect } from "react";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";
import { Plus, Edit, Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useToast } from "../ui/use-toast";

type Budget = {
  id: string;
  name: string;
  amount: number;
  period: string;
  category: string;
  start_date: string;
  end_date: string;
  spent?: number;
  remaining?: number;
  percentage?: number;
};

type BudgetExpense = {
  id: string;
  budget_id: string;
  expense_id: string;
  amount: number;
  date: string;
};

export default function BudgetTracking() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<BudgetExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    period: "monthly",
    category: "",
    start_date: format(new Date(), "yyyy-MM-dd"),
    end_date: format(
      new Date(new Date().setMonth(new Date().getMonth() + 1)),
      "yyyy-MM-dd",
    ),
  });

  useEffect(() => {
    if (user) {
      fetchBudgets();
      fetchExpenses();

      // Set up real-time subscription for budgets
      const budgetsSubscription = supabase
        .channel("budgets-changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "budgets" },
          () => fetchBudgets(),
        )
        .subscribe();

      // Set up real-time subscription for budget expenses
      const expensesSubscription = supabase
        .channel("budget-expenses-changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "budget_expenses" },
          () => fetchExpenses(),
        )
        .subscribe();

      return () => {
        supabase.removeChannel(budgetsSubscription);
        supabase.removeChannel(expensesSubscription);
      };
    }
  }, [user]);

  const fetchBudgets = async () => {
    try {
      const { data, error } = await supabase
        .from("budgets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBudgets(data || []);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      toast({
        variant: "destructive",
        title: "Error fetching budgets",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from("budget_expenses")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;

      setExpenses(data || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      toast({
        variant: "destructive",
        title: "Error fetching expenses",
        description: "Please try again later.",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      amount: "",
      period: "monthly",
      category: "",
      start_date: format(new Date(), "yyyy-MM-dd"),
      end_date: format(
        new Date(new Date().setMonth(new Date().getMonth() + 1)),
        "yyyy-MM-dd",
      ),
    });
    setEditingBudget(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const budgetData = {
        ...formData,
        amount: parseFloat(formData.amount),
        user_id: user?.id,
      };

      let response;

      if (editingBudget) {
        response = await supabase
          .from("budgets")
          .update(budgetData)
          .eq("id", editingBudget.id);
      } else {
        response = await supabase.from("budgets").insert([budgetData]);
      }

      if (response.error) throw response.error;

      toast({
        title: editingBudget ? "Budget updated" : "Budget created",
        description: editingBudget
          ? "Your budget has been updated successfully."
          : "Your new budget has been created.",
      });

      resetForm();
      setOpenDialog(false);
      await fetchBudgets();
    } catch (error) {
      console.error("Error saving budget:", error);
      toast({
        variant: "destructive",
        title: "Error saving budget",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setFormData({
      name: budget.name,
      amount: budget.amount.toString(),
      period: budget.period,
      category: budget.category || "",
      start_date: format(new Date(budget.start_date), "yyyy-MM-dd"),
      end_date: format(new Date(budget.end_date), "yyyy-MM-dd"),
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this budget? This action cannot be undone.",
      )
    ) {
      try {
        setLoading(true);

        // First delete associated expenses
        const { error: expensesError } = await supabase
          .from("budget_expenses")
          .delete()
          .eq("budget_id", id);

        if (expensesError) throw expensesError;

        // Then delete the budget
        const { error } = await supabase.from("budgets").delete().eq("id", id);

        if (error) throw error;

        toast({
          title: "Budget deleted",
          description: "The budget has been deleted successfully.",
        });

        await fetchBudgets();
        await fetchExpenses();
      } catch (error) {
        console.error("Error deleting budget:", error);
        toast({
          variant: "destructive",
          title: "Error deleting budget",
          description: "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // Calculate budget progress
  const calculateBudgetProgress = (budget: Budget) => {
    const budgetExpenses = expenses.filter(
      (expense) => expense.budget_id === budget.id,
    );
    const totalSpent = budgetExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
    const remaining = budget.amount - totalSpent;
    const percentage = (totalSpent / budget.amount) * 100;

    return {
      ...budget,
      spent: totalSpent,
      remaining: remaining,
      percentage: percentage,
    };
  };

  const budgetsWithProgress = budgets.map(calculateBudgetProgress);

  // Filter budgets by status
  const activeBudgets = budgetsWithProgress.filter(
    (budget) => new Date(budget.end_date) >= new Date(),
  );
  const expiredBudgets = budgetsWithProgress.filter(
    (budget) => new Date(budget.end_date) < new Date(),
  );

  // Filter budgets by status
  const healthyBudgets = activeBudgets.filter(
    (budget) => (budget.percentage || 0) < 80,
  );
  const warningBudgets = activeBudgets.filter(
    (budget) =>
      (budget.percentage || 0) >= 80 && (budget.percentage || 0) < 100,
  );
  const overBudgets = activeBudgets.filter(
    (budget) => (budget.percentage || 0) >= 100,
  );

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Budget Tracking</h2>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
                setOpenDialog(true);
              }}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingBudget ? "Edit Budget" : "Create New Budget"}
              </DialogTitle>
              <DialogDescription>
                {editingBudget
                  ? "Update your budget details below."
                  : "Fill in the details to create a new budget."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="name"
                    className="text-right font-medium col-span-1"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="amount"
                    className="text-right font-medium col-span-1"
                  >
                    Amount
                  </label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="period"
                    className="text-right font-medium col-span-1"
                  >
                    Period
                  </label>
                  <Select
                    value={formData.period}
                    onValueChange={(value) =>
                      handleSelectChange("period", value)
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="category"
                    className="text-right font-medium col-span-1"
                  >
                    Category
                  </label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="start_date"
                    className="text-right font-medium col-span-1"
                  >
                    Start Date
                  </label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="end_date"
                    className="text-right font-medium col-span-1"
                  >
                    End Date
                  </label>
                  <Input
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setOpenDialog(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : editingBudget
                      ? "Update Budget"
                      : "Create Budget"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Budgets</CardTitle>
            <CardDescription>Active budget tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeBudgets.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Total Allocated
            </CardTitle>
            <CardDescription>Across all active budgets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              $
              {activeBudgets
                .reduce((sum, budget) => sum + budget.amount, 0)
                .toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Spent</CardTitle>
            <CardDescription>Across all active budgets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              $
              {activeBudgets
                .reduce((sum, budget) => sum + (budget.spent || 0), 0)
                .toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">
            Active ({activeBudgets.length})
          </TabsTrigger>
          <TabsTrigger value="healthy">
            Healthy ({healthyBudgets.length})
          </TabsTrigger>
          <TabsTrigger value="warning">
            Warning ({warningBudgets.length})
          </TabsTrigger>
          <TabsTrigger value="over">
            Over Budget ({overBudgets.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          {activeBudgets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No active budgets found. Create a new budget to get started.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeBudgets.map((budget) => (
                <BudgetCard
                  key={budget.id}
                  budget={budget}
                  onEdit={() => handleEdit(budget)}
                  onDelete={() => handleDelete(budget.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="healthy" className="mt-4">
          {healthyBudgets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No healthy budgets found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {healthyBudgets.map((budget) => (
                <BudgetCard
                  key={budget.id}
                  budget={budget}
                  onEdit={() => handleEdit(budget)}
                  onDelete={() => handleDelete(budget.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="warning" className="mt-4">
          {warningBudgets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No budgets with warnings found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {warningBudgets.map((budget) => (
                <BudgetCard
                  key={budget.id}
                  budget={budget}
                  onEdit={() => handleEdit(budget)}
                  onDelete={() => handleDelete(budget.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="over" className="mt-4">
          {overBudgets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No over-budget items found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {overBudgets.map((budget) => (
                <BudgetCard
                  key={budget.id}
                  budget={budget}
                  onEdit={() => handleEdit(budget)}
                  onDelete={() => handleDelete(budget.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

type BudgetCardProps = {
  budget: Budget;
  onEdit: () => void;
  onDelete: () => void;
};

function BudgetCard({ budget, onEdit, onDelete }: BudgetCardProps) {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-red-500";
    if (percentage >= 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 100) {
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <AlertCircle className="h-3 w-3 mr-1" /> Over Budget
        </Badge>
      );
    }
    if (percentage >= 80) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <AlertCircle className="h-3 w-3 mr-1" /> Warning
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle2 className="h-3 w-3 mr-1" /> Healthy
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">{budget.name}</CardTitle>
            <CardDescription>
              {budget.category || "Uncategorized"} • {budget.period}
            </CardDescription>
          </div>
          {getStatusBadge(budget.percentage || 0)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{Math.min(Math.round(budget.percentage || 0), 100)}%</span>
          </div>
          <Progress
            value={Math.min(budget.percentage || 0, 100)}
            className={`h-2 ${getProgressColor(budget.percentage || 0)}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Budget</p>
            <p className="font-medium">${budget.amount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">Spent</p>
            <p className="font-medium">${(budget.spent || 0).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">Remaining</p>
            <p
              className={`font-medium ${(budget.remaining || 0) < 0 ? "text-red-600" : ""}`}
            >
              ${(budget.remaining || 0).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Period</p>
            <p className="font-medium">
              {format(new Date(budget.start_date), "MMM d")} -{" "}
              {format(new Date(budget.end_date), "MMM d, yyyy")}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
