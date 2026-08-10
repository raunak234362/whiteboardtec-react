import React, { useState, useEffect, useRef } from "react";
import miscellaneousDetailingData from "../../../data/miscellaneousDetailing.json";
import { Header, Sidebar, useSidebar, PublishPanel, RichTextEditor } from "../components";
import MiscellaneousSteel from "../../services/MiscellaneousSteel";

interface MiscTypeItem {
  title: string;
  description: string[];
}

interface MiscellaneousDetailingData {
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
  capabilities: string[];
  miscTypes: MiscTypeItem[];
}

export default function EditMiscellaneousDetailing() {
  const { isSidebarOpen } = useSidebar();
  const [editorWidth, setEditorWidth] = useState(550);
  const [isDragging, setIsDragging] = useState(false);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
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
  const [data, setData] = useState<MiscellaneousDetailingData>(miscellaneousDetailingData as MiscellaneousDetailingData);

  const bannerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const estimateRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const miscTypesRef = useRef<HTMLDivElement>(null);

  const header = { head: "Live Editor: Miscellaneous Steel Detailing" };



  const handleSectionClick = (sectionId: string) => {
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      banner: bannerRef,
      intro: introRef,
      estimate: estimateRef,
      capabilities: capabilitiesRef,
      miscTypes: miscTypesRef
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
          {/* EDITOR PANEL (Left side) */}
          {mode === "split" && (
          <div style={{ width: `${editorWidth}px` }} className="bg-white border-r flex flex-col h-full overflow-y-auto transition-all duration-75 animate-fade-in">
            {/* Publish Actions Sticky Header */}
            <PublishPanel filePath="src/data/miscellaneousDetailing.json" data={data} />

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
                <label className="block text-xs font-medium text-gray-500 mb-1">Heading Title</label>
                <RichTextEditor
                  value={data.intro.title}
                  onChange={(val) => setData(prev => ({ ...prev, intro: { ...prev.intro, title: val } }))}
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
                    <RichTextEditor
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
                <RichTextEditor
                  value={data.estimate.head}
                  onChange={(val) => setData(prev => ({ ...prev, estimate: { ...prev.estimate, head: val } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1">Body Text</label>
                <RichTextEditor
                  value={data.estimate.body}
                  onChange={(val) => setData(prev => ({ ...prev, estimate: { ...prev.estimate, body: val } }))}
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

              {/* Capabilities Section */}
              <div className="border-b pb-4 p-2 rounded" ref={capabilitiesRef}>
                <h3 className="text-lg font-semibold mb-2">Team Capabilities</h3>
                {data.capabilities.map((item, idx) => (
                  <div key={idx} className="flex flex-row items-center mb-2 gap-2">
                    <input
                      className="flex-1 border p-2 rounded text-sm"
                      value={item}
                      onChange={(e) => setData(prev => {
                        const newCap = [...prev.capabilities];
                        newCap[idx] = e.target.value;
                        return { ...prev, capabilities: newCap };
                      })}
                    />
                    <button 
                      onClick={() => setData(prev => {
                        const newCap = [...prev.capabilities];
                        newCap.splice(idx, 1);
                        return { ...prev, capabilities: newCap };
                      })}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded text-xs font-bold hover:bg-red-200"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ ...prev, capabilities: [...prev.capabilities, "New Capability Item"] }))}
                  className="mt-2 w-full py-1.5 border border-dashed border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 rounded-sm text-xs font-bold uppercase transition-all shadow-sm"
                >
                  + Add Capability
                </button>
              </div>

              {/* MiscTypes Section */}
              <div className="pb-4 p-2 rounded" ref={miscTypesRef}>
                <h3 className="text-lg font-semibold mb-2">Specification & Material Types</h3>
                {data.miscTypes.map((section, secIdx) => (
                  <div key={secIdx} className="mb-6 border-l-4 border-green-500 pl-3 relative bg-gray-50 p-3 rounded">
                    <button 
                      onClick={() => {
                        setData(prev => {
                          const newSections = [...prev.miscTypes];
                          newSections.splice(secIdx, 1);
                          return { ...prev, miscTypes: newSections };
                        });
                      }}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold"
                    >
                      Remove Section
                    </button>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Section Title</label>
                    <input
                      className="w-full border p-2 rounded mb-3 text-sm font-semibold"
                      value={section.title}
                      onChange={(e) => {
                        setData(prev => {
                          const newSections = [...prev.miscTypes];
                          newSections[secIdx] = { ...newSections[secIdx], title: e.target.value };
                          return { ...prev, miscTypes: newSections };
                        });
                      }}
                    />
                    <label className="block text-xs font-medium text-gray-500 mb-1">Items List</label>
                    {section.description.map((descItem, descIdx) => (
                      <div key={descIdx} className="flex flex-row items-center mb-2 gap-2">
                        <input
                          className="flex-1 border p-1.5 rounded text-xs bg-white"
                          value={descItem}
                          onChange={(e) => {
                            setData(prev => {
                              const newSections = [...prev.miscTypes];
                              const newDesc = [...newSections[secIdx].description];
                              newDesc[descIdx] = e.target.value;
                              newSections[secIdx] = { ...newSections[secIdx], description: newDesc };
                              return { ...prev, miscTypes: newSections };
                            });
                          }}
                        />
                        <button 
                          onClick={() => {
                            setData(prev => {
                              const newSections = [...prev.miscTypes];
                              const newDesc = [...newSections[secIdx].description];
                              newDesc.splice(descIdx, 1);
                              newSections[secIdx] = { ...newSections[secIdx], description: newDesc };
                              return { ...prev, miscTypes: newSections };
                            });
                          }}
                          className="px-2 py-1 bg-red-100 text-red-600 rounded text-[10px] font-bold hover:bg-red-200"
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => setData(prev => {
                        const newSections = [...prev.miscTypes];
                        newSections[secIdx] = {
                          ...newSections[secIdx],
                          description: [...newSections[secIdx].description, "New Item"]
                        };
                        return { ...prev, miscTypes: newSections };
                      })}
                      className="mt-1 w-full py-1 bg-green-100 text-green-700 rounded text-[11px] font-semibold hover:bg-green-200 transition-colors"
                    >
                      + Add Item to {section.title}
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ 
                    ...prev, 
                    miscTypes: [
                      ...prev.miscTypes, 
                      { 
                        title: "New Category Section", 
                        description: ["Item A", "Item B"] 
                      }
                    ] 
                  }))}
                  className="mt-2 w-full py-1.5 border border-dashed border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 rounded-sm text-xs font-bold uppercase transition-all shadow-sm"
                >
                  + Add New Category Section
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
          <div className="flex-1 bg-gray-200 overflow-y-auto relative">
            <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded shadow opacity-50 pointer-events-none z-10">Live Preview (Click a section to edit)</div>
            <div className="w-full bg-white min-h-full pb-20">
              <MiscellaneousSteel previewData={data} onSectionClick={mode === "split" ? handleSectionClick : undefined} />
            </div>
          </div>
          </div>
        )}
      </main>
    </section>
  );
}
