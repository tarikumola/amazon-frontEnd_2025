import Carousel from "../../components/Carousel/Carousel";
import Product from "../../components/Product/Product";
import LayOut from "../../Components/Layout/LayOut";
import Category from "../../components/Category/Category";

const Landing = () => {
  return (
    <div>
      <LayOut>
        <Carousel />
        <Category />
        <Product />
      </LayOut>
    </div>
  );
};

export default Landing;
