import useEmblaCarousel from "embla-carousel-react";
import "./Slide.css";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import SlideTest1 from "../../../assets/SlideTest1.jpg";
import SlideTest2 from "../../../assets/SlideTest2.jpg";
import SlideTest3 from "../../../assets/SlideTest3.jpg";
import SlideTest4 from "../../../assets/SlideTest4.jpg";

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedSnap, setSelectedSnap] = useState(0);
  const goTo = (index: number) => emblaApi?.scrollTo(index);
  const setupSnaps = (emblaApi: EmblaCarouselType) =>
    setScrollSnaps(emblaApi.scrollSnapList());
  const setActiveSnap = (emblaApi: EmblaCarouselType) =>
    setSelectedSnap(emblaApi.selectedScrollSnap());

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoplay?.play();
    setupSnaps(emblaApi);
    setActiveSnap(emblaApi);
    emblaApi.on("init", setupSnaps);
    emblaApi.on("init", setActiveSnap);
    emblaApi.on("select", setActiveSnap);
  }, [emblaApi]);

  return (
    <div className="slide-container">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            <div className="embla__slide">
              <img src={SlideTest1} alt="" />
            </div>
            <div className="embla__slide">
              <img src={SlideTest2} alt="" />
            </div>
            <div className="embla__slide">
              <img src={SlideTest3} alt="" />
            </div>
            <div className="embla__slide">
              <img src={SlideTest4} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <button
            className={"embla__dot".concat(
              index === selectedSnap ? " embla__dot--selected" : "",
            )}
            key={index}
            onClick={() => goTo(index)}
          >
            {/* Button content */}
          </button>
        ))}
      </div>
    </div>
  );
}
export default EmblaCarousel;
