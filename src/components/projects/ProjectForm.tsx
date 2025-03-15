import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProjectFormProps {
  isEditing?: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

const defaultTeamMembers: TeamMember[] = [
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
  {
    id: "5",
    name: "Emma Davis",
    role: "QA Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
  {
    id: "6",
    name: "Frank Miller",
    role: "DevOps Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frank",
  },
];

export default function ProjectForm({ isEditing = false }: ProjectFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [availableTeamMembers, setAvailableTeamMembers] =
    useState<TeamMember[]>(defaultTeamMembers);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    client: "",
    status: "not-started",
    startDate: "",
    dueDate: "",
    budget: "",
    teamMembers: [] as TeamMember[],
  });

  useEffect(() => {
    if (isEditing && id) {
      // Simulate fetching project data
      // In a real app, you would fetch from your API
      setFormData({
        name: "Website Redesign",
        description:
          "Complete overhaul of client website with new branding, improved user experience, and modern design elements.",
        client: "Acme Corp",
        status: "in-progress",
        startDate: "2024-03-15",
        dueDate: "2024-06-30",
        budget: "15000",
        teamMembers: [
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
        ],
      });

      // Update available team members
      updateAvailableTeamMembers([
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
      ]);
    }
  }, [isEditing, id]);

  const updateAvailableTeamMembers = (selectedMembers: TeamMember[]) => {
    const selectedIds = selectedMembers.map((member) => member.id);
    setAvailableTeamMembers(
      defaultTeamMembers.filter((member) => !selectedIds.includes(member.id)),
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTeamMember = (memberId: string) => {
    const memberToAdd = availableTeamMembers.find(
      (member) => member.id === memberId,
    );
    if (memberToAdd) {
      const updatedTeamMembers = [...formData.teamMembers, memberToAdd];
      setFormData((prev) => ({
        ...prev,
        teamMembers: updatedTeamMembers,
      }));
      updateAvailableTeamMembers(updatedTeamMembers);
    }
  };

  const handleRemoveTeamMember = (memberId: string) => {
    const memberToRemove = formData.teamMembers.find(
      (member) => member.id === memberId,
    );
    const updatedTeamMembers = formData.teamMembers.filter(
      (member) => member.id !== memberId,
    );
    setFormData((prev) => ({
      ...prev,
      teamMembers: updatedTeamMembers,
    }));

    if (memberToRemove) {
      setAvailableTeamMembers((prev) => [...prev, memberToRemove]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the project data to your API
    console.log("Submitting project data:", formData);

    toast({
      title: isEditing ? "Project updated" : "Project created",
      description: isEditing
        ? "The project has been updated successfully."
        : "The project has been created successfully.",
    });

    // Navigate back to the project list or detail page
    if (isEditing && id) {
      navigate(`/projects/${id}`);
    } else {
      navigate("/projects");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() =>
            navigate(isEditing && id ? `/projects/${id}` : "/projects")
          }
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Project" : "New Project"}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Website Redesign"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Project description"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget ($)</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="10000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Team Members</Label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 bg-gray-100 rounded-full pl-2 pr-1 py-1"
                    >
                      <span className="text-sm">{member.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-gray-200"
                        onClick={() => handleRemoveTeamMember(member.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Select
                    onValueChange={(value) => handleAddTeamMember(value)}
                    disabled={availableTeamMembers.length === 0}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Add team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTeamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name} ({member.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-1"
                    onClick={() => {}}
                  >
                    <Plus className="h-4 w-4" /> New Member
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  navigate(isEditing && id ? `/projects/${id}` : "/projects")
                }
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? "Update Project" : "Create Project"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
