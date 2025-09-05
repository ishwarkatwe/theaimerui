import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { API_ADD_POST, API_CATEGORIES } from "../utils/constants/endpoints";
import useStore from "../utils/states/notes";
import { useEffect, useState } from "react";
import { showToast } from "../utils/toastr";
import { useNavigate } from "react-router-dom";

type Form = {
  title: string;
  content: string;
  category: string;
};

const fetchCategories = async () => {
  const res = await fetch(API_CATEGORIES, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });

  return await res.json();
};

export default function App() {
  const navigate = useNavigate();
  const user = useStore((state: any) => state.user);
  const [categories, setCategories] = useState<
    {
      _id: string;
      name: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const cat = await fetchCategories();
      setCategories(cat);
    })();
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit: SubmitHandler<Form> = async (formData) => {
    setLoading(true);
    await fetch(API_ADD_POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      body: JSON.stringify({
        name: formData.title,
        description: formData.content,
        category: formData.category,
        price: 1,
        seller: user._id,
        isActive: true,
      }),
    });
    setLoading(false);
    showToast("Post added successfully");
    navigate("/account", { replace: true });
  };

  return (
    <section className="max-w-2xl mx-auto p-4">
      <Label className="text-2xl font-bold mb-4 block">Add Post</Label>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          defaultValue=""
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-red-500 text-xs">Title is required</span>
        )}

        <select
          className="p-2 border border-gray-300 rounded"
          defaultValue={""}
          {...register("category", { required: true })}
        >
          <option value={""}>--Choose--</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-red-500 text-xs">Category is required</span>
        )}

        <Textarea
          defaultValue=""
          className="h-96"
          placeholder="Content"
          {...register("content", { required: true })}
        />
        {errors.content && (
          <span className="text-red-500 text-xs">Content is required</span>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "..." : "Submit"}
        </Button>
      </form>
    </section>
  );
}
