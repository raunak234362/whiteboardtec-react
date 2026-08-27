import React, { useState, useEffect } from "react";
import notificationData from "../../data/notification.json";
import { Header, Sidebar, useSidebar, PublishPanel } from "./components";
import { HomeNav, NotificationType } from "../../components/navigation";

export default function EditNotification() {
  const { isSidebarOpen } = useSidebar();
  const [data, setData] = useState<NotificationType>(notificationData as NotificationType);

  // Resize Panel State
  const [editorWidth, setEditorWidth] = useState(550);
  const [isDragging, setIsDragging] = useState(false);

  // Mode View State: split (edit + preview) or preview (preview only)
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

  const header = { head: "Live Editor: Notification Popup" };

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
                <PublishPanel filePath="src/data/notification.json" data={data} />

                {/* Form Fields */}
                <div className="p-4 space-y-6 select-text">
                  
                  {/* Enable / Disable Toggle Option */}
                  <div className="border border-gray-200 p-4 rounded-xl bg-gray-50/50 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
                      Popup Enable / Disable Status
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">
                      Control whether the notification modal popup appears when visitors arrive on the homepage.
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="notificationEnabled"
                          checked={data.enabled !== false}
                          onChange={() => setData(prev => ({ ...prev, enabled: true }))}
                          className="w-4 h-4 text-[#6abd45] focus:ring-[#6abd45]"
                        />
                        <span className="text-sm font-semibold text-gray-800">
                          True (Show Notification Popup)
                        </span>
                      </label>
                      
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="notificationEnabled"
                          checked={data.enabled === false}
                          onChange={() => setData(prev => ({ ...prev, enabled: false }))}
                          className="w-4 h-4 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm font-semibold text-gray-800">
                          False (Hide Popup)
                        </span>
                      </label>
                    </div>

                    <div className="mt-3">
                      <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-bold ${data.enabled !== false ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"}`}>
                        Current Status: {data.enabled !== false ? "ENABLED (Visible on Homepage)" : "DISABLED (Hidden)"}
                      </span>
                    </div>
                  </div>

                  {/* Notification Content Fields */}
                  <div className="border border-gray-200 p-4 rounded-xl bg-white shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b pb-2">
                      Notification Details
                    </h3>

                    {/* Title */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Notification Title
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 p-2.5 rounded-md text-sm focus:ring-2 focus:ring-[#6abd45] focus:outline-none"
                        placeholder="Enter notification title..."
                        value={data.title || ""}
                        onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Description Text
                      </label>
                      <textarea
                        rows={3}
                        className="w-full border border-gray-300 p-2.5 rounded-md text-sm focus:ring-2 focus:ring-[#6abd45] focus:outline-none"
                        placeholder="Enter notification description..."
                        value={data.description || ""}
                        onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 p-2.5 rounded-md text-sm focus:ring-2 focus:ring-[#6abd45] focus:outline-none"
                        placeholder="https://res.cloudinary.com/..."
                        value={data.image || ""}
                        onChange={(e) => setData(prev => ({ ...prev, image: e.target.value }))}
                      />
                      {data.image && (
                        <div className="mt-2 border rounded p-1 max-w-[200px] bg-gray-50">
                          <img src={data.image} alt="Preview" className="w-full h-auto rounded" />
                        </div>
                      )}
                    </div>

                    {/* Optional Action Link */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Button Action Link (Optional)
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 p-2.5 rounded-md text-sm focus:ring-2 focus:ring-[#6abd45] focus:outline-none"
                        placeholder="https://example.com or /services (Optional)"
                        value={data.link || ""}
                        onChange={(e) => setData(prev => ({ ...prev, link: e.target.value }))}
                      />
                      <p className="text-[11px] text-gray-400 mt-1">
                        If left blank, only the Close button will be displayed.
                      </p>
                    </div>
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
              <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded shadow opacity-50 pointer-events-none z-10">
                Live Preview
              </div>
              <div className="w-full bg-white min-h-full pb-20 select-text">
                <HomeNav previewNotification={data} />
              </div>
            </div>

          </div>
        )}
      </main>
    </section>
  );
}
