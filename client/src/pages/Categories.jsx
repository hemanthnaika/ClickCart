import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsByCategory } from "../api/category";
import CardSkeleton from "../components/CardSkeleton";
import Cards from "../components/Cards";
import Layout from "../Layout";
import { useSelector } from "react-redux";

const ProductsByCategory = () => {
  const { id } = useParams(); // gets :id from the URL
  const category = useSelector((state) => state.categories.categories);
  const { data, isLoading, error } = useQuery({
    queryKey: ["productsByCategory", id],
    queryFn: () => fetchProductsByCategory(id),
    enabled: !!id, // only run if id is present
  });

  if (isLoading)
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <CardSkeleton key={i} />
          ))}
      </div>
    );
  if (error) return <p className="text-red-500">Failed to load products.</p>;
  const categoryName = category.find((c) => c._id === id)?.name;
  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Showing products under{" "}
          <span className="text-indigo-600">
            {categoryName || "Unknown Category"}
          </span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.length > 0 ? (
            data.map((product) => <Cards key={product._id} product={product} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found in this category.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductsByCategory;
