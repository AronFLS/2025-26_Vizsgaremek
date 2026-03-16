import useEmblaCarousel from "embla-carousel-react";
import "./DiscountSlide.css";
import {
  type ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../axios";
import {
  formatProductSpecs,
  type ProductSpecs,
} from "../../../utils/productSpecs";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type ArrowButtonProps = ComponentPropsWithRef<"button">;

const PrevButton = (props: ArrowButtonProps) => {
  const { children, className, disabled, ...restProps } = props;

  return (
    <button
      className={"embla__button embla__button--prev".concat(
        disabled ? " embla__button--disabled" : "",
        className ? ` ${className}` : "",
      )}
      type="button"
      disabled={disabled}
      {...restProps}
    >
      <svg className="embla__button__svg" viewBox="0 0 532 532" aria-hidden>
        <path
          fill="currentColor"
          d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
        />
      </svg>
      {children}
    </button>
  );
};

const NextButton = (props: ArrowButtonProps) => {
  const { children, className, disabled, ...restProps } = props;

  return (
    <button
      className={"embla__button embla__button--next".concat(
        disabled ? " embla__button--disabled" : "",
        className ? ` ${className}` : "",
      )}
      type="button"
      disabled={disabled}
      {...restProps}
    >
      <svg className="embla__button__svg" viewBox="0 0 532 532" aria-hidden>
        <path
          fill="currentColor"
          d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
        />
      </svg>
      {children}
    </button>
  );
};

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  discount?: number;
  specs: ProductSpecs;
  storageQuantity: number;
}

export function DiscountSlide() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => axiosInstance.get("/api/products").then((r) => r.data),
  });

  const discountedProducts = products.filter(
    (product) => (product.discount ?? 0) > 0,
  );

  if (isLoading || discountedProducts.length === 0) {
    return null;
  }

  return (
    <section className="discount-slide-container">
      <h2 className="discount-slide-title">Discounted Products</h2>

      <div className="discount-carousel">
        <div className="discount-carousel__viewport" ref={emblaRef}>
          <div className="discount-carousel__container">
            {discountedProducts.map((product) => {
              const discountedPrice =
                product.price * (1 - (product.discount ?? 0) / 100);

              return (
                <article key={product.id} className="discount-carousel__slide">
                  <Link
                    to={`/product/${product.id}`}
                    className="discount-card-link"
                    aria-label={`Open ${product.name}`}
                  >
                    <div className="discount-card__image-wrapper">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>

                    <div className="discount-card__body">
                      <h3 className="discount-card__name">{product.name}</h3>
                      <p className="discount-card__description">
                        {formatProductSpecs(product.specs)}
                      </p>
                    </div>

                    <div className="discount-card__footer">
                      <div className="discount-card__price-block">
                        <span className="discount-card__original-price">
                          {product.price.toLocaleString("hu-HU")} Ft
                        </span>
                        <span className="discount-card__price">
                          {discountedPrice.toLocaleString("hu-HU")} Ft
                        </span>
                      </div>

                      <span className="discount-card__badge">
                        -{product.discount}%
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        <div className="discount-carousel__arrows">
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            aria-label="Previous discounted slide"
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            aria-label="Next discounted slide"
          />
        </div>
      </div>
    </section>
  );
}

export default DiscountSlide;
