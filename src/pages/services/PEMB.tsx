import { useEffect, useState } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";
import Service from "../../config/service";
import {
  CarouselDefault,
  CarouselPropType,
} from "../../components/Carousel/CarouselDefault";

const banner: BannerPropType = {
  header: "PEMB Detailing",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685616/banner-image/pemb-banner_anznpj.jpg",
};

const headSection: string[] = [
  "Product innovations are constant to the construction ecosystem. Pre-Engineered Buildings bring a myriad of benefits such as reducing construction costs, driving sustainability, offering flexibility with design, and rapidly gaining traction within the infrastructure spheres. Our experience with PEMB Design and Detailing goes deep into critical infrastructure projects.",
  "We specialize in all aspects of PEMB steel detailing with our core practice area being Pre-Engineered Metal Buildings (PEMB), Structural Steel, Hybrid Structures, small or large. Leveraging the most up-to-date 3D modeling and design tools, we bring definitive value to any project. We comply with all leading industry standards such as ASD, LRFD, AISI and MBMA.",
];

const pembDetailing: string[] = [
  "Hybrid PEMB & Structural Steel Structures",
  "Buildings with Mezzanines",
  "Buildings with multiple cranes",
  "High bay, low bay buildings",
  "Buildings with Portal Frames",
  "Fixed Based Column Bracings",
  "Heavy Equipment Supporting Platforms",
  "Buildings for Industrial and Commercial Construction",
  "Buildings with miscellaneous attachments such as staircases, handrails, etc.",
];

function PEMB() {
  const [pembImages, setPembImages] = useState<CarouselPropType[]>([]);

  useEffect(() => {
    document.title = "PEMB Detailing - Whiteboard Tech";
    fetchPEMBGalleryImages();
  }, []);

  const fetchPEMBGalleryImages = async () => {
    try {
      const response = await Service.getGalleryByDepartment("PEMB");
      const images = response.map((img: any) => ({
        url: img.file?.secureUrl,
        title: img.title,
      }));
      console.log("Fetched PEMB images:", images);
      if (images.length === 0) {
        console.warn("No PEMB images found");
      }
      setPembImages(images);
    } catch (error) {
      console.error("Error fetching PEMB images", error);
    }
  };

  return (
    <>
      <PageBanner {...banner} />

      {/* Head Section */}
      <div className="mx-auto my-0 m-28 lg:max-w-screen-lg xl:max-w-screen-xl px-8">
        <section className="rounded-3xl mt-3 border-2 p-6 grid grid-cols-[60%_40%] gap-6 shadow-md max-md:grid-cols-1">
          <div className="order-1 leading-loose text-gray-700 max-md:order-2">
            {headSection.map((desc, index) => (
              <p
                key={index}
                className="text-lg leading-relaxed text-justify mb-4"
              >
                {desc}
              </p>
            ))}
          </div>
          <Estimate head="Get your PEMB Detailing Estimates done for FREE. Yes. You heard us right!" />
        </section>
      </div>

      {/* Offerings Section */}
      <div className="bg-gray-100">
        <div className="pt-10 pb-10 mx-auto my-10 lg:max-w-screen-lg xl:max-w-screen-xl px-12">
          <h2 className="text-4xl font-bold text-[#6abd45] mb-6">
            Our Structural Design Engineering Portfolio Includes
          </h2>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pembDetailing.map((detail, index) => (
              <div key={index} className="flex items-start gap-2 py-2">
                <svg
                  className="h-6 w-6 text-[#6abd45] shrink-0 mt-1"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M18 15l-6-6l-6 6h12" transform="rotate(90 12 12)" />
                </svg>
                <p className="text-lg">{detail}</p>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Carousel Section */}
      {pembImages.length > 0 && (
        <div className="py-10 mx-auto my-10 bg-white border-2 shadow-md lg:max-w-screen-lg xl:max-w-screen-xl rounded-3xl px-14">
          <h2 className="text-4xl font-bold text-[#6abd45] mb-6">
            Our PEMB Portfolio
          </h2>
          <div className="w-full h-96">
            <CarouselDefault images={pembImages} />
          </div>
        </div>
      )}

      <Newsletter />
    </>
  );
}

export default PEMB;
