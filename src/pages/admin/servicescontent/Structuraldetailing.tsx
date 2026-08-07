import React, { useState, useEffect, useRef } from "react";
import structuralDetailingData from "../../../data/structuralDetailing.json";
import { saveToGithub } from "../../../config/github";
import { Header, Sidebar, SubNavbar, useSidebar } from "../components";
import StructuralSteel from "../../services/StructuralSteel";
import { Jodit } from "jodit";
import "jodit/es2021/jodit.min.css";

const servicesTabs = [
  { name: "Structural Detailing", to: "/admin/services/structural-detailing" },
  { name: "Miscellaneous Detailing", to: "/admin/services/miscellaneous-detailing" },
  { name: "Connection Design", to: "/admin/services/connection-design" },
  { name: "Architectural BIM", to: "/admin/services/architectural-bim" },
  { name: "PEMB Detailing", to: "/admin/services/pemb-detailing" },
  { name: "Rebar Estimation", to: "/admin/services/rebar-estimation" },
  { name: "Steel Estimation", to: "/admin/services/steel-estimation" },
];

const JoditWrapper = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const joditInstance = useRef<any>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (editorRef.current && !joditInstance.current) {
      joditInstance.current = Jodit.make(editorRef.current, {
        events: {
          change: (newVal: string) => {
            onChangeRef.current(newVal);
          }
        },
        height: 200
      });
      joditInstance.current.value = value;
    }
    return () => {
      if (joditInstance.current) {
        joditInstance.current.destruct();
        joditInstance.current = null;
      }
    };
  }, []);

  return <div ref={editorRef} />;
};

interface StructuralDetailingData {
  banner: {
    header: string;
    subheader: string;
    image: string;
  };
  intro: {
    title: string;
    headSection: string[];
  };
  estimate: {
    head: string;
    body: string;
    bullets: string[];
  };
  services: string[];
  portfolio: string[];
}

