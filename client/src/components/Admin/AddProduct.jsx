import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Upload from "./addImage";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ImageKit from "../ImgKit";
import { addProduct, fetchProduct, updateProduct } from "../../api/products";

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories);
  const [progress, setProgress] = useState(0);
  const [cover, setCover] = useState([null, null, null, null]);

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });

  const [isPopular, setIsPopular] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  // Fetch product if editing
  const { data: existingProduct } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (existingProduct) {
      setInitialValues({
        name: existingProduct.name || "",
        description: existingProduct.description || "",
        category: existingProduct.category || "",
        price: existingProduct.price || "",
        stock: existingProduct.stock || "",
      });

      setIsPopular(existingProduct.popular || false);
      setIsFeatured(existingProduct.featured || false);

      setCover(
        existingProduct.imageUrl?.map((url) => ({
          filePath: url,
        })) || [null, null, null, null]
      );
    }
  }, [existingProduct]);

  const mutation = useMutation({
    mutationFn: id ? ({ id, data }) => updateProduct({ id, data }) : addProduct,
    onSuccess: (data) => {
      toast.success(data.message || "Success!");
      navigate("/admin/all-products");
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";
      toast.error(msg);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const images = cover
      .filter((img) => img?.filePath)
      .map((img) => img.filePath);

    if (images.length === 0) {
      return toast.error("Please upload at least one product image.");
    }

    const productData = {
      name: formData.get("product-name"),
      description: formData.get("product-description"),
      category: formData.get("category"),
      price: formData.get("product-price"),
      stock: formData.get("product-stock"),
      imageUrl: images,
      popular: isPopular,
      featured: isFeatured,
    };

    if (id) {
      mutation.mutate({ id, data: productData });
    } else {
      mutation.mutate(productData);
    }
  };

  const handleImageUpload = (index, fileData) => {
    const updatedImages = [...cover];
    updatedImages[index] = fileData;
    setCover(updatedImages);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="py-10 flex flex-col justify-between bg-white shadow-md rounded-md">
        <form
          className="md:p-10 p-4 space-y-5 max-w-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <p className="text-base font-medium">Product Images</p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {Array(4)
                .fill("")
                .map((_, index) => (
                  <Upload
                    key={index}
                    type="image"
                    setProgress={setProgress}
                    setData={(fileData) => handleImageUpload(index, fileData)}
                  >
                    <label>
                      <ImageKit
                        className="max-w-24 cursor-pointer rounded border"
                        src={
                          cover[index]?.filePath ||
                          "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                        }
                        alt="uploadArea"
                        width={100}
                        height={100}
                      />
                    </label>
                  </Upload>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="product-name">
              Product Name
            </label>
            <input
              name="product-name"
              type="text"
              defaultValue={initialValues.name}
              placeholder="Type here"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>

          <div className="flex flex-col gap-1 max-w-md">
            <label
              className="text-base font-medium"
              htmlFor="product-description"
            >
              Product Description
            </label>
            <textarea
              name="product-description"
              rows={4}
              defaultValue={initialValues.description}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
              placeholder="Type here"
            ></textarea>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              name="category"
              required
              defaultValue={initialValues.category}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            >
              <option value="">Select Category</option>
              {categories?.categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="popular"
                id="popular"
                className="w-4 h-4"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
              />
              <label htmlFor="popular" className="text-sm font-medium">
                Mark as Popular
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                className="w-4 h-4"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Mark as Featured
              </label>
            </div>
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex-1 flex flex-col gap-1 w-32">
              <label className="text-base font-medium" htmlFor="product-price">
                Product Price
              </label>
              <input
                name="product-price"
                type="number"
                defaultValue={initialValues.price}
                placeholder="0"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1 w-32">
              <label className="text-base font-medium" htmlFor="product-stock">
                Stock
              </label>
              <input
                name="product-stock"
                type="number"
                defaultValue={initialValues.stock}
                placeholder="0"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                required
              />
            </div>
          </div>

          <button
            disabled={mutation.isPending || (progress > 0 && progress < 100)}
            className={`px-8 py-2.5 text-white font-medium rounded transition ${
              mutation.isPending || (progress > 0 && progress < 100)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            {mutation.isPending
              ? id
                ? "Updating..."
                : "Submitting..."
              : progress > 0 && progress < 100
              ? `Uploading (${progress}%)...`
              : id
              ? "Update Product"
              : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
