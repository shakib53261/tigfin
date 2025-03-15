import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNotifications } from "./NotificationProvider";

const NotificationDemo = () => {
  const { addNotification } = useNotifications();

  const createPaymentNotification = () => {
    addNotification({
      type: "payment",
      title: "New Invoice Paid",
      description: "Invoice #INV-2024-042 has been paid by Design Masters.",
    });
  };

  const createProjectNotification = () => {
    addNotification({
      type: "project",
      title: "Project Update",
      description:
        "Mobile App Development project has been updated to 60% completion.",
    });
  };

  const createApprovalNotification = () => {
    addNotification({
      type: "approval",
      title: "New Approval Request",
      description: "Michael Chen submitted an expense of $175 for approval.",
      actionRequired: true,
    });
  };

  const createSystemNotification = () => {
    addNotification({
      type: "system",
      title: "System Update",
      description: "TigFin will be updated with new features on June 15th.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Testing</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          Use these buttons to test the notification system. Click on each
          button to generate a different type of notification.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            onClick={createPaymentNotification}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Create Payment Notification
          </Button>
          <Button
            onClick={createProjectNotification}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Project Notification
          </Button>
          <Button
            onClick={createApprovalNotification}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Create Approval Request
          </Button>
          <Button
            onClick={createSystemNotification}
            className="bg-gray-600 hover:bg-gray-700 text-white"
          >
            Create System Notification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationDemo;
