import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Building2,
  ChevronDown,
  ClipboardList,
  CreditCard,
  DollarSign,
  FileText,
  Home,
  LayoutDashboard,
  Settings,
  Users,
  UserRound,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

function NavItem({
  icon,
  label,
  href,
  isActive = false,
  isExpanded = false,
  onClick,
  children,
}: NavItemProps) {
  return (
    <div>
      <Link
        to={href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive
            ? "bg-orange-100 text-orange-700"
            : "text-gray-700 hover:bg-gray-100",
        )}
        onClick={onClick}
      >
        <div className="flex-shrink-0">{icon}</div>
        <span className="flex-grow">{label}</span>
        {children && (
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isExpanded ? "rotate-180" : "",
            )}
          />
        )}
      </Link>
      {children && isExpanded && (
        <div className="ml-9 mt-1 space-y-1">{children}</div>
      )}
    </div>
  );
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto md:h-screen",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <Link to="/dashboard" className="flex items-center">
            <div className="bg-orange-600 text-white p-1 rounded mr-2">
              <DollarSign className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-orange-600">TigFin</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <NavItem
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
            href="/dashboard"
            isActive={location.pathname === "/dashboard"}
          />

          <NavItem
            icon={<UserRound className="h-5 w-5" />}
            label="Clients"
            href="/clients"
            isActive={location.pathname.startsWith("/clients")}
          />

          <NavItem
            icon={<DollarSign className="h-5 w-5" />}
            label="Finance"
            href="/finance"
            isActive={location.pathname.startsWith("/finance")}
            isExpanded={location.pathname.startsWith("/finance")}
          >
            <Link
              to="/finance/invoices"
              className="block py-2 px-3 text-sm text-gray-600 hover:text-orange-600 rounded-md"
            >
              Invoices
            </Link>
            <Link
              to="/finance/expenses"
              className="block py-2 px-3 text-sm text-gray-600 hover:text-orange-600 rounded-md"
            >
              Expenses
            </Link>
            <Link
              to="/finance/reports"
              className="block py-2 px-3 text-sm text-gray-600 hover:text-orange-600 rounded-md"
            >
              Reports
            </Link>
          </NavItem>

          <NavItem
            icon={<ClipboardList className="h-5 w-5" />}
            label="Projects"
            href="/projects"
            isActive={location.pathname.startsWith("/projects")}
          />

          <NavItem
            icon={<Building2 className="h-5 w-5" />}
            label="HR"
            href="/hr"
            isActive={location.pathname.startsWith("/hr")}
            isExpanded={location.pathname.startsWith("/hr")}
          >
            <Link
              to="/hr/employees"
              className="block py-2 px-3 text-sm text-gray-600 hover:text-orange-600 rounded-md"
            >
              Employees
            </Link>
            <Link
              to="/hr/time-off"
              className="block py-2 px-3 text-sm text-gray-600 hover:text-orange-600 rounded-md"
            >
              Time Off
            </Link>
            <Link
              to="/hr/performance"
              className="block py-2 px-3 text-sm text-gray-600 hover:text-orange-600 rounded-md"
            >
              Performance
            </Link>
          </NavItem>

          <div className="pt-4 mt-4 border-t border-gray-200">
            <NavItem
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              href="/settings"
              isActive={location.pathname === "/settings"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
