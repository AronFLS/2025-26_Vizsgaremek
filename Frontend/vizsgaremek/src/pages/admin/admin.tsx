import { useEffect, useState } from "react";
import "./admin.css";
import { axiosInstance } from "../../axios";
import { useMutation, useQuery } from "@tanstack/react-query";

interface Category {
  id: number;
  name: string;
}

interface Spec {
  id: number;
  name: string;
}

function Admin() {
  const [name, setName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [storageQuantity, setStorageQuantity] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [selectedSpecIds, setSelectedSpecIds] = useState<number[]>([]);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => axiosInstance.get("/api/categories").then((r) => r.data),
  });

  const { data: specs } = useQuery<Spec[]>({
    queryKey: ["specs"],
    queryFn: () => axiosInstance.get("/Spec").then((r) => r.data),
  });
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { mutateAsync: registerAsync, isPending } = useMutation({
    mutationFn: () => {
      const parsedDiscount = parseFloat(discount);
      return axiosInstance
        .post("/api/products", {
          name,
          imageUrl,
          price: parseFloat(price),
          description,
          discount: isNaN(parsedDiscount) ? 0 : parsedDiscount,
          storageQuantity: parseInt(storageQuantity, 10),
          categoryId: parseInt(categoryId, 10),
          specIds: selectedSpecIds,
        })
        .then((resp) => resp.data);
    },
  });

  useEffect(() => {
    document.body.classList.add("account-page");

    return () => {
      document.body.classList.remove("account-page");
    };
  }, []);

  const toggleSpec = (id: number) => {
    setSelectedSpecIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      await registerAsync();
      setSuccessMessage("Product added successfully!");
      setName("");
      setImageUrl("");
      setPrice("");
      setDescription("");
      setDiscount("");
      setStorageQuantity("");
      setCategoryId("");
      setSelectedSpecIds([]);
    } catch (err: unknown) {
      const axiosErr = err as {
        response?: { status?: number; data?: unknown };
      };
      console.error(
        "POST /api/products failed:",
        axiosErr?.response?.status,
        axiosErr?.response?.data,
      );
      const data = axiosErr?.response?.data;
      const message =
        (typeof data === "object" && data !== null && "message" in data
          ? (data as { message?: string }).message
          : typeof data === "string"
            ? data
            : undefined) ?? "Registration failed. Please try again.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin — Add Product</h1>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Product name"
          />
        </div>

        <div className="admin-field">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            placeholder="https://..."
          />
        </div>

        <div className="admin-row">
          <div className="admin-field">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="0"
            />
          </div>

          <div className="admin-field">
            <label htmlFor="discount">Discount (%)</label>
            <input
              id="discount"
              name="discount"
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="admin-field">
            <label htmlFor="storageQuantity">Stock Quantity</label>
            <input
              id="storageQuantity"
              name="storageQuantity"
              type="number"
              min="0"
              value={storageQuantity}
              onChange={(e) => setStorageQuantity(e.target.value)}
              required
              placeholder="0"
            />
          </div>
        </div>

        <div className="admin-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="Product description"
          />
        </div>

        <div className="admin-row">
          <div className="admin-field">
            <label htmlFor="categoryId">Category</label>
            <select
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select category…</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin-field">
          <label>Specs</label>
          <div className="admin-specs">
            {specs?.map((s) => (
              <label key={s.id} className="admin-spec-option">
                <input
                  type="checkbox"
                  checked={selectedSpecIds.includes(s.id)}
                  onChange={() => toggleSpec(s.id)}
                />
                {s.name}
              </label>
            ))}
          </div>
        </div>

        {successMessage && <p className="admin-success">{successMessage}</p>}
        {errorMessage && <p className="admin-error">{errorMessage}</p>}

        <button className="admin-submit" type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default Admin;
