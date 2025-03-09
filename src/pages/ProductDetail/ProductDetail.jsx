import { useParams } from "react-router-dom";
import LayOut from "../../Components/Layout/LayOut";
import { productUrl } from "../../Api/endPoints";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  );
};

export default ProductDetail;
