import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../axios";
import "./UpdateProducts.css";

interface ProductSpec {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  discount: number;
  storageQuantity: number;
  active: boolean;
  categoryId: number;
  createdAt: string;
  modifiedAt: string;
  specs: ProductSpec[];
}

interface ProductDraft {
  price: string;
  discount: string;
  storageQuantity: string;
  active: boolean;
}

const getInitialDraft = (product: Product): ProductDraft => ({
  price: String(product.price),
  discount: String(product.discount ?? 0),
  storageQuantity: String(product.storageQuantity),
  active: product.active,
});

const parseIntSafe = (value: string, fallback: number) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

function UpdateProducts() {
  const queryClient = useQueryClient();
  const [editedProducts, setEditedProducts] = useState<
    Record<number, ProductDraft>
  >({});
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "">(
    "",
  );

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery<Product[]>({
    queryKey: ["admin-products"],
    queryFn: () => axiosInstance.get("/api/products").then((resp) => resp.data),
  });

  const { mutateAsync: updateProductAsync, isPending: isUpdatingProduct } =
    useMutation({
      mutationFn: async ({
        product,
        draft,
      }: {
        product: Product;
        draft: ProductDraft;
      }) => {
        const parsedPrice = Math.max(
          0,
          parseIntSafe(draft.price, product.price),
        );
        const parsedDiscount = Math.min(
          100,
          Math.max(0, parseIntSafe(draft.discount, product.discount ?? 0)),
        );
        const parsedStorage = Math.max(
          0,
          parseIntSafe(draft.storageQuantity, product.storageQuantity),
        );

        await axiosInstance.put(`/api/products/${product.id}`, {
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          price: parsedPrice,
          description: product.description,
          discount: parsedDiscount,
          storageQuantity: parsedStorage,
          active: draft.active,
          categoryId: product.categoryId,
          createdAt: product.createdAt,
          modifiedAt: product.modifiedAt,
        });
      },
      onSuccess: async (_, variables) => {
        setFeedbackType("success");
        setFeedbackMessage(
          `Product #${variables.product.id} updated successfully.`,
        );
        await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
        await queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: (err: unknown) => {
        const axiosErr = err as {
          response?: {
            data?: unknown;
          };
        };

        const apiMessage =
          typeof axiosErr?.response?.data === "string"
            ? axiosErr.response.data
            : undefined;

        setFeedbackType("error");
        setFeedbackMessage(apiMessage ?? "Product update failed.");
      },
    });

  const visibleProducts = useMemo(() => products ?? [], [products]);

  const getDraft = (product: Product) => {
    return editedProducts[product.id] ?? getInitialDraft(product);
  };

  const hasChanges = (product: Product) => {
    const draft = getDraft(product);

    return (
      parseIntSafe(draft.price, product.price) !== product.price ||
      parseIntSafe(draft.discount, product.discount ?? 0) !==
        (product.discount ?? 0) ||
      parseIntSafe(draft.storageQuantity, product.storageQuantity) !==
        product.storageQuantity ||
      draft.active !== product.active
    );
  };

  const updateDraftField = (
    product: Product,
    field: keyof ProductDraft,
    value: string | boolean,
  ) => {
    setFeedbackMessage("");
    setFeedbackType("");
    setEditedProducts((prev) => {
      const current = prev[product.id] ?? getInitialDraft(product);

      return {
        ...prev,
        [product.id]: {
          ...current,
          [field]: value,
        },
      };
    });
  };

  const submitProductUpdate = async (product: Product) => {
    const draft = getDraft(product);
    await updateProductAsync({
      product,
      draft,
    });
  };

  if (isLoading) {
    return (
      <section className="orders-admin">
        <h2>Update Products</h2>
        <p className="orders-info">Loading products...</p>
      </section>
    );
  }

  if (isError) {
    const err = error as { message?: string };

    return (
      <section className="orders-admin">
        <h2>Update Products</h2>
        <p className="orders-error">
          Could not load products. {err?.message ? `(${err.message})` : ""}
        </p>
      </section>
    );
  }

  return (
    <section className="orders-admin">
      <div className="orders-header">
        <h2>Update Products</h2>
        <p>{visibleProducts.length} product(s)</p>
      </div>

      {feedbackMessage && (
        <p
          className={
            feedbackType === "error" ? "orders-error" : "orders-success"
          }
        >
          {feedbackMessage}
        </p>
      )}

      {visibleProducts.length === 0 ? (
        <p className="orders-info">No products found.</p>
      ) : (
        <div className="orders-grid">
          {visibleProducts.map((product) => {
            const draft = getDraft(product);

            return (
              <article key={product.id} className="order-card">
                <div className="order-card-top">
                  <p className="order-name">{product.name}</p>
                  <span className="order-status-chip">#{product.id}</span>
                </div>

                <p className="update-product-stock">
                  In stock: <strong>{product.storageQuantity}</strong>
                </p>

                <div className="update-product-fields">
                  <label htmlFor={`price-${product.id}`}>Price (Ft)</label>
                  <input
                    id={`price-${product.id}`}
                    type="number"
                    min="0"
                    value={draft.price}
                    onChange={(e) =>
                      updateDraftField(product, "price", e.target.value)
                    }
                    disabled={isUpdatingProduct}
                  />

                  <label htmlFor={`discount-${product.id}`}>Discount (%)</label>
                  <input
                    id={`discount-${product.id}`}
                    type="number"
                    min="0"
                    max="100"
                    value={draft.discount}
                    onChange={(e) =>
                      updateDraftField(product, "discount", e.target.value)
                    }
                    disabled={isUpdatingProduct}
                  />

                  <label htmlFor={`storage-${product.id}`}>
                    Storage Quantity
                  </label>
                  <input
                    id={`storage-${product.id}`}
                    type="number"
                    min="0"
                    value={draft.storageQuantity}
                    onChange={(e) =>
                      updateDraftField(
                        product,
                        "storageQuantity",
                        e.target.value,
                      )
                    }
                    disabled={isUpdatingProduct}
                  />
                </div>

                <div className="update-product-status">
                  <label htmlFor={`active-${product.id}`}>Status</label>
                  <select
                    id={`active-${product.id}`}
                    value={draft.active ? "true" : "false"}
                    onChange={(e) =>
                      updateDraftField(
                        product,
                        "active",
                        e.target.value === "true",
                      )
                    }
                    disabled={isUpdatingProduct}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>

                <div className="order-actions">
                  <button
                    type="button"
                    disabled={isUpdatingProduct || !hasChanges(product)}
                    onClick={() => void submitProductUpdate(product)}
                  >
                    {isUpdatingProduct ? "Saving..." : "Update"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default UpdateProducts;
