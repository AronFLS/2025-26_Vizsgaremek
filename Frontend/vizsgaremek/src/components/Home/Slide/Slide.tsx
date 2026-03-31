import useEmblaCarousel from "embla-carousel-react";
import "./Slide.css";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import MacBookNeo from "../../../assets/MacBookNeoHomeSLide.jpg";
import iPhoneAir from "../../../assets/iPhoneAirHomeSlide.png";
import iPhone17Pro from "../../../assets/iPhone17ProHomeSlide.png";
import MacbookAir from "../../../assets/MacBookAirHomeSlide.png";

export function Slide() {
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
              <img src={MacBookNeo} alt="" />
            </div>
            <div className="embla__slide">
              <img src={iPhone17Pro} alt="" />
            </div>
            <div className="embla__slide">
              <img src={iPhoneAir} alt="" />
            </div>
            <div className="embla__slide">
              <img src={MacbookAir} alt="" />
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
export default Slide;
