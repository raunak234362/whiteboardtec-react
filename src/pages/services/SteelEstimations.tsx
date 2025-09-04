import { useEffect, useState } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Service from "../../config/service";
import { ClipboardList, FileText, Scale, Ruler } from "lucide-react";

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
        <section className="rounded-3xl border p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <div className="leading-relaxed text-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-[#6abd45]">
              Steel Estimation Take-Off Services
            </h2>
            {headSection.map((desc, index) => (
              <p
                key={index}
                className="text-lg leading-relaxed mb-4 text-justify"
              >
                {desc}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            {[
              "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1756980017/banner-image/20250902_131026_lqlxwz.jpg",
              "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1756980012/banner-image/20250902_131253_vyyzx6.jpg",
            ].map((src, idx) => (
              <div
                key={idx}
                className="h-[220px] md:h-[250px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={src}
                  alt={`Steel Estimation Example ${idx + 1}`}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Our Take-Offs */}
      <div className="bg-gray-50 py-20">
        <div className="mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-6">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-[#6abd45]">
            Our Detailed Take-Offs Cover
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {takeoffs.map((detail, index) => {
              const [heading, description] = detail.split(":");
              const gradient =
                index % 2 === 0
                  ? "from-gray-100 to-gray-300" // soft light gray
                  : "from-gray-200 to-gray-400"; // slightly darker gray
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${gradient} text-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform `}
                >
                  <h3 className="text-2xl font-bold mb-3">{heading}</h3>
                  <p className="text-base opacity-90">{description?.trim()}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deliverables */}
      <div className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-6">
          <h2 className="text-4xl font-extrabold mb-12 text-[#6abd45] text-center">
            Our Deliverables
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="mb-4 bg-gray-100 p-4 rounded-full shadow-inner">
                  {item.icon}
                </div>
                <p className="text-lg text-gray-700 font-medium">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Why Partner with Us */}
          <div className="py-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-inner">
            <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-6">
              <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
                <h2 className="text-4xl font-extrabold mb-6 text-[#6abd45]">
                  Why Partner With Us?
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
                  In today's fast-paced market, a reliable and clear estimate is
                  crucial. We provide the speed and consistency you need to
                  respond to bid invitations confidently. By partnering with us,
                  you can avoid costly surprises, improve your project
                  timelines, and build stronger, more reliable relationships
                  with your clients.
                </p>
                <div className="mt-5 flex justify-center">
                  <a
                    href="#"
                    className="bg-[#6abd45] text-white px-6 py-3 rounded-full text-lg font-medium shadow-md hover:bg-[#2563eb] hover:shadow-xl transition duration-300"
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
