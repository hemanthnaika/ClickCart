import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  // ✅ Fetch logged-in user's review for this product
  const { data, isLoading: isFetching } = useQuery({
    queryKey: ["myReview", productId],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/products/${productId}/my-review`,
        { withCredentials: true }
      );
      return res.data.review;
    },
  });

  const mutation = useMutation({
    mutationFn: async (review) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/products/product-review`,
        { review },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review submitted!");
      queryClient.invalidateQueries(["myReview", productId]);
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong";

      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ productId, rating, comment });
  };

  if (isFetching) return <p>Loading your review...</p>;
  if (data) {
    return (
      <div className="mt-4 p-4">
        <p className="font-semibold text-gray-800">Your Review:</p>
        <div className="flex items-center gap-1 text-yellow-500 mt-1">
          {Array.from({ length: data.rating }, (_, i) => (
            <span key={i} className="text-4xl">★</span>
          ))}
        </div>
        {data.comment && (
          <p className="text-lg mt-2 text-gray-600 ">{data.comment}</p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5"
    >
      <div className="mb-3">
        <label className="text-md font-semibold text-gray-800 block mb-1">
          Rating:
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              className={`text-4xl transition-colors ${
                (hover || rating) >= star ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="4"
        placeholder="Write your review..."
        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={mutation.isLoading}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
      >
        {mutation.isLoading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