export default function StructuralDetailing() {
  const { isSidebarOpen } = useSidebar();
  const [data, setData] = useState<StructuralDetailingData>(structuralDetailingData as StructuralDetailingData);
  const [githubToken, setGithubToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const bannerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const estimateRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);

  const header = { head: "Live Editor: Structural Steel Detailing" };

  const handleSave = async () => {
    if (!githubToken) {
      setMessage("Please enter a GitHub Personal Access Token to save changes.");
      return;
    }
    setLoading(true);
    setMessage("Saving to GitHub...");
    try {
      await saveToGithub(
        "src/data/structuralDetailing.json",
        JSON.stringify(data, null, 2),
        githubToken,
        "Update Structural Steel Detailing page content via Admin CMS"
      );
      setMessage("Successfully saved to GitHub! Changes will be reflected shortly.");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionClick = (sectionId: string) => {
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      banner: bannerRef,
      intro: introRef,
      estimate: estimateRef,
      services: servicesRef,
      portfolio: portfolioRef
    };
    
    if (refs[sectionId]?.current) {
      refs[sectionId].current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const el = refs[sectionId].current;
      if (el) {
        el.classList.add('bg-yellow-50', 'transition-colors', 'duration-500');
        setTimeout(() => {
          el.classList.remove('bg-yellow-50');
        }, 1500);
      }
    }
  };

  return (
    <section className={`w-full h-screen grid ${isSidebarOpen ? "grid-cols-[260px_1fr]" : "grid-cols-[0px_1fr]"} bg-gray-50 overflow-hidden transition-all duration-300`}>
      {/* App Sidebar */}
      <aside className={`overflow-auto bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? "w-[260px]" : "w-0 border-r-0 overflow-hidden"}`}>
          <Sidebar />
        </aside>

      <main className="flex flex-col h-full overflow-hidden">
        <Header {...header} />
        <SubNavbar tabs={servicesTabs} />

        <div className="flex flex-row h-full overflow-hidden">
          {/* EDITOR PANEL (Left side) */}
          <div className="w-[550px] bg-white border-r flex flex-col h-full overflow-y-auto">
            {/* Publish Actions Sticky Header */}
            <div className="bg-gray-50 p-4 border-b sticky top-0 z-10 shadow-sm">
              <h3 className="font-bold mb-2">Publish Settings</h3>
              <input
                type="password"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 mb-2 text-sm"
                placeholder="GitHub Token (ghp_...)"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
              />
              <button
                onClick={handleSave}
                disabled={loading}
                className={`w-full py-2 px-4 border rounded font-bold text-sm uppercase transition-all shadow-sm ${
                  loading
                    ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                    : "border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50"
                }`}
              >
                {loading ? "Saving..." : "Update Page"}
              </button>
              {message && (
                <div className={`mt-2 p-2 rounded text-xs ${message.includes("Error") || message.includes("Please enter") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                  {message}
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="p-4 space-y-6">
              {/* Banner Section */}
              <div className="border-b pb-4 p-2 rounded" ref={bannerRef}>
                <h3 className="text-lg font-semibold mb-2">Banner</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Header</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.banner.header}
                  onChange={(e) => setData(prev => ({ ...prev, banner: { ...prev.banner, header: e.target.value } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1">Subheader</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.banner.subheader}
                  onChange={(e) => setData(prev => ({ ...prev, banner: { ...prev.banner, subheader: e.target.value } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1">Image URL</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.banner.image}
                  onChange={(e) => setData(prev => ({ ...prev, banner: { ...prev.banner, image: e.target.value } }))}
                />
              </div>

              {/* Intro Section */}
              <div className="border-b pb-4 p-2 rounded" ref={introRef}>
                <h3 className="text-lg font-semibold mb-2">Intro Section</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                <input
                  className="w-full border p-2 rounded mb-4 text-sm"
                  value={data.intro.title}
                  onChange={(e) => setData(prev => ({ ...prev, intro: { ...prev.intro, title: e.target.value } }))}
                />

                <label className="block text-xs font-medium text-gray-500 mb-2 font-bold">Intro Paragraphs</label>
                {data.intro.headSection.map((pText, idx) => (
                  <div key={idx} className="mb-4 border-l-2 border-green-300 pl-2 relative bg-gray-50 p-2 rounded">
                    <button 
                      onClick={() => setData(prev => {
                        const newP = [...prev.intro.headSection];
                        newP.splice(idx, 1);
                        return { ...prev, intro: { ...prev.intro, headSection: newP } };
                      })}
                      className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs font-bold"
                    >
                      Remove
                    </button>
                    <label className="block text-[10px] text-gray-400 mb-1">Paragraph {idx + 1}</label>
                    <JoditWrapper
                      value={pText}
                      onChange={(val) => setData(prev => {
                        const newP = [...prev.intro.headSection];
                        newP[idx] = val;
                        return { ...prev, intro: { ...prev.intro, headSection: newP } };
                      })}
                    />
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ 
                    ...prev, 
                    intro: { 
                      ...prev.intro, 
                      headSection: [...prev.intro.headSection, "<p>New paragraph content...</p>"] 
                    } 
                  }))}
                  className="mt-2 w-full py-1.5 border border-dashed border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 rounded-sm text-xs font-bold uppercase transition-all shadow-sm"
                >
                  + Add Paragraph
                </button>
              </div>

              {/* Estimate Section */}
              <div className="border-b pb-4 p-2 rounded" ref={estimateRef}>
                <h3 className="text-lg font-semibold mb-2">Estimate Details</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Heading</label>
                <textarea
                  className="w-full border p-2 rounded mb-2 text-sm h-16"
                  value={data.estimate.head}
                  onChange={(e) => setData(prev => ({ ...prev, estimate: { ...prev.estimate, head: e.target.value } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1">Body Text</label>
                <textarea
                  className="w-full border p-2 rounded mb-2 text-sm h-20"
                  value={data.estimate.body}
                  onChange={(e) => setData(prev => ({ ...prev, estimate: { ...prev.estimate, body: e.target.value } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-2">Bullet Points</label>
                {data.estimate.bullets?.map((bullet, idx) => (
                  <div key={idx} className="flex flex-row items-center mb-2 gap-2">
                    <input
                      className="flex-1 border p-2 rounded text-sm"
                      value={bullet}
                      onChange={(e) => setData(prev => {
                        const newBullets = [...(prev.estimate.bullets || [])];
                        newBullets[idx] = e.target.value;
                        return { ...prev, estimate: { ...prev.estimate, bullets: newBullets } };
                      })}
                    />
                    <button 
                      onClick={() => setData(prev => {
                        const newBullets = [...(prev.estimate.bullets || [])];
                        newBullets.splice(idx, 1);
                        return { ...prev, estimate: { ...prev.estimate, bullets: newBullets } };
                      })}
                      className="px-2.5 py-1 bg-red-100 text-red-600 rounded text-xs font-bold hover:bg-red-200"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ 
                    ...prev, 
                    estimate: { 
                      ...prev.estimate, 
                      bullets: [...(prev.estimate.bullets || []), "New Bullet Point"] 
                    } 
                  }))}
                  className="mt-1 w-full py-1.5 border border-dashed border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 rounded-sm text-xs font-bold uppercase transition-all shadow-sm"
                >
                  + Add Bullet Point
                </button>
              </div>

              {/* Services Section */}
              <div className="border-b pb-4 p-2 rounded" ref={servicesRef}>
                <h3 className="text-lg font-semibold mb-2">Our Services</h3>
                {data.services.map((service, idx) => (
                  <div key={idx} className="flex flex-row items-center mb-2 gap-2">
                    <input
                      className="flex-1 border p-2 rounded text-sm"
                      value={service}
                      onChange={(e) => setData(prev => {
                        const newServices = [...prev.services];
                        newServices[idx] = e.target.value;
                        return { ...prev, services: newServices };
                      })}
                    />
                    <button 
                      onClick={() => setData(prev => {
                        const newServices = [...prev.services];
                        newServices.splice(idx, 1);
                        return { ...prev, services: newServices };
                      })}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded text-xs font-bold hover:bg-red-200"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ ...prev, services: [...prev.services, "New Service Item"] }))}
                  className="mt-2 w-full py-1.5 border border-dashed border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 rounded-sm text-xs font-bold uppercase transition-all shadow-sm"
                >
                  + Add Service
                </button>
              </div>

              {/* Portfolio Section */}
              <div className="pb-4 p-2 rounded" ref={portfolioRef}>
                <h3 className="text-lg font-semibold mb-2">Our Portfolio Categories</h3>
                {data.portfolio.map((item, idx) => (
                  <div key={idx} className="flex flex-row items-center mb-2 gap-2">
                    <input
                      className="flex-1 border p-2 rounded text-sm"
                      value={item}
                      onChange={(e) => setData(prev => {
                        const newP = [...prev.portfolio];
                        newP[idx] = e.target.value;
                        return { ...prev, portfolio: newP };
                      })}
                    />
                    <button 
                      onClick={() => setData(prev => {
                        const newP = [...prev.portfolio];
                        newP.splice(idx, 1);
                        return { ...prev, portfolio: newP };
                      })}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded text-xs font-bold hover:bg-red-200"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ ...prev, portfolio: [...prev.portfolio, "New Portfolio Category"] }))}
                  className="mt-2 w-full py-1.5 border border-dashed border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 rounded-sm text-xs font-bold uppercase transition-all shadow-sm"
                >
                  + Add Category
                </button>
              </div>

            </div>
          </div>

          {/* LIVE PREVIEW PANEL (Right side) */}
          <div className="flex-1 bg-gray-200 overflow-y-auto relative">
            <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded shadow opacity-50 pointer-events-none z-10">Live Preview (Click a section to edit)</div>
            <div className="w-full bg-white min-h-full pb-20">
              <StructuralSteel previewData={data} onSectionClick={handleSectionClick} />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
