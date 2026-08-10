import React, { useState, useEffect, useRef } from "react";
import connectData from "../../../data/connect.json";
import { Header, Sidebar, useSidebar, PublishPanel, RichTextEditor } from "../components";
import Connect from "../../connect/Connect";

interface ConnectPageData {
  banner: {
    header: string;
    subheader: string;
    image: string;
  };
  context: {
    heading: string;
    body: string;
    phone: {
      primary: string;
      secondary?: string;
    }[];
    mail: {
      email: string;
    }[];
    address: {
      title: string;
      addrLine1: string;
      addrLine2?: string;
      addrLine3?: string;
      phone?: string;
    }[];
  };
  form: {
    title: string;
    field: {
      name: string;
      type: string;
      placeholder: string;
    }[];
  };
}

export default function EditConnect() {
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
  const [data, setData] = useState<ConnectPageData>(connectData as ConnectPageData);

  // Resize Panel State
  const [editorWidth, setEditorWidth] = useState(550);
  const [isDragging, setIsDragging] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);
  const mailsRef = useRef<HTMLDivElement>(null);
  const addressesRef = useRef<HTMLDivElement>(null);

  const header = { head: "Live Editor: Connect Page" };

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
      intro: introRef,
      phones: phonesRef,
      mails: mailsRef,
      addresses: addressesRef
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
          {/* EDITOR PANEL (Left side) */}
          {mode === "split" && (
          <div 
            style={{ width: `${editorWidth}px` }}
            className="bg-white border-r flex flex-col h-full overflow-y-auto animate-fade-in transition-all duration-75"
          >
            {/* Publish Actions Sticky Header */}
            <PublishPanel filePath="src/data/connect.json" data={data} />

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
                  value={data.banner.subheader}
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

              {/* Intro Section */}
              <div className="border-b pb-4 p-2 rounded" ref={introRef}>
                <h3 className="text-lg font-semibold mb-2">Intro Section</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Heading Title (Rich Text)</label>
                <RichTextEditor
                  value={data.context.heading}
                  onChange={(val) => setData(prev => ({ ...prev, context: { ...prev.context, heading: val } }))}
                  height={120}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Body Text (HTML enabled)</label>
                <RichTextEditor
                  value={data.context.body}
                  onChange={(val) => setData(prev => ({ ...prev, context: { ...prev.context, body: val } }))}
                />
              </div>

              {/* Phones Section */}
              <div className="border-b pb-4 p-2 rounded" ref={phonesRef}>
                <h3 className="text-lg font-semibold mb-2">Support Phone Numbers</h3>
                {data.context.phone.map((phone, idx) => (
                  <div key={idx} className="mb-4 border-l-2 border-green-300 pl-2 bg-gray-50 p-2 rounded relative">
                    <button 
                      onClick={() => {
                        if (window.confirm(`Are you sure to delete this section: "Phone: ${phone.primary || "Untitled"}"?`)) {
                          setData(prev => {
                            const newP = [...prev.context.phone];
                            newP.splice(idx, 1);
                            return { ...prev, context: { ...prev.context, phone: newP } };
                          });
                        }
                      }}
                      className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs font-bold bg-white border rounded shadow-sm px-1.5 py-0.5"
                    >
                      Delete
                    </button>
                    <label className="block text-[10px] text-gray-400 mb-1 font-semibold">Primary Number</label>
                    <input
                      className="w-full border p-2 rounded text-sm mb-2"
                      value={phone.primary}
                      onChange={(e) => setData(prev => {
                        const newP = [...prev.context.phone];
                        newP[idx] = { ...newP[idx], primary: e.target.value };
                        return { ...prev, context: { ...prev.context, phone: newP } };
                      })}
                    />
                    <label className="block text-[10px] text-gray-400 mb-1 font-semibold">Secondary Number (Optional)</label>
                    <input
                      className="w-full border p-2 rounded text-sm"
                      value={phone.secondary || ""}
                      onChange={(e) => setData(prev => {
                        const newP = [...prev.context.phone];
                        newP[idx] = { ...newP[idx], secondary: e.target.value };
                        return { ...prev, context: { ...prev.context, phone: newP } };
                      })}
                    />
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ 
                    ...prev, 
                    context: { 
                      ...prev.context, 
                      phone: [...prev.context.phone, { primary: "1-XXX-XXX-XXXX" }] 
                    } 
                  }))}
                  className="mt-2 w-full py-1.5 bg-green-50 text-[#6abd45] border border-[#6abd45] border-dashed rounded text-xs font-semibold hover:bg-green-100 transition-colors"
                >
                  + Add Phone Number
                </button>
              </div>

              {/* Mails Section */}
              <div className="border-b pb-4 p-2 rounded" ref={mailsRef}>
                <h3 className="text-lg font-semibold mb-2">Email Contacts</h3>
                {data.context.mail.map((mail, idx) => (
                  <div key={idx} className="flex flex-row items-center mb-2 gap-2">
                    <input
                      className="flex-1 border p-2 rounded text-sm"
                      value={mail.email}
                      onChange={(e) => setData(prev => {
                        const newM = [...prev.context.mail];
                        newM[idx] = { ...newM[idx], email: e.target.value };
                        return { ...prev, context: { ...prev.context, mail: newM } };
                      })}
                    />
                    <button 
                      onClick={() => {
                        if (window.confirm(`Are you sure to delete this section: "Email: ${mail.email || "Untitled"}"?`)) {
                          setData(prev => {
                            const newM = [...prev.context.mail];
                            newM.splice(idx, 1);
                            return { ...prev, context: { ...prev.context, mail: newM } };
                          });
                        }
                      }}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded text-xs font-bold hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ 
                    ...prev, 
                    context: { 
                      ...prev.context, 
                      mail: [...prev.context.mail, { email: "contact@whiteboardtec.com" }] 
                    } 
                  }))}
                  className="mt-2 w-full py-1.5 bg-green-50 text-[#6abd45] border border-[#6abd45] border-dashed rounded text-xs font-semibold hover:bg-green-100 transition-colors"
                >
                  + Add Email Contact
                </button>
              </div>

              {/* Addresses Section */}
              <div className="pb-4 p-2 rounded" ref={addressesRef}>
                <h3 className="text-lg font-semibold mb-2">Office Addresses</h3>
                {data.context.address.map((addr, idx) => (
                  <div key={idx} className="mb-6 border-l-2 border-[#6abd45] pl-2 bg-gray-50 p-2 rounded relative">
                    <button 
                      onClick={() => {
                        const name = addr.title.replace(/<[^>]*>/g, "") || `Office #${idx + 1}`;
                        if (window.confirm(`Are you sure to delete this section: "${name}"?`)) {
                          setData(prev => {
                            const newAddrs = [...prev.context.address];
                            newAddrs.splice(idx, 1);
                            return { ...prev, context: { ...prev.context, address: newAddrs } };
                          });
                        }
                      }}
                      className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs font-bold bg-white border rounded shadow-sm px-1.5 py-0.5"
                    >
                      Delete
                    </button>
                    <label className="block text-[10px] text-gray-400 mb-1 font-semibold">Office Title (Rich Text)</label>
                    <RichTextEditor
                      value={addr.title}
                      onChange={(val) => setData(prev => {
                        const newAddrs = [...prev.context.address];
                        newAddrs[idx] = { ...newAddrs[idx], title: val };
                        return { ...prev, context: { ...prev.context, address: newAddrs } };
                      })}
                      height={100}
                    />
                    <label className="block text-[10px] text-gray-400 mb-1 mt-3 font-semibold">Address Line 1</label>
                    <input
                      className="w-full border p-2 rounded text-sm mb-2"
                      value={addr.addrLine1}
                      onChange={(e) => setData(prev => {
                        const newAddrs = [...prev.context.address];
                        newAddrs[idx] = { ...newAddrs[idx], addrLine1: e.target.value };
                        return { ...prev, context: { ...prev.context, address: newAddrs } };
                      })}
                    />
                    <label className="block text-[10px] text-gray-400 mb-1 font-semibold">Address Line 2</label>
                    <input
                      className="w-full border p-2 rounded text-sm mb-2"
                      value={addr.addrLine2 || ""}
                      onChange={(e) => setData(prev => {
                        const newAddrs = [...prev.context.address];
                        newAddrs[idx] = { ...newAddrs[idx], addrLine2: e.target.value };
                        return { ...prev, context: { ...prev.context, address: newAddrs } };
                      })}
                    />
                    <label className="block text-[10px] text-gray-400 mb-1 font-semibold">Address Line 3</label>
                    <input
                      className="w-full border p-2 rounded text-sm mb-2"
                      value={addr.addrLine3 || ""}
                      onChange={(e) => setData(prev => {
                        const newAddrs = [...prev.context.address];
                        newAddrs[idx] = { ...newAddrs[idx], addrLine3: e.target.value };
                        return { ...prev, context: { ...prev.context, address: newAddrs } };
                      })}
                    />
                    <label className="block text-[10px] text-gray-400 mb-1 font-semibold">Phone Number (Optional)</label>
                    <input
                      className="w-full border p-2 rounded text-sm"
                      value={addr.phone || ""}
                      onChange={(e) => setData(prev => {
                        const newAddrs = [...prev.context.address];
                        newAddrs[idx] = { ...newAddrs[idx], phone: e.target.value };
                        return { ...prev, context: { ...prev.context, address: newAddrs } };
                      })}
                    />
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ 
                    ...prev, 
                    context: { 
                      ...prev.context, 
                      address: [...prev.context.address, { title: "New Office", addrLine1: "Address detail..." }] 
                    } 
                  }))}
                  className="mt-2 w-full py-1.5 bg-green-50 text-[#6abd45] border border-[#6abd45] border-dashed rounded text-xs font-semibold hover:bg-green-100 transition-colors"
                >
                  + Add Address
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
              <Connect previewData={data} onSectionClick={mode === "split" ? handleSectionClick : undefined} />
            </div>
          </div>
          </div>
        )}
      </main>
    </section>
  );
}
