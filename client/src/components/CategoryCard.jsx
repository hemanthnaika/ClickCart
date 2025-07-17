import { useSelector } from "react-redux";
import { Link } from "react-router";
import ImageKit from "./ImgKit";
import SkeletonCard from "./SkeletonCard";

const CategoryCard = ({ _id, name, imageUrl }) => (
  <Link to={`/categories/${_id}`}>
    <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col justify-start items-center h-full group cursor-pointer transition-all duration-300">
      <div className="relative w-full h-64 overflow-hidden">
        <ImageKit
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition duration-300 group-hover:brightness-75 hover:scale-105"
        />
        <h3 className="text-lg font-semibold text-gray-800 bg-white rounded-md px-5 py-2 text-center absolute bottom-10 md:left-10 left-1">
          {name}
        </h3>
      </div>
    </div>
  </Link>
);

export default function CategoryGrid() {
  const categories = useSelector((state) => state.categories.categories);

  const isLoading = !categories || categories.length === 0;

  const cardsToRender = isLoading
    ? new Array(6).fill(null)
    : categories.slice(0, 6); // handle if fewer than 6 categories

  return (
    <div className="p-4 w-full">
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {cardsToRender.map((category, index) => {
          const gridStyles = [
            "lg:col-span-2 lg:row-span-3",
            "lg:col-start-3 lg:row-span-3",
            "lg:col-start-4 lg:row-span-3",
            "lg:col-start-3 lg:col-span-2 lg:row-start-4 lg:row-span-3",
            "lg:col-start-1 lg:row-start-4 lg:row-span-3",
            "lg:col-start-2 lg:row-start-4 lg:row-span-3",
          ];

          return (
            <div key={index} className={gridStyles[index]}>
              {isLoading ? <SkeletonCard /> : <CategoryCard {...category} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
