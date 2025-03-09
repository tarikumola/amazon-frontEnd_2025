
import { AiOutlineMenu } from "react-icons/ai";
import classes from "./header.module.css";

const LowerHeader = () => {
  return (
    <div className={classes.lower__container}>
      <ul>
        <li>
          <AiOutlineMenu />
          <p>All</p>
        </li>
        <li>Today&apos;s Deals</li>
        <li>Best Sellers</li>
        <li>Amazon Basics</li>
        <li>Prime</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Books</li>
      </ul>
    </div>
  );
}

export default LowerHeader
