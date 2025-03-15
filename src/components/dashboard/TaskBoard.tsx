import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, CheckCircle2, Clock, MoreHorizontal } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority?: "low" | "medium" | "high";
  assignee?: {
    name: string;
    avatar: string;
  };
}

interface TaskBoardProps {
  tasks?: Task[];
  onTaskMove?: (taskId: string, newStatus: Task["status"]) => void;
  onTaskClick?: (task: Task) => void;
  isLoading?: boolean;
}

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Design System Updates",
    description: "Update component library with new design tokens",
    status: "todo",
    priority: "high",
    assignee: {
      name: "Alice Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
  },
  {
    id: "2",
    title: "API Integration",
    description: "Integrate new backend endpoints",
    status: "in-progress",
    priority: "medium",
    assignee: {
      name: "Bob Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
  },
  {
    id: "3",
    title: "User Testing",
    description: "Conduct user testing sessions",
    status: "done",
    priority: "low",
    assignee: {
      name: "Carol Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
    },
  },
];

function getPriorityColor(priority: Task["priority"]) {
  switch (priority) {
    case "high":
      return "text-red-600 bg-red-50";
    case "medium":
      return "text-yellow-600 bg-yellow-50";
    case "low":
      return "text-green-600 bg-green-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
}

function getStatusColor(status: Task["status"]) {
  switch (status) {
    case "done":
      return "text-green-600 bg-green-50 border-green-200";
    case "in-progress":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "todo":
      return "text-gray-600 bg-gray-50 border-gray-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

const TaskBoard = ({
  tasks = defaultTasks,
  onTaskMove = () => {},
  onTaskClick = () => {},
  isLoading = false,
}: TaskBoardProps) => {
  const [loading, setLoading] = useState(isLoading);

  // Simulate loading for demo purposes
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const columns = [
    {
      id: "todo",
      title: "To Do",
      color: "bg-gray-50",
      borderColor: "border-gray-200",
    },
    {
      id: "in-progress",
      title: "In Progress",
      color: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      id: "done",
      title: "Done",
      color: "bg-green-50",
      borderColor: "border-green-100",
    },
  ];

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Task["status"]) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    onTaskMove(taskId, status);
  };

  if (loading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b">
              <th className="pb-2 font-medium">Task</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Priority</th>
              <th className="pb-2 font-medium">Assignee</th>
              <th className="pb-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 text-sm animate-pulse"
              >
                <td className="py-3 pr-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </td>
                <td className="py-3 pr-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </td>
                <td className="py-3 pr-4">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </td>
                <td className="py-3 pr-4">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
                <td className="py-3">
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-xs text-gray-500 border-b">
            <th className="pb-2 font-medium">Task</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium">Priority</th>
            <th className="pb-2 font-medium">Assignee</th>
            <th className="pb-2 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b border-gray-100 text-sm">
              <td className="py-3 pr-4">
                <div className="flex items-start gap-2">
                  {task.status === "done" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  )}
                  <span
                    className={
                      task.status === "done" ? "line-through text-gray-500" : ""
                    }
                  >
                    {task.title}
                  </span>
                </div>
              </td>
              <td className="py-3 pr-4">
                <Badge
                  variant="outline"
                  className={`${getStatusColor(task.status)}`}
                >
                  {task.status === "in-progress"
                    ? "In Progress"
                    : task.status === "done"
                      ? "Done"
                      : "To Do"}
                </Badge>
              </td>
              <td className="py-3 pr-4">
                {task.priority && (
                  <Badge
                    className={`${getPriorityColor(task.priority)} border-none`}
                  >
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </Badge>
                )}
              </td>
              <td className="py-3 pr-4">
                {task.assignee && (
                  <div className="flex items-center gap-2">
                    <img
                      src={task.assignee.avatar}
                      alt={task.assignee.name}
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="text-gray-700">{task.assignee.name}</span>
                  </div>
                )}
              </td>
              <td className="py-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Assign</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskBoard;
