import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/imgsData";
import classes from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((sigleImgLink, index) => {
          return <img src={sigleImgLink} key={index} alt="" />;
        })}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
}

export default CarouselEffect;
