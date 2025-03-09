import CategoryCard from "./CategoryCard";
import { categoryImage } from "./categoryInfos";
import classes from './Category.module.css'

const Category = () => {
  return (
    <section className={classes.category__container}> 
      {categoryImage.map((infos, index) => (
        <CategoryCard data={infos} key={index} />
      ))}
    </section>
  );
};

export default Category;
