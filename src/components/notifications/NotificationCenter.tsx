import React, { useState } from "react";
import {
  Bell,
  X,
  Check,
  Clock,
  DollarSign,
  FileText,
  ClipboardList,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

type NotificationType = "payment" | "project" | "approval" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionRequired?: boolean;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onAction?: (id: string, action: "approve" | "reject") => void;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "payment",
    title: "Invoice Paid",
    description: "Invoice #INV-2023-001 has been paid by Acme Inc.",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "project",
    title: "Project Milestone Reached",
    description: "Website Redesign project has reached 75% completion.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "approval",
    title: "Expense Approval Required",
    description: "David Rodriguez submitted an expense of $230 for approval.",
    time: "3 hours ago",
    read: false,
    actionRequired: true,
  },
  {
    id: "4",
    type: "system",
    title: "System Maintenance",
    description: "Scheduled maintenance will occur on Sunday at 2 AM.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "5",
    type: "payment",
    title: "Invoice Overdue",
    description: "Invoice #INV-2023-008 for TechSolutions Ltd is now overdue.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "6",
    type: "approval",
    title: "Time Off Request",
    description: "Emma Thompson requested time off from June 15-20.",
    time: "2 days ago",
    read: false,
    actionRequired: true,
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "payment":
      return <DollarSign className="h-4 w-4 text-green-500" />;
    case "project":
      return <ClipboardList className="h-4 w-4 text-blue-500" />;
    case "approval":
      return <FileText className="h-4 w-4 text-orange-500" />;
    case "system":
      return <Clock className="h-4 w-4 text-gray-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

const NotificationItem = ({
  notification,
  onMarkAsRead,
  onAction,
}: {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
  onAction?: (id: string, action: "approve" | "reject") => void;
}) => {
  return (
    <div
      className={`p-4 border-b last:border-b-0 ${notification.read ? "bg-white" : "bg-orange-50"}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {notification.title}
            </h4>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
              {notification.time}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {notification.description}
          </p>

          {notification.actionRequired && (
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                className="h-8 bg-green-600 hover:bg-green-700 text-white"
                onClick={() => onAction?.(notification.id, "approve")}
              >
                <Check className="h-3.5 w-3.5 mr-1" /> Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => onAction?.(notification.id, "reject")}
              >
                <X className="h-3.5 w-3.5 mr-1" /> Reject
              </Button>
            </div>
          )}
        </div>

        {!notification.read && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-gray-600"
            onClick={() => onMarkAsRead?.(notification.id)}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

const NotificationCenter = ({
  notifications = mockNotifications,
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onAction = () => {},
}: NotificationCenterProps) => {
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const actionRequiredCount = notifications.filter(
    (n) => n.actionRequired,
  ).length;

  const paymentNotifications = notifications.filter(
    (n) => n.type === "payment",
  );
  const projectNotifications = notifications.filter(
    (n) => n.type === "project",
  );
  const approvalNotifications = notifications.filter(
    (n) => n.type === "approval",
  );
  const systemNotifications = notifications.filter((n) => n.type === "system");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[380px] p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <Badge
                variant="outline"
                className="bg-orange-50 text-orange-600 border-orange-200"
              >
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-8"
              onClick={onMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b px-4">
              <TabsTrigger
                value="all"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:shadow-none"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:shadow-none"
              >
                Payments
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:shadow-none"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="approvals"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:shadow-none"
              >
                Approvals
                {actionRequiredCount > 0 && (
                  <Badge className="ml-1 bg-orange-500 text-white">
                    {actionRequiredCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[400px]">
            <TabsContent value="all" className="m-0">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={onMarkAsRead}
                    onAction={onAction}
                  />
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No notifications
                </div>
              )}
            </TabsContent>

            <TabsContent value="payments" className="m-0">
              {paymentNotifications.length > 0 ? (
                paymentNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={onMarkAsRead}
                    onAction={onAction}
                  />
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No payment notifications
                </div>
              )}
            </TabsContent>

            <TabsContent value="projects" className="m-0">
              {projectNotifications.length > 0 ? (
                projectNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={onMarkAsRead}
                    onAction={onAction}
                  />
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No project notifications
                </div>
              )}
            </TabsContent>

            <TabsContent value="approvals" className="m-0">
              {approvalNotifications.length > 0 ? (
                approvalNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={onMarkAsRead}
                    onAction={onAction}
                  />
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No approval notifications
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
