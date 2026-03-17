import Slide from "../../components/Home/Slide/Slide";
import DiscountSlide from "../../components/Home/DiscountSlide/DiscountSlide";
import ProductCard from "../../components/Home/ProductCards/productcard";
import "./Home.css";

function Home() {
  return (
    <>
      <Slide />
      <ProductCard />
      <DiscountSlide />
    </>
  );
}

export default Home;
