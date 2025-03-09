import { useParams } from "react-router-dom";
import classes from "./Results.module.css";
import LayOut from "../../Components/Layout/LayOut";
import { productUrl } from "../../Api/endPoints";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

const Results = () => {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "10px" }}>Category/{categoryName}</p>
        <hr />

        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}>
            {results?.map((product) => (
              <ProductCard 
              key={product.id} 
              product={product}
              renderDesc={false} 
              renderAdd={true}/>
              
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Results;
