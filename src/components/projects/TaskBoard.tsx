import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  MoreHorizontal,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
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
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  assignee: {
    id: string;
    name: string;
    avatar: string;
  };
}

interface TaskBoardProps {
  projectId?: string;
  tasks?: Task[];
  onTaskMove?: (taskId: string, newStatus: Task["status"]) => void;
  onTaskEdit?: (taskId: string) => void;
  onTaskDelete?: (taskId: string) => void;
  onAddTask?: () => void;
}

const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Wireframe Design",
    description: "Create wireframes for all main pages",
    status: "completed",
    priority: "high",
    dueDate: "2024-03-30",
    assignee: {
      id: "2",
      name: "Bob Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
  },
  {
    id: "task-2",
    title: "UI Design",
    description: "Create high-fidelity designs based on wireframes",
    status: "completed",
    priority: "high",
    dueDate: "2024-04-15",
    assignee: {
      id: "2",
      name: "Bob Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
  },
  {
    id: "task-3",
    title: "Frontend Development",
    description: "Implement responsive frontend based on designs",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-05-20",
    assignee: {
      id: "3",
      name: "Carol Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
    },
  },
  {
    id: "task-4",
    title: "Backend Integration",
    description: "Connect frontend to backend APIs",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-05-30",
    assignee: {
      id: "4",
      name: "David Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
  },
  {
    id: "task-5",
    title: "Content Migration",
    description: "Migrate content from old website to new platform",
    status: "todo",
    priority: "low",
    dueDate: "2024-06-10",
    assignee: {
      id: "1",
      name: "Alice Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
  },
  {
    id: "task-6",
    title: "Testing & QA",
    description: "Perform comprehensive testing across all browsers",
    status: "todo",
    priority: "high",
    dueDate: "2024-06-20",
    assignee: {
      id: "3",
      name: "Carol Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
    },
  },
];

const getStatusIcon = (status: Task["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "in-progress":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "todo":
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
    default:
      return null;
  }
};

const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function TaskBoard({
  projectId,
  tasks = mockTasks,
  onTaskMove = () => {},
  onTaskEdit = () => {},
  onTaskDelete = () => {},
  onAddTask = () => {},
}: TaskBoardProps) {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const columns = [
    {
      id: "todo" as const,
      title: "To Do",
      icon: <AlertCircle className="h-4 w-4 text-gray-500" />,
      tasks: tasks.filter((task) => task.status === "todo"),
    },
    {
      id: "in-progress" as const,
      title: "In Progress",
      icon: <Clock className="h-4 w-4 text-blue-500" />,
      tasks: tasks.filter((task) => task.status === "in-progress"),
    },
    {
      id: "completed" as const,
      title: "Completed",
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
      tasks: tasks.filter((task) => task.status === "completed"),
    },
  ];

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, columnId: Task["status"]) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId && draggedTaskId) {
      onTaskMove(taskId, columnId);
      setDraggedTaskId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Task Board</h2>
        <Button
          onClick={onAddTask}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center gap-2">
              {column.icon}
              <h3 className="font-medium">{column.title}</h3>
              <Badge variant="outline" className="ml-2">
                {column.tasks.length}
              </Badge>
            </div>

            <div
              className={`bg-gray-50 p-2 rounded-lg min-h-[300px] border-2 ${draggedTaskId ? "border-dashed border-gray-300" : "border-transparent"}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {column.tasks.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                  No tasks
                </div>
              ) : (
                <div className="space-y-2">
                  {column.tasks.map((task) => (
                    <Card
                      key={task.id}
                      className="cursor-grab active:cursor-grabbing"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(task.status)}
                            <h4 className="font-medium text-sm">
                              {task.title}
                            </h4>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                              >
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => onTaskEdit(task.id)}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => onTaskDelete(task.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                          {task.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={task.assignee.avatar}
                                alt={task.assignee.name}
                              />
                              <AvatarFallback className="text-xs bg-orange-100 text-orange-800">
                                {task.assignee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-600">
                              {task.assignee.name.split(" ")[0]}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${getPriorityColor(task.priority)}`}
                            >
                              {task.priority}
                            </Badge>
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              {task.dueDate}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
