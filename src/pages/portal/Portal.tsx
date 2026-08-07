import { PageBanner } from "../../components/banner";
import { useEffect } from "react";
import Newsletter from "../../components/newsletter/Newsletter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import projectStationData from "../../data/projectStation.json";

function Portal({ previewData, onSectionClick }: { previewData?: any; onSectionClick?: (sectionId: string) => void }) {
  useEffect(() => {
    document.title = "Project Station - Whiteboard Technical";
    window.scrollTo(0, 0);
  }, []);

  const data = previewData || projectStationData;
  const isEditMode = !!onSectionClick;

  const handleClick = (e: React.MouseEvent, sectionId: string) => {
    if (isEditMode && onSectionClick) {
      e.stopPropagation();
      e.preventDefault();
      onSectionClick(sectionId);
    }
  };

  const getEditClass = (_sectionId: string) => {
    return isEditMode
      ? "relative cursor-pointer hover:ring-4 hover:ring-blue-500 hover:ring-opacity-50 transition-all duration-200 rounded-md"
      : "";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className={getEditClass("banner")}
        onClick={(e) => handleClick(e, "banner")}
      >
        <PageBanner {...data.banner} />
      </div>

      {/* Intro Section */}
      <section className="py-20">
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-2 rounded-3xl p-5 bg-white">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`p-2 rounded ${getEditClass("introText")}`}
              onClick={(e) => handleClick(e, "introText")}
            >
              <h1 className="md:text-3xl font-extrabold text-[#6abd45] leading-tight mb-8" dangerouslySetInnerHTML={{ __html: data.intro.title }} />
              <p 
                className="text-xlg text-slate-600 leading-relaxed mb-8 text-justify"
                dangerouslySetInnerHTML={{ __html: data.intro.body }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`bg-[#6abd45] backdrop-blur-md rounded-3xl p-10 border border-white/20 text-center ${getEditClass("introCard")}`}
              onClick={(e) => handleClick(e, "introCard")}
            >
              <h4 className="text-2xl font-medium text-white mb-6" dangerouslySetInnerHTML={{ __html: data.intro.quote }} />
              <a
                href={data.intro.buttonUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#6abd45] px-8 py-4 rounded-full font-bold text-xl hover:bg-slate-100 transition-colors shadow-xl"
              >
                {data.intro.buttonText} <ArrowRight className="w-6 h-6" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section 
        className={`py-24 bg-gray-200 ${getEditClass("features")}`}
        onClick={(e) => handleClick(e, "features")}
      >
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-5">
          <div className="text-left mb-16">
            <h2 className="text-[#6abd45] font-bold text-3xl mb-4">
              Core Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.features.map((feature: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1">
                    <svg
                      className="h-5 w-5 text-[#6abd45]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path
                        d="M18 15l-6-6l-6 6h12"
                        transform="rotate(90 12 12)"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-slate-900 mb-2">
                      {feature.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="">
        <Newsletter />
      </section>
    </div>
  );
}

export default Portal;
