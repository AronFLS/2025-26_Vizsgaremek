import { useEffect, useState } from "react";
import "./admin.css";
import { axiosInstance } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const [specName, setSpecName] = useState<string>("");
  const queryClient = useQueryClient();

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
  const [specSuccessMessage, setSpecSuccessMessage] = useState<string>("");
  const [specErrorMessage, setSpecErrorMessage] = useState<string>("");

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

  const { mutateAsync: createSpecAsync, isPending: isCreatingSpec } =
    useMutation({
      mutationFn: () => {
        return axiosInstance
          .post("/Spec", { name: specName })
          .then((resp) => resp.data);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["specs"] });
      },
    });

  useEffect(() => {
    document.body.classList.add("account-page");

    return () => {
      document.body.classList.remove("account-page");
    };
  }, []);

  const clearProductMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const clearSpecMessages = () => {
    setSpecSuccessMessage("");
    setSpecErrorMessage("");
  };

  const toggleSpec = (id: number) => {
    clearProductMessages();
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
      setName("");
      setImageUrl("");
      setPrice("");
      setDescription("");
      setDiscount("");
      setStorageQuantity("");
      setCategoryId("");
      setSelectedSpecIds([]);
      setSuccessMessage("Product added successfully!");
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

  const handleSpecSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSpecSuccessMessage("");
    setSpecErrorMessage("");

    try {
      await createSpecAsync();
      setSpecName("");
      setSpecSuccessMessage("Spec added successfully!");
    } catch (err: unknown) {
      const axiosErr = err as {
        response?: { status?: number; data?: unknown };
      };
      console.error(
        "POST /Spec failed:",
        axiosErr?.response?.status,
        axiosErr?.response?.data,
      );
      const data = axiosErr?.response?.data;
      const message =
        (typeof data === "object" && data !== null && "message" in data
          ? (data as { message?: string }).message
          : typeof data === "string"
            ? data
            : undefined) ?? "Adding spec failed. Please try again.";
      setSpecErrorMessage(message);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Add Product</h1>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => {
              clearProductMessages();
              setName(e.target.value);
            }}
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
            onChange={(e) => {
              clearProductMessages();
              setImageUrl(e.target.value);
            }}
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
              onChange={(e) => {
                clearProductMessages();
                setPrice(e.target.value);
              }}
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
              onChange={(e) => {
                clearProductMessages();
                setDiscount(e.target.value);
              }}
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
              onChange={(e) => {
                clearProductMessages();
                setStorageQuantity(e.target.value);
              }}
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
            onChange={(e) => {
              clearProductMessages();
              setDescription(e.target.value);
            }}
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
              onChange={(e) => {
                clearProductMessages();
                setCategoryId(e.target.value);
              }}
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

      <h2 className="admin-subtitle">Add Spec</h2>
      <form className="admin-form" onSubmit={handleSpecSubmit}>
        <div className="admin-field">
          <label htmlFor="specName">Spec Name</label>
          <input
            id="specName"
            name="specName"
            type="text"
            value={specName}
            onChange={(e) => {
              clearSpecMessages();
              setSpecName(e.target.value);
            }}
            required
            placeholder="e.g. 1TB, M5, SkyBlue"
          />
        </div>

        {specSuccessMessage && (
          <p className="admin-success">{specSuccessMessage}</p>
        )}
        {specErrorMessage && <p className="admin-error">{specErrorMessage}</p>}

        <button
          className="admin-submit"
          type="submit"
          disabled={isCreatingSpec}
        >
          {isCreatingSpec ? "Submitting..." : "Add Spec"}
        </button>
      </form>
    </div>
  );
}

export default Admin;
