import React, { useState, useRef } from "react";
import businessModelData from "../../../data/businessModel.json";
import { Header, Sidebar, useSidebar, PublishPanel, RichTextEditor } from "../components";
import BusiessModel from "../../ourFirm/BusinessModel";

interface ModelItem {
  icon: string;
  head: string;
  body: string;
}

interface BusinessModelData {
  banner: {
    header: string;
    image: string;
  };
  estimate: {
    head: string;
  };
  models: ModelItem[];
}

export default function EditBusinessModel() {
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
  const [data, setData] = useState<BusinessModelData>(businessModelData as BusinessModelData);

  const bannerRef = useRef<HTMLDivElement>(null);
  const estimateRef = useRef<HTMLDivElement>(null);
  const modelsRef = useRef<HTMLDivElement>(null);

  const header = { head: "Live Editor: Business Model" };

  const handleSectionClick = (sectionId: string) => {
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      banner: bannerRef,
      estimate: estimateRef,
      models: modelsRef
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
          <div className="w-[550px] bg-white border-r flex flex-col h-full overflow-y-auto animate-fade-in">
            {/* Publish Actions Sticky Header */}
            <PublishPanel filePath="src/data/businessModel.json" data={data} />

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
                <label className="block text-xs font-medium text-gray-500 mb-1">Image URL</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.banner.image}
                  onChange={(e) => setData(prev => ({ ...prev, banner: { ...prev.banner, image: e.target.value } }))}
                />
              </div>

              {/* Estimate Section */}
              <div className="border-b pb-4 p-2 rounded" ref={estimateRef}>
                <h3 className="text-lg font-semibold mb-2">Estimate Header</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Heading</label>
                <textarea
                  className="w-full border p-2 rounded mb-2 text-sm h-20"
                  value={data.estimate.head}
                  onChange={(e) => setData(prev => ({ ...prev, estimate: { ...prev.estimate, head: e.target.value } }))}
                />
              </div>

              {/* Models Section */}
              <div className="pb-4 p-2 rounded" ref={modelsRef}>
                <h3 className="text-lg font-semibold mb-2">Business Models</h3>
                {data.models.map((item, idx) => (
                  <div key={idx} className="mb-6 border-l-4 border-[#6abd45] pl-3 relative bg-gray-50 p-2 rounded">
                    <button 
                      onClick={() => {
                        setData(prev => {
                          const newArr = [...prev.models];
                          newArr.splice(idx, 1);
                          return { ...prev, models: newArr };
                        });
                      }}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold"
                    >
                      Remove
                    </button>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Model Name</label>
                    <input
                      className="w-full border p-2 rounded mb-2 text-sm font-semibold"
                      value={item.head}
                      onChange={(e) => {
                        setData(prev => {
                          const newArr = [...prev.models];
                          newArr[idx] = { ...newArr[idx], head: e.target.value };
                          return { ...prev, models: newArr };
                        });
                      }}
                    />
                    <label className="block text-xs font-medium text-gray-500 mb-1">Icon URL</label>
                    <input
                      className="w-full border p-2 rounded mb-2 text-sm"
                      value={item.icon}
                      onChange={(e) => {
                        setData(prev => {
                          const newArr = [...prev.models];
                          newArr[idx] = { ...newArr[idx], icon: e.target.value };
                          return { ...prev, models: newArr };
                        });
                      }}
                    />
                    <label className="block text-xs font-medium text-gray-500 mb-1 mt-2">Description</label>
                    <RichTextEditor
                      value={item.body}
                      onChange={(val) => {
                        setData(prev => {
                          const newArr = [...prev.models];
                          newArr[idx] = { ...newArr[idx], body: val };
                          return { ...prev, models: newArr };
                        });
                      }}
                    />
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ 
                    ...prev, 
                    models: [
                      ...prev.models, 
                      { 
                        icon: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685578/icons/process_skpasx.png", 
                        head: "New Business Model", 
                        body: "<p>Description of the new business model...</p>" 
                      }
                    ] 
                  }))}
                  className="mt-2 w-full py-2 bg-green-50 text-[#6abd45] border border-[#6abd45] border-dashed rounded text-sm font-semibold hover:bg-green-100 transition-colors"
                >
                  + Add Business Model
                </button>
              </div>
            </div>
          </div>
          )}


          {/* LIVE PREVIEW PANEL (Right side) */}
          <div className="flex-1 bg-gray-200 overflow-y-auto relative">
            <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded shadow opacity-50 pointer-events-none z-10">Live Preview (Click a section to edit)</div>
            <div className="w-full bg-white min-h-full pb-20">
              <BusiessModel previewData={data} onSectionClick={mode === "split" ? handleSectionClick : undefined} />
            </div>
          </div>
          </div>
        )}
      </main>
    </section>
  );
}
