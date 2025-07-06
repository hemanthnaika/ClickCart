import { Link, Outlet, useLocation } from "react-router";
import { MdDashboard, MdCategory } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaEye, FaClipboardList } from "react-icons/fa";

const Admin = () => {
  const location = useLocation();

  const sidebarLinks = [
    { name: "Dashboard", path: "/admin", icon: <MdDashboard /> },
    {
      name: "Category",
      path: "/admin/all-categories",
      icon: <MdCategory />,
    },
    { name: "Product", path: "/admin/all-products", icon: <FaEye /> },
    { name: "Users", path: "/admin/all-users", icon: <FaUsers /> },
    { name: "Order", path: "/admin/all-users", icon: <FaClipboardList /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="md:w-64 w-20 bg-white border-r border-gray-200">
        <div className="pt-6">
          {sidebarLinks.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                to={item.path}
                key={index}
                className={`flex items-center py-3 px-4 gap-3 ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                    : "hover:bg-gray-100/90 text-gray-700"
                }`}
              >
                {item.icon}
                <span className="hidden md:block">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
