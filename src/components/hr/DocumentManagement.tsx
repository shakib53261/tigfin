import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  FileText,
  Download,
  Eye,
  Calendar,
  User,
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  category: "policy" | "contract" | "form" | "personal" | "training";
  uploadDate: string;
  fileSize: string;
  fileType: string;
  employeeName?: string;
  status?: "active" | "archived" | "draft";
}

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Employee Handbook 2023",
    category: "policy",
    uploadDate: "2023-01-15",
    fileSize: "2.4 MB",
    fileType: "PDF",
    status: "active",
  },
  {
    id: "2",
    title: "Employment Contract - John Doe",
    category: "contract",
    uploadDate: "2023-03-10",
    fileSize: "1.2 MB",
    fileType: "DOCX",
    employeeName: "John Doe",
    status: "active",
  },
  {
    id: "3",
    title: "Expense Reimbursement Form",
    category: "form",
    uploadDate: "2023-05-20",
    fileSize: "0.5 MB",
    fileType: "PDF",
    status: "active",
  },
  {
    id: "4",
    title: "Performance Review Template",
    category: "form",
    uploadDate: "2023-02-28",
    fileSize: "0.8 MB",
    fileType: "DOCX",
    status: "active",
  },
  {
    id: "5",
    title: "Confidentiality Agreement",
    category: "policy",
    uploadDate: "2023-04-05",
    fileSize: "1.0 MB",
    fileType: "PDF",
    status: "active",
  },
  {
    id: "6",
    title: "Training Certificate - Emily Johnson",
    category: "training",
    uploadDate: "2023-06-12",
    fileSize: "3.2 MB",
    fileType: "PDF",
    employeeName: "Emily Johnson",
    status: "active",
  },
  {
    id: "7",
    title: "Medical Insurance Form",
    category: "personal",
    uploadDate: "2023-01-30",
    fileSize: "0.7 MB",
    fileType: "PDF",
    status: "archived",
  },
];

export default function DocumentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);

  const filteredDocuments = documents
    .filter(
      (doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.employeeName &&
          doc.employeeName.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .filter((doc) => activeTab === "all" || doc.category === activeTab);

  const getCategoryColor = (category: Document["category"]) => {
    switch (category) {
      case "policy":
        return "bg-blue-100 text-blue-800";
      case "contract":
        return "bg-purple-100 text-purple-800";
      case "form":
        return "bg-green-100 text-green-800";
      case "personal":
        return "bg-yellow-100 text-yellow-800";
      case "training":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFileTypeIcon = (fileType: string) => {
    return <FileText className="h-5 w-5" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Document Management
        </h2>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search documents..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs
          defaultValue="all"
          className="w-full md:w-auto"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="policy">Policies</TabsTrigger>
            <TabsTrigger value="contract">Contracts</TabsTrigger>
            <TabsTrigger value="form">Forms</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-3">
        {filteredDocuments.map((document) => (
          <Card
            key={document.id}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-md">
                    {getFileTypeIcon(document.fileType)}
                  </div>
                  <div>
                    <h3 className="font-medium">{document.title}</h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span>
                        {document.fileType} • {document.fileSize}
                      </span>
                      <Badge className={getCategoryColor(document.category)}>
                        {document.category.charAt(0).toUpperCase() +
                          document.category.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:ml-2">View</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:ml-2">
                      Download
                    </span>
                  </Button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Uploaded: {formatDate(document.uploadDate)}</span>
                </div>

                {document.employeeName && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Employee: {document.employeeName}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredDocuments.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No documents found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
