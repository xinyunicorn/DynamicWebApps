import Carousel from "../components/Carousel";

import img1 from "../assets/cat1.jpg";
import img2 from "../assets/cat2.jpg";
import img3 from "../assets/cat3.jpg";

const images = [img1, img2, img3];

export default function CarouselDemo() {
  return (
    <div className="p-8 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">Carousel</h1>
      <Carousel images={images} autoPlay={true} interval={2500} />
    </div>
  );
}
