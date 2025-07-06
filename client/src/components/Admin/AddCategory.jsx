import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import Upload from "./addImage";
import { useState, useEffect } from "react";
import ImageKit from "../ImgKit";
import { useParams, useNavigate } from "react-router";
import { fetchCategory, updateCategory } from "../../api/category";
import { addCategory } from "../../api/addCategory";

const AddCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [cover, setCover] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
  });

  // Fetch category data if updating
  const { data: existingCategory } = useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchCategory(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (existingCategory) {
      setInitialValues({
        name: existingCategory.name || "",
        description: existingCategory.description || "",
      });
      if (existingCategory.imageUrl) {
        setCover({ filePath: existingCategory.imageUrl });
      }
    }
  }, [existingCategory]);

  const mutation = useMutation({
    mutationFn: id
      ? ({ id, data }) => updateCategory({ id, data })
      : addCategory,
    onSuccess: (data) => {
      toast.success(
        data.message || (id ? "Category updated" : "Category added")
      );
      navigate("/admin/all-categories");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      imageUrl: cover.filePath || "",
    };

    if (!payload.imageUrl) {
      return toast.error("Please upload an image.");
    }

    if (id) {
      mutation.mutate({ id, data: payload });
    } else {
      mutation.mutate(payload);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-semibold mb-6">
        {id ? "Update Category" : "Add New Category"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            className="w-full border px-3 py-2 rounded"
            required
            defaultValue={initialValues.name}
          />
        </div>

        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <label>
            <img
              className="max-w-24 cursor-pointer"
              src={
                cover?.filePath ||
                "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
              }
              alt="uploadArea"
              width={100}
              height={100}
            />
          </label>
        </Upload>

        {cover?.filePath && (
          <ImageKit
            className="w-full h-32 object-cover"
            src={cover.filePath}
            alt="Preview"
            w="800"
          />
        )}

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            className="w-full border px-3 py-2 rounded"
            rows="3"
            defaultValue={initialValues.description}
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
          className={`px-4 py-2 text-white rounded transition 
            ${
              mutation.isPending || (progress > 0 && progress < 100)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }
          `}
        >
          {mutation.isPending
            ? id
              ? "Updating..."
              : "Submitting..."
            : progress > 0 && progress < 100
            ? `Uploading (${progress}%)...`
            : id
            ? "Update Category"
            : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
