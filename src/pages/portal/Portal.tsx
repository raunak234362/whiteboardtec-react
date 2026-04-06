import { PageBanner } from "../../components/banner";
import { useEffect } from "react";
import Newsletter from "../../components/newsletter/Newsletter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Portal = () => {
  useEffect(() => {
    document.title = "Project Station - Whiteboard Technical";
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Easy Document Upload",
    },
    {
      title: "Real-time Collaboration",
    },
    {
      title: "Documentation Version Control",
    },
    {
      title: "Instant Submittals",
    },
    {
      title: "No Upload Limits",
    },
    {
      title: "Live Project Progress Notifications",
    },
    {
      title: "RFI Management",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PageBanner
        header="Project Station Version-1.0"
        image="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1775469582/banner-image/c2ea0c85f441d187ad372369eda5f7ef_c2ck15.jpg"
      />

      {/* Intro Section */}
      <section className="py-20">
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-2 rounded-3xl p-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className=""
            >
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-8">
               Whiteboard Structural Detailing Project Management is now{" "}
                <span className="text-[#6abd45]">Seamless.</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 text-justify">
                Tired of juggling emails, file versions, and project updates?
                Project Station is our answer to seamless project management.
                Built specifically for structural steel detailing, it's your
                central hub for documents, collaboration, and real-time
                communication with our team—accessible anytime, anywhere.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#6abd45] backdrop-blur-md rounded-3xl p-10 border border-white/20 "
            >
              <div className="text-center">
                <h4 className="text-3xl font-bold mb-6">
                  "A tool designed to help you stay responsive and manage all
                  your projects on the go."
                </h4>
                {/* <div className="flex justify-center mb-8">
                  <img
                    src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1757499575/loginwith_gplziw.png"
                    alt="Login with Project Station"
                    className="h-16 w-auto"
                  />
                </div> */}
                <a
                  href="https://ps.whiteboardtec.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#6abd45] px-8 py-4 rounded-full font-bold text-xl hover:bg-slate-100 transition-colors shadow-xl"
                >
                  Enter Project Station <ArrowRight className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-200">
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl px-5">
          <div className="text-left mb-16">
            <h2 className="text-[#6abd45] font-extrabold text-3xl mb-4">
              Core Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
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
                    {/* <p className="text-slate-600 leading-relaxed text-sm">
                      {feature.description}
                    </p> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Communication Section */}
      {/* <section className="py-20 relative overflow-hidden bg-[#6abd45]">
        <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </div>
        <div className="mx-auto lg:max-w-screen-lg xl:max-w-screen-xl relative z-10 text-white px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-white/80 font-bold text-sm uppercase tracking-widest mb-4">
                Seamless Communication
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-8">
                Bridging the Gap Between Teams
              </h3>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Project Station isn't just a document storage tool—it's a
                communication powerhouse. Reduce RFI turnaround times, resolve
                drawing conflicts instantly, and ensure everyone is looking at
                the latest approved version.
              </p>
              <ul className="space-y-4">
                {[
                  "Direct team communication",
                  "Push notifications for critical updates",
                  "Mobile-first design for on-site reviews",
                  "Integrated feedback loop",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/80" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section> */}

      <Newsletter />
    </div>
  );
};

export default Portal;
