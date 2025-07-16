import Layout from "../Layout";
import HeroCarousel from "../components/hero";
import Cards from "../components/Cards";
import CategoryGrid from "../components/CategoryCard";
import NewsletterCard from "../components/NewsletterCard";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import CardSkeleton from "../components/CardSkeleton";
import toast from "react-hot-toast";

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"], // unique key for caching
    queryFn: fetchProducts,
    retry: false,
    refetchOnWindowFocus: false,
  });
  if (isError) {
    toast.error(error);
  }
  return (
    <Layout>
      <HeroCarousel />
      <h1 className="text-2xl font-bold py-5">Popular Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-x-1 gap-y-5">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => <CardSkeleton key={i} />)
          : data
              ?.filter((product) => product.popular) // ✅ only popular ones
              .map((product) => <Cards key={product._id} product={product} />)}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
          Shop by Category
        </h2>
        <CategoryGrid />
      </div>

      <h1 className="text-2xl font-bold py-5 text-center ">
        Featured Products
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-x-1 gap-y-5">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => <CardSkeleton key={i} />)
          : data
              ?.filter((product) => product.featured)
              .map((product) => <Cards key={product._id} product={product} />)}
      </div>
      <div className="pt-15">
        <div className="flex flex-col md:flex-row items-center justify-around text-sm    bg-gray-100 rounded-md ">
          <div className="flex flex-col text-center md:text-left items-center md:items-start pt-14 md:p-5">
            <h2 className="md:text-4xl text-2xl font-bold text-gray-800 leading-tight">
              Upgrade Your Style.
              <br />
              Shop the Latest Trends Today.
            </h2>

            <p className="text-gray-600 mt-4 max-w-md text-lg">
              Discover exclusive offers on fashion, gadgets, and more. Your
              perfect purchase is just a click away.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <button
                type="button"
                aria-label="getStarted"
                className="bg-indigo-500 hover:bg-indigo-600 px-7 py-2.5 text-white rounded-md active:scale-95 transition-all"
              >
                Start Shopping
              </button>
              <button
                type="button"
                className="group flex items-center gap-2 px-7 py-2.5 active:scale-95 transition text-indigo-600 hover:text-indigo-800"
              >
                Browse Deals
                <svg
                  className="mt-1 group-hover:translate-x-0.5 transition-all"
                  width="15"
                  height="11"
                  viewBox="0 0 15 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <img
            className="max-w-[375px] pt-10 md:p-0"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/excitedWomenImage.png"
            alt="Excited Woman Shopping"
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold py-5 text-center">New Arrivals</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-x-1 gap-y-5">
        {isLoading
          ? Array(8)
              .fill(0)
              .map((_, i) => <CardSkeleton key={i} />)
          : data &&
            [...data]
              .reverse()
              .map((product) => <Cards key={product._id} product={product} />)}
      </div>
      <div className="pt-15">
        <div className="flex flex-col md:flex-row items-center justify-around text-sm bg-gray-100 rounded-md">
          {/* Image */}
          <img
            className="max-w-[375px] pt-10 md:p-0"
            src="https://images.unsplash.com/photo-1600489000360-34bd69182634?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fE1vZGVybiUyMEhvbWUlMjBEZWNvcnxlbnwwfDB8MHx8fDA%3D"
            alt="Modern Home Decor"
          />
          {/* Text Content */}
          <div className="flex flex-col text-center md:text-left items-center md:items-start pt-14 md:p-5">
            <h2 className="md:text-4xl text-2xl font-bold  leading-tight">
              Level Up Your Living Space.
              <br />
              Explore Home Essentials Now.
            </h2>

            <p className="text-gray-600 mt-4 max-w-md text-lg">
              From cozy furniture to smart appliances — find everything you need
              to transform your home into a sanctuary.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <button
                type="button"
                aria-label="exploreNow"
                className="bg-blue-600 hover:bg-blue-700 px-7 py-2.5 text-white rounded-md active:scale-95 transition-all"
              >
                Explore Now
              </button>
              <button
                type="button"
                className="group flex items-center gap-2 px-7 py-2.5 active:scale-95 transition text-blue-600 hover:text-blue-800"
              >
                View Collections
                <svg
                  className="mt-1 group-hover:translate-x-0.5 transition-all"
                  width="15"
                  height="11"
                  viewBox="0 0 15 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <NewsletterCard />
    </Layout>
  );
};

export default Home;
