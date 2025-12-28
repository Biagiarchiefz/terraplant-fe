import { LayoutDashboard, Leaf, Package, Users } from "lucide-react";

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    showInMenu: true,  
  },
  {
    path: "/admin/users",
    label: "Users",
    icon: Users,
    showInMenu: true,
  },  
   {
    path: "/admin/plants",
    label: "Plants",
    icon: Leaf,
    showInMenu: true,
  },
  {
    path: "/admin/orders",
    label: "Orders",
    icon: Package,
    showInMenu: true,
  },
  {
    path: "/admin/orders/:id",
    label: "Detail Order",
    showInMenu: false,  
  }
];