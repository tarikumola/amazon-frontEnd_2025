import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import classes from "./Header.module.css";
import LowerHeader from "./lowerHeader";
import { Link } from "react-router";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";


const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          <div className={classes.logo__container}>
            {/* logo */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            {/* delivery */}
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            {/* search */}
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search Product" />
            <BsSearch size={25} />
          </div>

          {/* right side link */}
          <div className={classes.order__container}>
            <div className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt="US Flag"
              />
              <select name="" id="">
                <option value="">EN</option>
                <option value="">ES</option>
              </select>
            </div>

            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={() =>auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            {/* orders */}
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>

            {/* cart */}

            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
        <LowerHeader />
      </section>
    </section>
  );
};

export default Header;
