import { Suspense } from "react";
import BudgetTracking from "../../../finance/BudgetTracking";
import { LoadingSpinner } from "../../../ui/loading-spinner";

export default function BudgetsPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Budget Management
      </h1>
      <Suspense fallback={<LoadingSpinner />}>
        <BudgetTracking />
      </Suspense>
    </div>
  );
}
