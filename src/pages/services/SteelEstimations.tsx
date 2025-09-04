/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Estimate from "../../components/estimation/Estimate";
import Service from "../../config/service";
import { ClipboardList, FileText, Scale, Ruler } from "lucide-react";
import { Link } from "react-router-dom";

const banner: BannerPropType = {
  header: "Steel Estimation & Take-Off Services",
  subheader: "Eliminate Bidding Uncertainty. Maximize Your Profit.",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1756983079/banner-image/Pasted_image_flirow.png",
};

const headSection: string[] = [
  "Stop guessing. Start winning more projects. Our Estimation Take-Off Service gives you a clear, data-driven advantage. We turn complex structural, architectural, and civil drawings into precise, actionable estimates take-off report.",
  
];

const takeoffs: string[] = [
  "Main Steel: We identify member profiles, dimensions, and steel grades, with each item listed by length, height, and calculated weight, complete with drawing references.",
  "Main Miscellaneous Steel: Items like deck edge angles, bent plates, and kicker angles are measured and organized in linear feet for streamlined planning.",
  "Connection Materials: We meticulously account for all critical components needed for fabrication and erection, such as shear tabs, clip angles, and gusset plates.",
  "Miscellaneous Steel Elements: This includes accurate estimates for stairs, ladders, handrails, and other custom site elements, aligned with the full drawing set.",
];

const deliverables: { text: string; icon: JSX.Element }[] = [
  {
    text: "A complete estimation sheet with categorized steel take-offs.",
    icon: <FileText className="w-12 h-12 text-[#6abd45]" />,
  },
  {
    text: "A detailed scope list of steel members considered in the estimate.",
    icon: <ClipboardList className="w-12 h-12 text-[#6abd45]" />,
  },
  {
    text: "The total estimated steel weight for bidding.",
    icon: <Scale className="w-12 h-12 text-[#6abd45]" />,
  },
  {
    text: "Drawing references for cross-verification and transparency.",
    icon: <Ruler className="w-12 h-12 text-[#6abd45]" />,
  },
];

function SteelEstimation() {
  const [service_images, setServiceImages] = useState<any[]>([]);
  useEffect(() => {
    document.title = "Steel Estimation & Take-Off Services - Whiteboard Tech";
  }, []);

  const fetchAllGalleryImages = async () => {
    const response = await Service.getGalleryByDepartment("ESTIMATION");
    const images = response.map((img: any) => ({
      url: img.file.secureUrl,
      title: img.title,
    }));
    setServiceImages(images);
  };

  useEffect(() => {
    fetchAllGalleryImages();
  }, []);

  return (
    <>
      <PageBanner {...banner} />

      {/* Intro + Estimate form */}
      <div className="mx-auto my-16 lg:max-w-screen-lg xl:max-w-screen-xl px-6">
        <section className="rounded-3xl border p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 shadow-lg bg-white">
          <div className="leading-relaxed text-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-[#6abd45]">
              Steel Estimation Take-Off Services
            </h2>
            {headSection?.map((desc, index) => (
              <p
                key={index}
                className="text-lg leading-relaxed mb-2 text-justify"
              >
                {desc}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            <div className="h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1756980017/banner-image/20250902_131026_lqlxwz.jpg"
                alt="Steel Estimation Example 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1756980012/banner-image/20250902_131253_vyyzx6.jpg"
                alt="Steel Estimation Example 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* 2-Column Image Grid */}
      </div>

      {/* Our Take-Offs */}
      <div className="bg-gray-50 py-20">
        <div className="mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-6">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
            Our <span className="text-[#6abd45]">Detailed Take-Offs</span> Cover
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {takeoffs.map((detail, index) => {
              const [heading, description] = detail.split(":");
              return (
                <div
                  key={index}
                  className="bg-gradient-to-r from-[#6abd45] to-[#4d9330] text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1 flex flex-col justify-center items-center text-center min-h-[220px]"
                >
                  <h3 className="text-2xl font-bold mb-3">{heading}</h3>
                  <p className="text-base">{description?.trim()}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deliverables */}
      <div className="py-20 bg-white">
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-6">
          <h2 className="text-4xl font-extrabold mb-12 text-[#6abd45] text-center">
            Deliverables
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
              >
                <div className="mb-4">{item.icon}</div>
                <p className="text-lg text-gray-700 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
          {/* 
          <Estimate head="Get your Steel Estimation & Take-Off Service now!" /> */}
          {/* <div className="mt-5 mb-0 flex flex-wrap flex-col md:flex-row items-center">
                              <Link
                                  to="#"
                                  className="border-2 rounded-full border-white border-opacity-90 duration-200 ease-in-out text-md px-5 py-2 hover:bg-white hover:text-[#6abd45] hover:border-white hover:shadow-xl"
                              >
                                  Get Estimate ➤
                              </Link>
                          </div> */}
          {/* Why Partner with Us Section */}
          <div className="py-20 bg-gray-50">
            <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-6">
              <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
                {/* Heading */}
                <h2 className="text-4xl font-extrabold mb-6 text-[#6abd45]">
                  Why Partner with Us?
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
                  In today's fast-paced market, a reliable and clear estimate is
                  crucial. We provide the speed and consistency you need to
                  respond to bid invitations confidently. By partnering with us,
                  you can avoid costly surprises, improve your project
                  timelines, and build stronger, more reliable relationships
                  with your clients.
                </p>

                {/* CTA Button */}
                <div className="mt-5 flex justify-center">
                  <a
                    href="#"
                    className="border-2 rounded-full border-[#6abd45] bg-[#6abd45] text-white px-6 py-3 text-lg font-semibold transition duration-300 ease-in-out hover:bg-white hover:text-[#6abd45] hover:shadow-xl"
                  >
                    Get Estimate ➤
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
    </>
  );
}

export default SteelEstimation;
