import { Link } from "react-router-dom";
import classes from "./Category.module.css";


const CategoryCard = ({ data }) => {
  // console.log(data)

  const { title, imgLink, categoryName } = data;
  return (
    <div className={classes.category}>
      <Link to={`category/${data.categoryName}`}>
        <span>
          <h3>{title}</h3>
        </span>
        <img src={imgLink} alt="" /> 
        <p>Shop now</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
