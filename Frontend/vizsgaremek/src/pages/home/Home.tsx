import Slide from "../../components/Home/Slide/Slide";
import DiscountSlide from "../../components/Home/DiscountSlide/DiscountSlide";
import ProductCard from "../../components/Home/ProductCards/productcard";
import "./Home.css";
import RandomProducts from "../../components/Home/RandomProducts/randomproducts";

function Home() {
  return (
    <>
      <Slide />
      <ProductCard />
      <DiscountSlide />
      <RandomProducts />
    </>
  );
}

export default Home;
