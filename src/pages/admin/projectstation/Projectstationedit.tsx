import React, { useState, useEffect, useRef } from "react";
import projectStationData from "../../../data/projectStation.json";
import { Header, Sidebar, useSidebar, PublishPanel, RichTextEditor } from "../components";
import Portal from "../../portal/Portal";

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
  const [mode, setMode] = useState<"split" | "preview">("split");
  const [isChangingMode, setIsChangingMode] = useState(false);

  const handleModeChange = (newMode: "split" | "preview") => {
    if (newMode === mode) return;
    setIsChangingMode(true);
    setTimeout(() => {
      setMode(newMode);
      setIsChangingMode(false);
    }, 600);
  };
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

        {/* Mode Switcher Tabs */}
        <div className="bg-white border-b px-6 py-2.5 flex items-center justify-center shadow-sm z-10">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
              type="button"
              onClick={() => handleModeChange("split")}
              style={{
                backgroundColor: mode === "split" ? "#6abd45" : "transparent",
                color: mode === "split" ? "#ffffff" : "#000000"
              }}
              className="px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-sm focus:outline-none"
            >
              Split View
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("preview")}
              style={{
                backgroundColor: mode === "preview" ? "#6abd45" : "transparent",
                color: mode === "preview" ? "#ffffff" : "#000000"
              }}
              className="px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-sm focus:outline-none"
            >
              Live Preview
            </button>
          </div>
        </div>

        {isChangingMode ? (
          <div className="flex-grow flex flex-col justify-center items-center bg-gray-50 h-full">
            <div className="relative flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#6abd45]"></div>
              <div className="absolute text-[#6abd45] font-bold text-xs uppercase tracking-widest animate-pulse">
                WBT
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4 font-semibold uppercase tracking-widest animate-pulse">
              Loading Layout...
            </p>
          </div>
        ) : (
          <div className="flex flex-row h-full overflow-hidden">
          {/* EDITOR PANEL (Resizable Left side) */}
          {mode === "split" && (
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
                <RichTextEditor
                  value={data.banner.header}
                  onChange={(val) => setData(prev => ({ ...prev, banner: { ...prev.banner, header: val } }))}
                  height={120}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Subheader (Rich Text)</label>
                <RichTextEditor
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
                <RichTextEditor
                  value={data.intro.title}
                  onChange={(val) => setData(prev => ({ ...prev, intro: { ...prev.intro, title: val } }))}
                  height={120}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Body Paragraph (HTML enabled)</label>
                <RichTextEditor
                  value={data.intro.body}
                  onChange={(val) => setData(prev => ({ ...prev, intro: { ...prev.intro, body: val } }))}
                />
              </div>

              {/* Intro Card Section */}
              <div className="border-b pb-4 p-2 rounded" ref={introCardRef}>
                <h3 className="text-lg font-semibold mb-2">Intro Call-out Card</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Quote Text (Rich Text)</label>
                <RichTextEditor
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
          )}


          {/* Resizer Handle */}
          {mode === "split" && (
            <div
            onMouseDown={startResizing}
            className={`w-2 bg-gray-200 hover:bg-green-500 cursor-col-resize transition-all duration-150 relative flex items-center justify-center ${
              isDragging ? "bg-green-500 w-2.5" : ""
            }`}
          >
            <div className="w-1 h-12 bg-gray-400 rounded-full"></div>
          </div>
          )}

          {/* LIVE PREVIEW PANEL (Right side) */}
          <div className="flex-1 bg-gray-200 overflow-y-auto relative select-none">
            <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded shadow opacity-50 pointer-events-none z-10">Live Preview (Click a section to edit)</div>
            <div className="w-full bg-white min-h-full pb-20 select-text">
              <Portal previewData={data} onSectionClick={mode === "split" ? handleSectionClick : undefined} />
            </div>
          </div>
          </div>
        )}
      </main>
    </section>
  );
}
