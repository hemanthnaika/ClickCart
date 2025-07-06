import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, deleteProduct } from "../../api/products";
import { Link } from "react-router";
import { MdDelete, MdEdit } from "react-icons/md";
import ImageKit from "../ImgKit";
import toast from "react-hot-toast";

const AllProduct = () => {
  const queryClient = useQueryClient();

  // Fetch all products
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Delete mutation
  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Product deleted successfully!");
    },
    onError: (error) => {
      console.error("Delete failed:", error.message);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      mutation.mutate(id);
    }
  };
  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    return toast.error(`Error: ${error.message}`, {
      duration: 3000,
    });
  }
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold">All Products</h1>
        <Link to="/admin/add-product">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Add Product
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 rounded-t-xl">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Created At</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data && data.length > 0 ? (
              data.map((product, index) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    {product?.imageUrl?.[0] ? (
                      <ImageKit
                        src={product.imageUrl[0]}
                        className={"w-20 h-20"}
                      />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td className="px-6 py-2">{product.name}</td>
                  <td className="px-6 py-2">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-2 flex items-center gap-3">
                    <Link to={`/admin/edit-product/${product._id}`}>
                      <button
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full text-blue-600 bg-blue-50 hover:bg-blue-100 transition"
                        title="Edit"
                      >
                        <MdEdit size={18} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
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
                  colSpan="5"
                  className="text-center text-gray-500 py-6 text-base"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProduct;
