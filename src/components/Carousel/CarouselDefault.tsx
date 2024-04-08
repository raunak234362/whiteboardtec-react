import { Carousel } from "@material-tailwind/react";

export type CarouselPropType = {
  id?: string;
  title?:string;
  image: string;
  alt?:string;
}

const images: CarouselPropType[] = [
  {
    image: "/src/assets/image/insite-images/connection-design.png",
    alt: "Structural Steel 1",
  },
  {
    image: "/src/assets/image/insite-images/equal-opportunity.png",
    alt: "Structural Steel 2",
  },
  {
    image: "/src/assets/image/insite-images/our-services.jpg",
    alt: "Structural Steel 3",
  },
  {
    image: "/src/assets/image/insite-images/simplified.jpg",
    alt: "Structural Steel 4",
  },
]

export function CarouselDefault() {
  if (images.length !== 0) {
    return (
      <Carousel
        className="rounded-xl h-full w-full overflow-hidden relative"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {
          images.map((image, index) => {
            return (
              <img
                key={index}
                src={image.image}
                alt={(image.alt === undefined ? "" : image.alt)}
                className="h-full w-full object-cover"
              />
            )
          })
        }
      </Carousel>
    );
  }
}
