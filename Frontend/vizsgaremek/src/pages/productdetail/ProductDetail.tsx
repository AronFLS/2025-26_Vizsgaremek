import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios";
import "./ProductDetail.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  storageQuantity: number;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

const categoryRouteMap: Record<string, string> = {
  iphone: "/phones",
  macbook: "/notebooks",
  accessories: "/accessories",
};

function getCategoryRoute(categoryName: string): string {
  const key = categoryName.toLowerCase();
  for (const [keyword, route] of Object.entries(categoryRouteMap)) {
    if (key.includes(keyword)) return route;
  }
  return "/";
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const isMobile = useMediaQuery("(max-width: 770px)");

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => axiosInstance.get(`/api/products/${id}`).then((r) => r.data),
    enabled: !!id,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => axiosInstance.get("/api/categories").then((r) => r.data),
  });

  const backRoute = product
    ? getCategoryRoute(
        categories.find((c) => c.id === product.categoryId)?.name ?? "",
      )
    : "/";

  if (isLoading) return <p>Loading...</p>;
  if (isError || !product) return <p>Product not found</p>;

  return (
    <div className="product-detail">
      {!isMobile && (
        <Link to={backRoute}>
          <IoArrowBackOutline className="return-icon" />
        </Link>
      )}
      <div className="image-wrapper">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="right-column">
        <div className="details">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
        </div>
        <div className="price-cart-row">
          <p className="price">{product.price.toLocaleString("hu-HU")} Ft</p>
          <button className={isMobile ? "cartbtnmobile" : "cartbtn"}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
