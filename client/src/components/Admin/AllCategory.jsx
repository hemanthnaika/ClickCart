import { MdDelete, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { deleteCategory } from "../../api/addCategory";
import { useMutation } from "@tanstack/react-query";
import { useCategory } from "../../hooks/useCategory";
import toast from "react-hot-toast";

const AllCategory = () => {
  const categories = useSelector((state) => state.categories?.categories);
  const { refetch } = useCategory();

  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      refetch();
      toast.success("Category deleted successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || "Failed to delete category");
      console.error("Delete failed:", error.message);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      mutation.mutate(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          All Categories
        </h2>
        <Link to="/admin/add-category">
          <button className="bg-blue-600 px-4 py-2 rounded-md text-white font-bold">
            Add Category
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 rounded-t-xl">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Category Name</th>
              <th className="px-6 py-4">Created At</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories && categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={category._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-2">{category.name}</td>
                  <td className="px-6 py-2">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-2 flex items-center gap-3">
                    <Link to={`/admin/edit-category/${category._id}`}>
                      <button
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full text-blue-600 bg-blue-50 hover:bg-blue-100 transition"
                        title="Edit"
                      >
                        <MdEdit size={18} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full text-red-600 bg-red-50 hover:bg-red-100 transition"
                      title="Delete"
                    >
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-500 py-6 text-base"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCategory;
