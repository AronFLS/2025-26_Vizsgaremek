import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../axios";
import "./RandomProducts.css";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  active: boolean;
}

function RandomProducts() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => axiosInstance.get("/api/products").then((r) => r.data),
  });

  const randomProducts = useMemo(() => {
    const activeProducts = products.filter(
      (product) => product.active === true,
    );

    if (activeProducts.length === 0) {
      return [];
    }

    const shuffled = [...activeProducts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(3, shuffled.length));
  }, [products]);

  const leftProduct = randomProducts[0];
  const topRightProduct = randomProducts[1];
  const bottomRightProduct = randomProducts[2];

  return (
    <div className="random-products">
      <div className="random-product-leftcolumn">
        {leftProduct && (
          <>
            <p className="random-product-leftcolumn-name">{leftProduct.name}</p>
            <Link to={`/product/${leftProduct.id}`}>
              <button
                className="random-product-leftcolumn-button"
                type="button"
              >
                Buy Now
              </button>
            </Link>
            <img
              className="random-product-leftcolumn-image"
              src={leftProduct.imageUrl}
              alt={leftProduct.name}
            />
          </>
        )}
      </div>
      <div className="random-product-rightcolumn">
        <div className="random-product-rightcolumn-top">
          {topRightProduct && (
            <>
              <img
                className="random-product-rightcolumn-image"
                src={topRightProduct.imageUrl}
                alt={topRightProduct.name}
              />
              <div className="random-product-rightcolumn-content">
                <p className="random-product-rightcolumn-name">
                  {topRightProduct.name}
                </p>
                <Link to={`/product/${topRightProduct.id}`}>
                  <button
                    className="random-product-rightcolumn-button"
                    type="button"
                  >
                    Buy Now
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="random-product-rightcolumn-bottom">
          {bottomRightProduct && (
            <>
              <img
                className="random-product-rightcolumn-image"
                src={bottomRightProduct.imageUrl}
                alt={bottomRightProduct.name}
              />
              <div className="random-product-rightcolumn-content">
                <p className="random-product-rightcolumn-name">
                  {bottomRightProduct.name}
                </p>
                <Link to={`/product/${bottomRightProduct.id}`}>
                  <button
                    className="random-product-rightcolumn-button"
                    type="button"
                  >
                    Buy Now
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RandomProducts;
