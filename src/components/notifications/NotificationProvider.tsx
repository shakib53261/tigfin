import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../../../supabase/auth";
import { supabase } from "../../../supabase/supabase";

type NotificationType = "payment" | "project" | "approval" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionRequired?: boolean;
  userId?: string;
  createdAt?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  handleAction: (id: string, action: "approve" | "reject") => void;
  addNotification: (
    notification: Omit<Notification, "id" | "time" | "read">,
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

// Mock notifications for development
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
];

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const { toast } = useToast();
  const { user } = useAuth();

  // In a real app, fetch notifications from Supabase
  useEffect(() => {
    if (!user) return;

    // This would be replaced with actual Supabase fetching
    // For now, we'll use the mock data

    // Example of how you would fetch from Supabase:
    /*
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching notifications:', error);
        return;
      }
      
      if (data) {
        const formattedNotifications = data.map(notification => ({
          ...notification,
          time: formatTimeAgo(notification.created_at),
        }));
        setNotifications(formattedNotifications);
      }
    };
    
    fetchNotifications();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('public:notifications')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        const newNotification = {
          ...payload.new,
          time: formatTimeAgo(payload.new.created_at),
        };
        
        setNotifications(prev => [newNotification, ...prev]);
        
        // Show toast for new notification
        toast({
          title: newNotification.title,
          description: newNotification.description,
        });
      })
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
    */
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );

    // In a real app, update in Supabase
    /*
    if (user) {
      supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id)
        .eq('user_id', user.id);
    }
    */
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );

    // In a real app, update in Supabase
    /*
    if (user) {
      supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);
    }
    */
  };

  const handleAction = (id: string, action: "approve" | "reject") => {
    // Mark the notification as read
    markAsRead(id);

    // Find the notification to get its details
    const notification = notifications.find((n) => n.id === id);

    if (notification) {
      // Show toast confirmation
      toast({
        title: action === "approve" ? "Approved" : "Rejected",
        description: `You have ${action === "approve" ? "approved" : "rejected"} the request: ${notification.title}`,
      });

      // In a real app, update the related record in Supabase
      // For example, if it's an expense approval:
      /*
      if (notification.type === "approval" && notification.relatedId) {
        supabase
          .from('expenses')
          .update({ status: action })
          .eq('id', notification.relatedId);
      }
      */
    }
  };

  const addNotification = (
    notification: Omit<Notification, "id" | "time" | "read">,
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      time: "just now",
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // Show toast for new notification
    toast({
      title: newNotification.title,
      description: newNotification.description,
    });

    // In a real app, add to Supabase
    /*
    if (user) {
      supabase
        .from('notifications')
        .insert({
          ...notification,
          user_id: user.id,
          read: false,
          created_at: new Date().toISOString(),
        });
    }
    */
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        handleAction,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
};
