import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Filter, MoreHorizontal, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "not-started" | "in-progress" | "on-hold" | "completed";
  progress: number;
  dueDate: string;
  client: string;
  team: Array<{
    name: string;
    avatar: string;
  }>;
}

interface ProjectListProps {
  projects?: Project[];
  isLoading?: boolean;
}

const defaultProjects: Project[] = [
  {
    id: "PRJ-001",
    name: "Website Redesign",
    description: "Complete overhaul of client website with new branding",
    status: "in-progress",
    progress: 65,
    dueDate: "2024-06-30",
    client: "Acme Corp",
    team: [
      {
        name: "Alice Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      },
      {
        name: "Bob Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      },
      {
        name: "Carol Williams",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
      },
    ],
  },
  {
    id: "PRJ-002",
    name: "Mobile App Development",
    description: "iOS and Android app for customer engagement",
    status: "in-progress",
    progress: 40,
    dueDate: "2024-08-15",
    client: "Globex Inc",
    team: [
      {
        name: "David Brown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      },
      {
        name: "Emma Davis",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      },
    ],
  },
  {
    id: "PRJ-003",
    name: "Brand Identity Package",
    description: "Logo, style guide, and brand assets",
    status: "completed",
    progress: 100,
    dueDate: "2024-04-10",
    client: "Stark Industries",
    team: [
      {
        name: "Frank Miller",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frank",
      },
    ],
  },
  {
    id: "PRJ-004",
    name: "E-commerce Integration",
    description: "Shopify integration with existing website",
    status: "on-hold",
    progress: 25,
    dueDate: "2024-07-20",
    client: "Wayne Enterprises",
    team: [
      {
        name: "Grace Lee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
      },
      {
        name: "Henry Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry",
      },
    ],
  },
  {
    id: "PRJ-005",
    name: "Marketing Campaign",
    description: "Q3 digital marketing campaign",
    status: "not-started",
    progress: 0,
    dueDate: "2024-09-01",
    client: "Oscorp",
    team: [
      {
        name: "Irene Garcia",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Irene",
      },
    ],
  },
];

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

const getProgressColor = (progress: number) => {
  if (progress >= 100) return "bg-green-500";
  if (progress >= 60) return "bg-blue-500";
  if (progress >= 30) return "bg-yellow-500";
  return "bg-gray-500";
};

export default function ProjectList({
  projects = defaultProjects,
  isLoading = false,
}: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
                className="pl-9 h-10"
                disabled
              />
            </div>
            <Button disabled>
              <Plus className="h-4 w-4 mr-2" /> New Project
            </Button>
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="p-4 border border-gray-100 rounded-lg animate-pulse"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="h-5 bg-gray-200 rounded w-40 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-60" />
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-24" />
                </div>
                <div className="h-2 bg-gray-200 rounded mb-4" />
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={j}
                        className="w-8 h-8 rounded-full bg-gray-200"
                      />
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects</CardTitle>
        <Button
          className="bg-orange-600 hover:bg-orange-700 text-white"
          onClick={() => navigate("/projects/new")}
        >
          <Plus className="h-4 w-4 mr-2" /> New Project
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              className="pl-9 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="space-y-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No projects found</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 border border-gray-100 rounded-lg hover:border-orange-200 hover:bg-orange-50/30 transition-colors cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Client: {project.client}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`mt-2 md:mt-0 ${getStatusColor(project.status)}`}
                  >
                    {project.status
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {project.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-gray-900">{project.progress}%</span>
                  </div>
                  <Progress
                    value={project.progress}
                    className={`h-2 ${getProgressColor(project.progress)}`}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex -space-x-2 mb-2 sm:mb-0">
                    {project.team.map((member, i) => (
                      <Avatar key={i} className="h-8 w-8 border-2 border-white">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-orange-100 text-orange-800">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Due: {project.dueDate}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/projects/${project.id}/edit`);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/projects/${project.id}/tasks`);
                          }}
                        >
                          Manage Tasks
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle delete
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
