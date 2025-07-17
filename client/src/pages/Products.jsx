import { useState, useMemo } from "react";
import Cards from "../components/Cards";
import Layout from "../Layout";
import { FilterIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { noData } from "../assets/img";

const Products = () => {
  const [price, setPrice] = useState(100000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const categories = useSelector((state) => state.categories.categories);
  // Get category names from Redux store
  const categoryOptions =
    useSelector((state) => state.categories.categories)?.map((category) =>
      category.name?.toLowerCase()
    ) || [];

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // const productCategory = product.category?.toLowerCase();
      const productCategory = categories
        .find((c) => c._id === product.category)
        ?.name.toLowerCase();
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(productCategory);
      const matchPrice = Number(product.price) <= price;
      return matchCategory && matchPrice;
    });
  }, [products, selectedCategories, price, categories]);

  return (
    <Layout>
      <div>
        <div className="flex md:block justify-between items-center">
          <h1 className="font-bold text-2xl text-center pb-5">All Products</h1>
          <FilterIcon
            onClick={() => setOpen(!open)}
            className="md:hidden block cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filter */}
        <div
          className={`w-full lg:w-1/5 bg-white p-5 rounded shadow-md transition-transform duration-300 ease-in-out ${
            open ? "block" : "hidden"
          } md:block`}
        >
          <h2 className="font-semibold text-lg mb-4">Filter Products</h2>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Category</h3>
            <ul className="space-y-1 text-md font-semibold text-gray-600 ">
              {categoryOptions.map((category) => (
                <li key={category}>
                  <input
                    type="checkbox"
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />{" "}
                  <label htmlFor={category} className="capitalize">
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
            <input
              type="range"
              min="0"
              max="100000"
              step="100"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-1">Up to ₹{price}</p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full lg:w-4/5">
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : filteredProducts.length === 0 ? (
            <img src={noData}  className="w-1/2 mx-auto"/>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <Cards key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
