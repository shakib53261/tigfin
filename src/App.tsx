import { Suspense } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Dashboard from "./components/pages/dashboard";
import Success from "./components/pages/success";
import Home from "./components/pages/home";
import ClientsPage from "./components/pages/clients";
import ClientDetailPage from "./components/pages/clients/detail";
import NewClientPage from "./components/pages/clients/new";
import EditClientPage from "./components/pages/clients/edit";
import FinancePage from "./components/pages/finance";
import InvoicesPage from "./components/pages/finance/invoices";
import InvoiceDetailPage from "./components/pages/finance/invoices/detail";
import ExpensesPage from "./components/pages/finance/expenses";
import ExpenseDetailPage from "./components/pages/finance/expenses/detail";
import ReportsPage from "./components/pages/finance/reports";
import { AuthProvider, useAuth } from "../supabase/auth";
import { Toaster } from "./components/ui/toaster";
import { LoadingScreen, LoadingSpinner } from "./components/ui/loading-spinner";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <ClientsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients/:id"
          element={
            <PrivateRoute>
              <ClientDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients/new"
          element={
            <PrivateRoute>
              <NewClientPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients/:id/edit"
          element={
            <PrivateRoute>
              <EditClientPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/finance"
          element={
            <PrivateRoute>
              <FinancePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/finance/invoices"
          element={
            <PrivateRoute>
              <InvoicesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/finance/invoices/:id"
          element={
            <PrivateRoute>
              <InvoiceDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/finance/expenses"
          element={
            <PrivateRoute>
              <ExpensesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/finance/expenses/:id"
          element={
            <PrivateRoute>
              <ExpenseDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/finance/reports"
          element={
            <PrivateRoute>
              <ReportsPage />
            </PrivateRoute>
          }
        />
        <Route path="/success" element={<Success />} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingScreen text="Loading application..." />}>
        <AppRoutes />
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
