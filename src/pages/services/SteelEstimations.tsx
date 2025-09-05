import { useEffect, useState } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import Estimate from "../../components/estimation/Estimate";
import Newsletter from "../../components/newsletter/Newsletter";
import Service from "../../config/service";
import { ClipboardList, FileText, Scale, Ruler } from "lucide-react";

// ✅ NEW COMPONENT (Custom Estimate Box)
function SteelEstimateBox() {
  return (
    <div className="bg-[#6abd45] rounded-xl md:order-1 order-first p-6 mx-5 text-white shadow-lg">
      <div className="text-2xl font-bold mb-3">
        Get Accurate Steel Estimation & Take-Off Reports – Start Today!
      </div>
      <p className="text-md mb-4 leading-relaxed">
        Why wait? Send us your drawing sets today and speed up your bidding
        process with our steel estimation take-off services where we provide
        complete clarity for confident bidding
      </p>
      <ul className="list-none space-y-3">
        {[
          "A complete estimation sheet with categorized steel take-offs.",
          "Detailed scope list of steel members",
          "Drawing references for transparency",
          "The total estimated steel weight",
        ].map((point, idx) => (
          <li key={idx} className="flex items-start">
            <svg
              className="h-5 w-5 text-white mt-1 mr-2"
              width="24"
              height="24"
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
            <span className="text-md">{point}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex">
        <a
          href="#"
          className="border-2 rounded-full border-white border-opacity-90 px-5 py-2 text-md hover:bg-white hover:text-[#6abd45] hover:shadow-xl transition duration-200"
        >
          Get Estimate ➤
        </a>
      </div>
    </div>
  );
}

const banner: BannerPropType = {
  header: "Steel Estimation & Take-Off Services",
  subheader: "Eliminate Bidding Uncertainty. Maximize Your Profit.",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1756980017/banner-image/20250902_131026_lqlxwz.jpg",
};

const headSection: string[] = [
  "Stop guessing. Start winning more projects. Our Estimation Take-Off Service gives you a clear, data-driven advantage. We turn complex structural, architectural, and civil drawings into precise, actionable estimates take-off report.",
  "In today's fast-paced market, a reliable and clear estimate is crucial. We provide the speed and consistency you need to respond to bid invitations confidently. By partnering with us, you can avoid costly surprises, improve your project timelines, and build stronger, more reliable relationships with your clients.",
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
    icon: <ClipboardList className="w-12 h-12 text-[#2563eb]" />,
  },
  {
    text: "The total estimated steel weight for bidding.",
    icon: <Scale className="w-12 h-12 text-[#facc15]" />,
  },
  {
    text: "Drawing references for cross-verification and transparency.",
    icon: <Ruler className="w-12 h-12 text-[#6abd45]" />,
  },
];

function SteelEstimation() {
  const [, setServiceImages] = useState<any[]>([]);
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

      {/* Intro Section */}
      <div className="mx-auto my-16 lg:max-w-screen-lg xl:max-w-screen-xl px-6">
        <section className="rounded-3xl border-2 p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 shadow-md bg-white">
          {/* LEFT SIDE - Content + Image */}
          <div className="flex flex-col justify-between">
            <div className="leading-relaxed text-gray-700 mb-6">
              {headSection.map((desc, index) => {
                if (index === 0) {
                  const [, ...rest] = desc.split("Our Estimation");
                  return (
                    <div key={index}>
                      <p className="text-xl font-bold text-[#6abd45] mb-2">
                        Stop guessing. Start winning more projects!
                      </p>
                      <p className="text-lg leading-relaxed text-justify text-gray-700">
                        Our Estimation {rest.join("Our Estimation")}
                      </p>
                    </div>
                  );
                }
                return (
                  <p
                    key={index}
                    className="text-lg leading-relaxed mb-4 text-justify text-gray-700"
                  >
                    {desc}
                  </p>
                );
              })}
            </div>

            {/* Image */}
            <div className="h-[220px] md:h-[200px] rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1756980012/banner-image/20250902_131253_vyyzx6.jpg"
                alt="Steel Estimation Example"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT SIDE - ✅ Replaced with SteelEstimateBox */}
          <div className="flex items-center justify-center">
            <SteelEstimateBox />
          </div>
        </section>
      </div>

      {/* Our Take-Offs */}
      <div className="bg-gray-100 py-16">
        <div className="mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-6">
          <h2 className="text-3xl font-semibold mb-8 text-[#6abd45]">
            Our Detailed Take-Offs Cover
          </h2>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {takeoffs.map((detail, index) => {
              const [heading, description] = detail.split(":");
              return (
                <div
                  key={index}
                  className="bg-white text-gray-800 p-6 rounded-2xl shadow-md border"
                >
                  <h3 className="text-xl font-semibold mb-2">{heading}</h3>
                  <p className="text-base">{description?.trim()}</p>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      {/* Our Deliverables Section */}
      <div className="py-16 bg-white">
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-6">
          <h2 className="text-3xl font-semibold mb-8 text-[#6abd45]">
            Our Deliverables
          </h2>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-md border"
              >
                <div className="mb-4 bg-gray-50 p-4 rounded-full shadow-inner">
                  {item.icon}
                </div>
                <p className="text-base text-gray-700 font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Divider Before Newsletter */}
      {/* <div className="border-t border-gray-300 my-10"></div> */}

      {/* Newsletter Section */}
      <div className="py-12 bg-white">
        <Newsletter />
      </div>
    </>
  );
}

export default SteelEstimation;
