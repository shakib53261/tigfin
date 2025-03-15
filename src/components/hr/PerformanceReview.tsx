import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar, Star, Plus, ChevronRight } from "lucide-react";

interface PerformanceReview {
  id: string;
  employeeName: string;
  employeeAvatar?: string;
  position: string;
  reviewType: "quarterly" | "annual" | "probation" | "promotion";
  reviewDate: string;
  status: "scheduled" | "in-progress" | "completed" | "overdue";
  overallRating?: number;
  skillRatings?: {
    skill: string;
    rating: number;
  }[];
}

const mockReviews: PerformanceReview[] = [
  {
    id: "1",
    employeeName: "Jane Smith",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    position: "Senior Developer",
    reviewType: "quarterly",
    reviewDate: "2023-06-15",
    status: "completed",
    overallRating: 4.5,
    skillRatings: [
      { skill: "Technical Skills", rating: 4.7 },
      { skill: "Communication", rating: 4.2 },
      { skill: "Teamwork", rating: 4.5 },
      { skill: "Problem Solving", rating: 4.8 },
    ],
  },
  {
    id: "2",
    employeeName: "John Doe",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    position: "Project Manager",
    reviewType: "annual",
    reviewDate: "2023-07-10",
    status: "in-progress",
  },
  {
    id: "3",
    employeeName: "Emily Johnson",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    position: "UX Designer",
    reviewType: "probation",
    reviewDate: "2023-07-05",
    status: "overdue",
  },
  {
    id: "4",
    employeeName: "Michael Brown",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    position: "Financial Analyst",
    reviewType: "quarterly",
    reviewDate: "2023-08-15",
    status: "scheduled",
  },
  {
    id: "5",
    employeeName: "Sarah Wilson",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    position: "HR Specialist",
    reviewType: "promotion",
    reviewDate: "2023-06-30",
    status: "completed",
    overallRating: 4.8,
    skillRatings: [
      { skill: "Leadership", rating: 4.9 },
      { skill: "Communication", rating: 4.7 },
      { skill: "Initiative", rating: 4.8 },
      { skill: "Domain Knowledge", rating: 4.6 },
    ],
  },
];

export default function PerformanceReview() {
  const [activeTab, setActiveTab] = useState("all");
  const [reviews, setReviews] = useState<PerformanceReview[]>(mockReviews);

  const filteredReviews =
    activeTab === "all"
      ? reviews
      : reviews.filter((review) => review.status === activeTab);

  const getReviewTypeColor = (type: PerformanceReview["reviewType"]) => {
    switch (type) {
      case "quarterly":
        return "bg-blue-100 text-blue-800";
      case "annual":
        return "bg-purple-100 text-purple-800";
      case "probation":
        return "bg-yellow-100 text-yellow-800";
      case "promotion":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: PerformanceReview["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-gray-100 text-gray-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : i < rating ? "text-yellow-400 fill-yellow-400 opacity-50" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Performance Reviews
        </h2>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Review
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card
            key={review.id}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center space-x-3 mb-3 md:mb-0">
                  <Avatar className="h-10 w-10 border-2 border-orange-100">
                    <AvatarImage
                      src={review.employeeAvatar}
                      alt={review.employeeName}
                    />
                    <AvatarFallback className="bg-orange-100 text-orange-800">
                      {review.employeeName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{review.employeeName}</h3>
                    <p className="text-sm text-gray-500">{review.position}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                  <Badge className={getReviewTypeColor(review.reviewType)}>
                    {review.reviewType.charAt(0).toUpperCase() +
                      review.reviewType.slice(1)}
                  </Badge>

                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(review.reviewDate)}</span>
                  </div>

                  <Badge className={getStatusColor(review.status)}>
                    {review.status
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Badge>
                </div>
              </div>

              {review.status === "completed" && review.overallRating && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Overall Rating</h4>
                    {renderStars(review.overallRating)}
                  </div>

                  {review.skillRatings && (
                    <div className="mt-3 space-y-2">
                      {review.skillRatings.map((skill, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-5 gap-2 items-center"
                        >
                          <span className="col-span-2 text-sm">
                            {skill.skill}
                          </span>
                          <Progress
                            value={skill.rating * 20}
                            className="col-span-2"
                          />
                          <span className="text-sm text-right">
                            {skill.rating.toFixed(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredReviews.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No performance reviews found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
