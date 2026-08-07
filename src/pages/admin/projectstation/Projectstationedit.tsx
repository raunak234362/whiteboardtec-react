import React, { useState, useEffect, useRef } from "react";
import projectStationData from "../../../data/projectStation.json";
import { Header, Sidebar, useSidebar, PublishPanel } from "../components";
import Portal from "../../portal/Portal";
import { Jodit } from "jodit";
import "jodit/es2021/jodit.min.css";

const JoditWrapper = ({ value, onChange, height = 180 }: { value: string; onChange: (v: string) => void; height?: number }) => {
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
        height: height
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

interface ProjectStationData {
  banner: {
    header: string;
    subheader?: string;
    image: string;
  };
  intro: {
    title: string;
    body: string;
    quote: string;
    buttonText: string;
    buttonUrl: string;
  };
  features: {
    title: string;
  }[];
}

export default function EditProjectStation() {
  const { isSidebarOpen } = useSidebar();
  const [data, setData] = useState<ProjectStationData>(projectStationData as ProjectStationData);

  // Resize Panel State
  const [editorWidth, setEditorWidth] = useState(550);
  const [isDragging, setIsDragging] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const introCardRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const header = { head: "Live Editor: Project Station Content" };

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      // 250px is the Sidebar width. We constrain width between 350px and 950px.
      const newWidth = Math.max(350, Math.min(e.clientX - 250, 950));
      setEditorWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);



  const handleSectionClick = (sectionId: string) => {
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      banner: bannerRef,
      introText: introTextRef,
      introCard: introCardRef,
      features: featuresRef
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
    <section className={`w-full h-screen grid ${isSidebarOpen ? "grid-cols-[260px_1fr]" : "grid-cols-[0px_1fr]"} bg-gray-50 overflow-hidden select-none transition-all duration-300`}>
      {/* App Sidebar */}
      <aside className={`overflow-auto bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? "w-[260px]" : "w-0 border-r-0 overflow-hidden"}`}>
          <Sidebar />
        </aside>

      <main className="flex flex-col h-full overflow-hidden select-text">
        <Header {...header} />

        <div className="flex flex-row h-full overflow-hidden">
          {/* EDITOR PANEL (Resizable Left side) */}
          <div 
            style={{ width: `${editorWidth}px` }}
            className="bg-white border-r flex flex-col h-full overflow-y-auto animate-fade-in transition-all duration-75"
          >
            {/* Publish Actions Sticky Header */}
            <PublishPanel filePath="src/data/projectStation.json" data={data} />

            {/* Form Fields */}
            <div className="p-4 space-y-6 select-text">
              {/* Banner Section */}
              <div className="border-b pb-4 p-2 rounded" ref={bannerRef}>
                <h3 className="text-lg font-semibold mb-2">Banner</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Header (Rich Text)</label>
                <JoditWrapper
                  value={data.banner.header}
                  onChange={(val) => setData(prev => ({ ...prev, banner: { ...prev.banner, header: val } }))}
                  height={120}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Subheader (Rich Text)</label>
                <JoditWrapper
                  value={data.banner.subheader || ""}
                  onChange={(val) => setData(prev => ({ ...prev, banner: { ...prev.banner, subheader: val } }))}
                  height={120}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Image URL</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.banner.image}
                  onChange={(e) => setData(prev => ({ ...prev, banner: { ...prev.banner, image: e.target.value } }))}
                />
              </div>

              {/* Intro Text Section */}
              <div className="border-b pb-4 p-2 rounded" ref={introTextRef}>
                <h3 className="text-lg font-semibold mb-2">Intro Text Section</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Section Title (Rich Text)</label>
                <JoditWrapper
                  value={data.intro.title}
                  onChange={(val) => setData(prev => ({ ...prev, intro: { ...prev.intro, title: val } }))}
                  height={120}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Body Paragraph (HTML enabled)</label>
                <JoditWrapper
                  value={data.intro.body}
                  onChange={(val) => setData(prev => ({ ...prev, intro: { ...prev.intro, body: val } }))}
                />
              </div>

              {/* Intro Card Section */}
              <div className="border-b pb-4 p-2 rounded" ref={introCardRef}>
                <h3 className="text-lg font-semibold mb-2">Intro Call-out Card</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Quote Text (Rich Text)</label>
                <JoditWrapper
                  value={data.intro.quote}
                  onChange={(val) => setData(prev => ({ ...prev, intro: { ...prev.intro, quote: val } }))}
                  height={120}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Button Text</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.intro.buttonText}
                  onChange={(e) => setData(prev => ({ ...prev, intro: { ...prev.intro, buttonText: e.target.value } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1">Button Destination URL</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.intro.buttonUrl}
                  onChange={(e) => setData(prev => ({ ...prev, intro: { ...prev.intro, buttonUrl: e.target.value } }))}
                />
              </div>

              {/* Features List Section */}
              <div className="pb-4 p-2 rounded" ref={featuresRef}>
                <h3 className="text-lg font-semibold mb-2">Core Capabilities</h3>
                {data.features.map((feature, idx) => (
                  <div key={idx} className="flex flex-row items-center mb-2 gap-2">
                    <input
                      className="flex-1 border p-2 rounded text-sm"
                      value={feature.title}
                      onChange={(e) => setData(prev => {
                        const newF = [...prev.features];
                        newF[idx] = { ...newF[idx], title: e.target.value };
                        return { ...prev, features: newF };
                      })}
                    />
                    <button 
                      onClick={() => {
                        if (window.confirm(`Are you sure to delete this section: "Capability: ${feature.title || "Untitled"}"?`)) {
                          setData(prev => {
                            const newF = [...prev.features];
                            newF.splice(idx, 1);
                            return { ...prev, features: newF };
                          });
                        }
                      }}
                      className="px-3 py-2 border border-red-600 text-red-600 bg-white hover:bg-red-50 font-bold uppercase rounded-sm transition-all shadow-sm text-xs"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ 
                    ...prev, 
                    features: [...prev.features, { title: "New Capability" }] 
                  }))}
                  className="mt-2 w-full py-1.5 border border-dashed border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 rounded-sm text-xs font-bold uppercase transition-all shadow-sm"
                >
                  + Add Capability
                </button>
              </div>

            </div>
          </div>

          {/* Resizer Handle */}
          <div
            onMouseDown={startResizing}
            className={`w-2 bg-gray-200 hover:bg-green-500 cursor-col-resize transition-all duration-150 relative flex items-center justify-center ${
              isDragging ? "bg-green-500 w-2.5" : ""
            }`}
          >
            <div className="w-1 h-12 bg-gray-400 rounded-full"></div>
          </div>

          {/* LIVE PREVIEW PANEL (Right side) */}
          <div className="flex-1 bg-gray-200 overflow-y-auto relative select-none">
            <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded shadow opacity-50 pointer-events-none z-10">Live Preview (Click a section to edit)</div>
            <div className="w-full bg-white min-h-full pb-20 select-text">
              <Portal previewData={data} onSectionClick={handleSectionClick} />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
