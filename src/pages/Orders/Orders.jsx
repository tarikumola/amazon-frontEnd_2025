import LayOut from "../../Components/Layout/LayOut";
import classes from "./Orders.module.css";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { useContext, useEffect, useState } from "react";
import { collection, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import ProductCard from "../../components/Product/ProductCard";

const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  
useEffect(() => {
  

  if (!user) {
    setOrders([]);
    return;
  }

  // Create reference to user's orders subcollection
  const ordersRef = collection(doc(db, 'users', user.uid), 'orders');
  
  // Set up real-time listener with sorting
  const unsubscribe = onSnapshot(
    query(ordersRef, orderBy('created', 'desc')), 
    (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    }
  );

  return unsubscribe; // Cleanup on unmount
}, [user]); // Add user to dependency array

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && <div>You don't have orders yet.</div>}
          {/* ordered items */}
          <div>
            {orders.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order.ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard key={order.id} product={order} flex={true} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
