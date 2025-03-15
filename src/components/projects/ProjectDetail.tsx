import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  Trash2,
  Plus,
  Users,
  FileText,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Building,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "not-started" | "in-progress" | "on-hold" | "completed";
  progress: number;
  startDate: string;
  dueDate: string;
  client: string;
  budget: number;
  spent: number;
  team: Array<{
    id: string;
    name: string;
    role: string;
    avatar: string;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    status: "todo" | "in-progress" | "completed";
    assignee: string;
    dueDate: string;
  }>;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    date: string;
    size: string;
  }>;
}

const mockProject: Project = {
  id: "PRJ-001",
  name: "Website Redesign",
  description:
    "Complete overhaul of client website with new branding, improved user experience, and modern design elements. The project includes responsive design, SEO optimization, and content management system implementation.",
  status: "in-progress",
  progress: 65,
  startDate: "2024-03-15",
  dueDate: "2024-06-30",
  client: "Acme Corp",
  budget: 15000,
  spent: 9750,
  team: [
    {
      id: "1",
      name: "Alice Smith",
      role: "Project Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
    {
      id: "2",
      name: "Bob Johnson",
      role: "UI/UX Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
    {
      id: "3",
      name: "Carol Williams",
      role: "Frontend Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
    },
    {
      id: "4",
      name: "David Brown",
      role: "Backend Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
  ],
  tasks: [
    {
      id: "task-1",
      title: "Wireframe Design",
      status: "completed",
      assignee: "Bob Johnson",
      dueDate: "2024-03-30",
    },
    {
      id: "task-2",
      title: "UI Design",
      status: "completed",
      assignee: "Bob Johnson",
      dueDate: "2024-04-15",
    },
    {
      id: "task-3",
      title: "Frontend Development",
      status: "in-progress",
      assignee: "Carol Williams",
      dueDate: "2024-05-20",
    },
    {
      id: "task-4",
      title: "Backend Integration",
      status: "in-progress",
      assignee: "David Brown",
      dueDate: "2024-05-30",
    },
    {
      id: "task-5",
      title: "Content Migration",
      status: "todo",
      assignee: "Alice Smith",
      dueDate: "2024-06-10",
    },
    {
      id: "task-6",
      title: "Testing & QA",
      status: "todo",
      assignee: "Carol Williams",
      dueDate: "2024-06-20",
    },
  ],
  documents: [
    {
      id: "doc-1",
      name: "Project Proposal",
      type: "PDF",
      date: "2024-03-10",
      size: "2.4 MB",
    },
    {
      id: "doc-2",
      name: "Design Mockups",
      type: "ZIP",
      date: "2024-04-05",
      size: "15.8 MB",
    },
    {
      id: "doc-3",
      name: "Technical Specifications",
      type: "DOCX",
      date: "2024-04-12",
      size: "1.2 MB",
    },
    {
      id: "doc-4",
      name: "Client Feedback",
      type: "PDF",
      date: "2024-05-02",
      size: "0.8 MB",
    },
  ],
};

const getStatusColor = (status: Project["status"]) => {
  switch (status) {
    case "not-started":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "on-hold":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getTaskStatusColor = (status: "todo" | "in-progress" | "completed") => {
  switch (status) {
    case "todo":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getProgressColor = (progress: number) => {
  if (progress >= 100) return "bg-green-500";
  if (progress >= 60) return "bg-blue-500";
  if (progress >= 30) return "bg-yellow-500";
  return "bg-gray-500";
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project] = useState<Project | null>(mockProject); // In a real app, fetch project by ID

  if (!project) {
    return (
      <div className="p-8 text-center">
        <p>Project not found</p>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => navigate("/projects")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
        </Button>
      </div>
    );
  }

  // Calculate task statistics
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(
    (task) => task.status === "completed",
  ).length;
  const inProgressTasks = project.tasks.filter(
    (task) => task.status === "in-progress",
  ).length;
  const todoTasks = project.tasks.filter(
    (task) => task.status === "todo",
  ).length;

  // Calculate budget statistics
  const budgetPercentage = (project.spent / project.budget) * 100;
  const budgetRemaining = project.budget - project.spent;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigate("/projects")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
          <Button
            onClick={() => navigate(`/projects/${id}/edit`)}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Edit className="h-4 w-4 mr-2" /> Edit Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Info Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {project.name}
              </h2>
              <p className="text-gray-500">{project.client}</p>
              <Badge
                variant="outline"
                className={`mt-2 ${getStatusColor(project.status)}`}
              >
                {project.status
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Timeline</p>
                  <p className="text-gray-900">
                    {project.startDate} to {project.dueDate}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Client</p>
                  <p className="text-gray-900">{project.client}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BarChart3 className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Progress</p>
                  <div className="w-full mt-1">
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-gray-500">Completion</span>
                      <span className="text-gray-900">{project.progress}%</span>
                    </div>
                    <Progress
                      value={project.progress}
                      className={`h-2 ${getProgressColor(project.progress)}`}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Team Size</p>
                  <p className="text-gray-900">{project.team.length} members</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Documents</p>
                  <p className="text-gray-900">
                    {project.documents.length} files
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Card */}
        <Card className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle>Project Details</CardTitle>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="overview" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Project Stats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500">Budget</p>
                              <p className="text-xl font-bold">
                                ${project.budget.toLocaleString()}
                              </p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                              <BarChart3 className="h-5 w-5 text-orange-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500">Spent</p>
                              <p className="text-xl font-bold">
                                ${project.spent.toLocaleString()}
                              </p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <BarChart3 className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500">Remaining</p>
                              <p className="text-xl font-bold">
                                ${budgetRemaining.toLocaleString()}
                              </p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <BarChart3 className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Budget Usage</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-gray-500">Budget Usage</span>
                        <span className="text-gray-900">
                          {Math.round(budgetPercentage)}%
                        </span>
                      </div>
                      <Progress
                        value={budgetPercentage}
                        className={`h-2 ${budgetPercentage > 100 ? "bg-red-500" : "bg-blue-500"}`}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Task Progress</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500">Completed</p>
                              <p className="text-xl font-bold">
                                {completedTasks} / {totalTasks}
                              </p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500">
                                In Progress
                              </p>
                              <p className="text-xl font-bold">
                                {inProgressTasks} / {totalTasks}
                              </p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500">To Do</p>
                              <p className="text-xl font-bold">
                                {todoTasks} / {totalTasks}
                              </p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <AlertCircle className="h-5 w-5 text-gray-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Project Tasks</h3>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Plus className="h-4 w-4 mr-2" /> Add Task
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-gray-500 border-b">
                        <th className="pb-2 font-medium">Task</th>
                        <th className="pb-2 font-medium">Assignee</th>
                        <th className="pb-2 font-medium">Due Date</th>
                        <th className="pb-2 font-medium">Status</th>
                        <th className="pb-2 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.tasks.map((task) => (
                        <tr
                          key={task.id}
                          className="border-b border-gray-100 text-sm"
                        >
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              {task.status === "completed" ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <Clock className="h-4 w-4 text-gray-400" />
                              )}
                              <span
                                className={
                                  task.status === "completed"
                                    ? "line-through text-gray-500"
                                    : ""
                                }
                              >
                                {task.title}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 pr-4">{task.assignee}</td>
                          <td className="py-3 pr-4">{task.dueDate}</td>
                          <td className="py-3 pr-4">
                            <Badge
                              variant="outline"
                              className={getTaskStatusColor(task.status)}
                            >
                              {task.status
                                .split("-")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1),
                                )
                                .join(" ")}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="team" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Team Members</h3>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Plus className="h-4 w-4 mr-2" /> Add Member
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.team.map((member) => (
                    <div
                      key={member.id}
                      className="p-4 border border-gray-100 rounded-lg flex items-center gap-4"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-orange-100 text-orange-800">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {member.name}
                        </h4>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="documents" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Project Documents</h3>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Plus className="h-4 w-4 mr-2" /> Upload Document
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-gray-500 border-b">
                        <th className="pb-2 font-medium">Name</th>
                        <th className="pb-2 font-medium">Type</th>
                        <th className="pb-2 font-medium">Date</th>
                        <th className="pb-2 font-medium">Size</th>
                        <th className="pb-2 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.documents.map((doc) => (
                        <tr
                          key={doc.id}
                          className="border-b border-gray-100 text-sm"
                        >
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-400" />
                              <span>{doc.name}</span>
                            </div>
                          </td>
                          <td className="py-3 pr-4">{doc.type}</td>
                          <td className="py-3 pr-4">{doc.date}</td>
                          <td className="py-3 pr-4">{doc.size}</td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
