import { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/Layout/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { db } from "../../Utility/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { Type } from "../../Utility/action.type.js";

const Payment = () => {
  const [{ user, basket },dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      //. Contact backend or function to get client secret
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      // console.log(response.data);

      const clientSecret = response.data?.clientSecret;
      // 2. client side (react side confirmation)

      // get paymentIntent from confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(paymentIntent);

      //todo 3. after confirmation ---> save order in firestore database, and clear basket
      // Create document reference using path segments
      // Uses doc() with path segments instead of mixing collection() and doc()

      const orderRef = doc(db, "users", user.uid, "orders", paymentIntent.id);
      // Set document data
      // Using setDoc() instead of .set()
      await setDoc(orderRef, {
        basket: basket,
        payment: paymentIntent.amount,
        created: paymentIntent.created,
      });

      // empty the basket
      dispatch({
        type: Type.EMPTY_BASKET,
      });



      setProcessing(false);

      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment__header}>Checkout {totalItem} items</div>

      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 Fake Address</div>
            <div>Fake City, MD</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery info</h3>
          <div>
            {basket?.map((item, index) => {
              return <ProductCard product={item} flex={true} key={index} />;
            })}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element*/}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={15} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
