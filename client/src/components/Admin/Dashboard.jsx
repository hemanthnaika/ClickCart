import { useQuery } from "@tanstack/react-query";
import { fetchTotal } from "../../api/user";
import { toast } from "react-hot-toast";
import { Link } from "react-router";

const Dashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["total"],
    queryFn: fetchTotal,
    retry: false,
    refetchOnWindowFocus: false,
  });
  if (isError) {
    toast.error(error.message);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Overview</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Total Orders",
            value: data?.orders,
            link: "/admin/all-orders",
          },
          {
            title: "Total Categories",
            value: data?.categories,
            link: "/admin/all-categories",
          },
          {
            title: "Total Products",
            value: data?.products,
            link: "/admin/all-products",
          },
          {
            title: "Total Users",
            value: data?.users,
            link: "/admin/all-users",
          },
        ].map((stat) => (
          <Link
            to={stat.link}
            key={stat.title}
            className="bg-white p-6 rounded shadow"
          >
            <h2 className="text-lg">{stat.title}</h2>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
