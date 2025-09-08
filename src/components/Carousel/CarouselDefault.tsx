import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

export type CarouselPropType = {
  id?: string;
  title?: string;
  url: string;
  alt?: string;
};

function CarouselDefault({ images }: { images: CarouselPropType[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Only set interval if images exist and have at least one item
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      const isLastSlide = currentIndex === images.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 3000); // 3 seconds interval

    // Cleanup interval on component unmount or when images/currentIndex changes
    return () => clearInterval(interval);
  }, [currentIndex, images]); // Added images to dependency array

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-full m-auto mt-0 group flex items-center justify-center">
        <span className="text-gray-500">No images to display</span>
      </div>
    );
  }

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-full m-auto mt-0 group">
      <div
        style={{
          backgroundImage: `url(${images[currentIndex]?.url})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
        className="w-full h-full duration-500 bg-center bg-cover rounded-lg"
      />
      <div className="hidden group-hover:block max-md:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-40 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="hidden group-hover:block max-md:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-40 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      {/* {images[currentIndex]?.title && (
        <div className="absolute bottom-0 left-0 right-0 p-2 text-lg text-center text-white bg-black/30">
          {images[currentIndex]?.title}
        </div>
      )} */}
    </div>
  );
}

export { CarouselDefault };