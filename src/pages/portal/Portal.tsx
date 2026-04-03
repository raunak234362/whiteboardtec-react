import { PageBanner } from "../../components/banner";
import { useEffect } from "react";
import Newsletter from "../../components/newsletter/Newsletter";
import { motion } from "framer-motion";
import { 
  CloudUpload, 
  CheckCircle2, 
  Layers, 
  Infinity, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Users
} from "lucide-react";

const Portal = () => {
  useEffect(() => {
    document.title = "Project Station - Whiteboard Technical";
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <CloudUpload className="w-8 h-8 text-[#6abd45]" />,
      title: "Easy Document Upload",
      description: "Upload RFIs, RFQs, drawings, and photos in a jiffy. No more hunting through emails."
    },
    {
      icon: <Users className="w-8 h-8 text-[#6abd45]" />,
      title: "Real-time Collaboration",
      description: "Collaborate with our team literally from anywhere, at any time, on any device."
    },
    {
      icon: <Layers className="w-8 h-8 text-[#6abd45]" />,
      title: "Version Control",
      description: "Comment, control versions, and respond directly with our team in one central hub."
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-[#6abd45]" />,
      title: "Instant Submittals",
      description: "Follow your submittals in real-time and provide instant feedback to keep projects moving."
    },
    {
      icon: <Infinity className="w-8 h-8 text-[#6abd45]" />,
      title: "No Upload Limits",
      description: "Supports all file types (PNG, JPEG, PDF) with no restrictive size or count limits."
    },
    {
      icon: <Zap className="w-8 h-8 text-[#6abd45]" />,
      title: "Responsive Management",
      description: "Designed to help you stay responsive and manage all your projects on the go."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Submit & Upload",
      description: "Send your project requirements, bid documents, and drawings through our secure portal."
    },
    {
      number: "02",
      title: "Collaborate",
      description: "Our team reviews and processes your data. You can comment and track progress in real-time."
    },
    {
      number: "03",
      title: "Approve & Deliver",
      description: "Review completed works, provide feedback, and download final approved documentation."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PageBanner 
        header="Project Station" 
        subheader="Your Central Command for Structural Detailing"
        image="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685614/banner-image/portal-banner_fg0eae.jpg" 
      />

      {/* Intro Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[#6abd45] font-bold text-sm uppercase tracking-widest mb-4">What is Project Station?</h2>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-8">
                Structural Detailing Project Management is now <span className="text-[#6abd45]">Seamless.</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 text-justify">
                Project Station is Whiteboard Technical's proprietary tool designed to bridge the gap between complexity and clarity. 
                Whether you are a fabricator, detailer, or project manager, Project Station provides a centralized hub to manage every 
                facet of your structural projects.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="bg-[#6abd45]/10 p-2 rounded-full">
                    <ShieldCheck className="w-5 h-5 text-[#6abd45]" />
                  </div>
                  <span className="font-medium text-lg">Secure & Enterprise Grade</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="bg-[#6abd45]/10 p-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-[#6abd45]" />
                  </div>
                  <span className="font-medium text-lg">Real-time Tracking & Feedback</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white group"
            >
              <img 
                src="/assets/images/portal/dashboard-preview.png" 
                alt="Project Station Dashboard Preview" 
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto container px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#6abd45] font-bold text-sm uppercase tracking-widest mb-4">The Workflow</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">How Project Station Works</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative text-center group"
              >
                <div className="text-8xl font-black text-slate-50 absolute -top-10 left-1/2 -translate-x-1/2 -z-10 transition-colors group-hover:text-[#6abd45]/5">
                  {step.number}
                </div>
                <div className="bg-[#6abd45] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-6 shadow-lg shadow-[#6abd45]/30">
                  {idx + 1}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h4>
                <p className="text-slate-600 px-4 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto container px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#6abd45] font-bold text-sm uppercase tracking-widest mb-4">Core Capabilities</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Features Designed for Precision</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-[#6abd45]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon || <CheckCircle2 className="w-8 h-8 text-[#6abd45]" />}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Communication Section */}
      <section className="py-20 relative overflow-hidden bg-[#6abd45]">
        <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto container px-6 relative z-10 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
             >
                <h2 className="text-white/80 font-bold text-sm uppercase tracking-widest mb-4">Seamless Communication</h2>
                <h3 className="text-3xl md:text-4xl font-bold mb-8">Bridging the Gap Between Teams</h3>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Project Station isn't just a document storage tool—it's a communication powerhouse. 
                  Reduce RFI turnaround times, resolve drawing conflicts instantly, and ensure 
                  everyone is looking at the latest approved version.
                </p>
                <ul className="space-y-4">
                  {[
                    "Direct team communication",
                    "Push notifications for critical updates",
                    "Mobile-first design for on-site reviews",
                    "Integrated feedback loop"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white/80" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-2xl"
             >
                <div className="text-center">
                  <h4 className="text-3xl font-bold mb-6 italic">"A tool designed to help you stay responsive and manage all your projects on the go."</h4>
                  <div className="flex justify-center mb-8">
                    <img 
                      src="https://res.cloudinary.com/dp7yxzrgw/image/upload/v1757499575/loginwith_gplziw.png" 
                      alt="Login with Project Station" 
                      className="h-16 w-auto"
                    />
                  </div>
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

      <Newsletter />
    </div>
  );
};

export default Portal;

