import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Auth from "./pages/Auth/Auth";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Results from "./pages/Results/Results";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

const stripePromise = loadStripe(
  "pk_test_51Kg0QaJtxX2BjBkzLKmdsRE6BD6r259l9R2p2mRAfnCe6bflApZDyz9UrsVfzS93f2x6UGG9ZCcQWEj0yXZE955z00TBeAba8L"
);
const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute msg={"you must login to pay"} redirect={"/payments"}>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route path="/orders" element={   
          <ProtectedRoute msg={"you must login to access your orders"} redirect={"/orders"}>
            <Orders />     
          </ProtectedRoute>
          } />



        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default Routing;
