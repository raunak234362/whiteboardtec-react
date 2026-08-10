import React, { useState, useEffect, useRef } from "react";
import careersData from "../../../data/careers.json";
import { saveToGithub } from "../../../config/github";
import { Header, Sidebar, useSidebar } from "../components";
import Careers from "../../careers/Careers";
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

interface CareersData {
  banner: {
    header: string;
    subheader: string;
    image: string;
  };
  headSection: {
    title: string;
    description: string[];
    tagline: string[];
  };
  campusRecruitment: {
    title: string;
    location: string;
    jobType: string;
    qualification: string;
    registerUrl: string;
    testUrl: string;
    note: string;
  };
  treeData: {
    icon: string;
    head: string;
    body: string;
  }[];
  equalOpportunity: {
    title: string;
    body: string;
    image: string;
  };
}

export default function EditCareers() {
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
  const [data, setData] = useState<CareersData>(careersData as CareersData);
  const [githubToken, setGithubToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Resize Panel State
  const [editorWidth, setEditorWidth] = useState(550);
  const [isDragging, setIsDragging] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);
  const headSectionRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const campusRecruitmentRef = useRef<HTMLDivElement>(null);
  const treeDataRef = useRef<HTMLDivElement>(null);
  const equalOpportunityRef = useRef<HTMLDivElement>(null);

  const header = { head: "Live Editor: Careers Page" };

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

  const handleSave = async () => {
    if (!githubToken) {
      setMessage("Please enter a GitHub Personal Access Token to save changes.");
      return;
    }
    setLoading(true);
    setMessage("Saving to GitHub...");
    try {
      await saveToGithub(
        "src/data/careers.json",
        JSON.stringify(data, null, 2),
        githubToken,
        "Update Careers page content via Admin CMS"
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
      headSection: headSectionRef,
      tagline: taglineRef,
      campusRecruitment: campusRecruitmentRef,
      treeData: treeDataRef,
      equalOpportunity: equalOpportunityRef
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

              {/* Head Section */}
              <div className="border-b pb-4 p-2 rounded" ref={headSectionRef}>
                <h3 className="text-lg font-semibold mb-2">Intro Section</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Heading Title (Rich Text)</label>
                <JoditWrapper
                  value={data.headSection.title}
                  onChange={(val) => setData(prev => ({ ...prev, headSection: { ...prev.headSection, title: val } }))}
                  height={120}
                />

                <label className="block text-xs font-medium text-gray-500 mb-2 mt-4 font-bold">Intro Paragraphs</label>
                {data.headSection.description.map((pText, idx) => (
                  <div key={idx} className="mb-4 border-l-2 border-green-300 pl-2 relative bg-gray-50 p-2 rounded">
                    <button 
                      onClick={() => {
                        if (window.confirm(`Are you sure to delete this section: "Paragraph ${idx + 1}"?`)) {
                          setData(prev => {
                            const newP = [...prev.headSection.description];
                            newP.splice(idx, 1);
                            return { ...prev, headSection: { ...prev.headSection, description: newP } };
                          });
                        }
                      }}
                      className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs font-bold bg-white border rounded shadow-sm px-1.5 py-0.5"
                    >
                      Delete
                    </button>
                    <label className="block text-[10px] text-gray-400 mb-1 font-semibold">Paragraph {idx + 1}</label>
                    <JoditWrapper
                      value={pText}
                      onChange={(val) => setData(prev => {
                        const newP = [...prev.headSection.description];
                        newP[idx] = val;
                        return { ...prev, headSection: { ...prev.headSection, description: newP } };
                      })}
                    />
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ 
                    ...prev, 
                    headSection: { 
                      ...prev.headSection, 
                      description: [...prev.headSection.description, "<p>New paragraph content...</p>"] 
                    } 
                  }))}
                  className="mt-2 w-full py-1.5 bg-green-50 text-[#6abd45] border border-[#6abd45] border-dashed rounded text-xs font-semibold hover:bg-green-100 transition-colors"
                >
                  + Add Paragraph
                </button>
              </div>

              {/* Taglines Section */}
              <div className="border-b pb-4 p-2 rounded" ref={taglineRef}>
                <h3 className="text-lg font-semibold mb-2">Taglines Card</h3>
                {data.headSection.tagline.map((tag, idx) => (
                  <div key={idx} className="mb-4 border-l-2 border-green-400 pl-2 relative bg-gray-50 p-2 rounded">
                    <button 
                      onClick={() => {
                        if (window.confirm(`Are you sure to delete this section: "Tagline ${idx + 1}"?`)) {
                          setData(prev => {
                            const newT = [...prev.headSection.tagline];
                            newT.splice(idx, 1);
                            return { ...prev, headSection: { ...prev.headSection, tagline: newT } };
                          });
                        }
                      }}
                      className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs font-bold bg-white border rounded shadow-sm px-1.5 py-0.5"
                    >
                      Delete
                    </button>
                    <label className="block text-[10px] text-gray-400 mb-1 font-semibold">Tagline Line {idx + 1} (Rich Text)</label>
                    <JoditWrapper
                      value={tag}
                      onChange={(val) => setData(prev => {
                        const newT = [...prev.headSection.tagline];
                        newT[idx] = val;
                        return { ...prev, headSection: { ...prev.headSection, tagline: newT } };
                      })}
                      height={100}
                    />
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ 
                    ...prev, 
                    headSection: { 
                      ...prev.headSection, 
                      tagline: [...prev.headSection.tagline, "New Tagline text"] 
                    } 
                  }))}
                  className="mt-2 w-full py-1.5 bg-green-50 text-[#6abd45] border border-[#6abd45] border-dashed rounded text-xs font-semibold hover:bg-green-100 transition-colors"
                >
                  + Add Tagline
                </button>
              </div>

              {/* Campus Recruitment Section */}
              <div className="border-b pb-4 p-2 rounded" ref={campusRecruitmentRef}>
                <h3 className="text-lg font-semibold mb-2">Campus Recruitment Info</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Title (Rich Text)</label>
                <JoditWrapper
                  value={data.campusRecruitment.title}
                  onChange={(val) => setData(prev => ({ ...prev, campusRecruitment: { ...prev.campusRecruitment, title: val } }))}
                  height={120}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Location Info</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.campusRecruitment.location}
                  onChange={(e) => setData(prev => ({ ...prev, campusRecruitment: { ...prev.campusRecruitment, location: e.target.value } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1">Job Type Info</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.campusRecruitment.jobType}
                  onChange={(e) => setData(prev => ({ ...prev, campusRecruitment: { ...prev.campusRecruitment, jobType: e.target.value } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1">Qualification Info</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.campusRecruitment.qualification}
                  onChange={(e) => setData(prev => ({ ...prev, campusRecruitment: { ...prev.campusRecruitment, qualification: e.target.value } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1">Register URL</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.campusRecruitment.registerUrl}
                  onChange={(e) => setData(prev => ({ ...prev, campusRecruitment: { ...prev.campusRecruitment, registerUrl: e.target.value } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1">Test URL</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.campusRecruitment.testUrl}
                  onChange={(e) => setData(prev => ({ ...prev, campusRecruitment: { ...prev.campusRecruitment, testUrl: e.target.value } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Footer Note (Rich Text)</label>
                <JoditWrapper
                  value={data.campusRecruitment.note}
                  onChange={(val) => setData(prev => ({ ...prev, campusRecruitment: { ...prev.campusRecruitment, note: val } }))}
                  height={120}
                />
              </div>

              {/* TreeData Perks Section */}
              <div className="border-b pb-4 p-2 rounded" ref={treeDataRef}>
                <h3 className="text-lg font-semibold mb-2">Talent Retention Perks</h3>
                {data.treeData.map((perk, idx) => (
                  <div key={idx} className="mb-6 border-l-2 border-[#6abd45] pl-2 bg-gray-50 p-2 rounded relative">
                    <button 
                      onClick={() => {
                        const name = perk.head.replace(/<[^>]*>/g, "") || `Perk #${idx + 1}`;
                        if (window.confirm(`Are you sure to delete this section: "${name}"?`)) {
                          setData(prev => {
                            const newTD = [...prev.treeData];
                            newTD.splice(idx, 1);
                            return { ...prev, treeData: newTD };
                          });
                        }
                      }}
                      className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs font-bold bg-white border rounded shadow-sm px-1.5 py-0.5"
                    >
                      Delete
                    </button>
                    <label className="block text-[10px] text-gray-400 mb-1">Perk Title (Rich Text)</label>
                    <JoditWrapper
                      value={perk.head}
                      onChange={(val) => setData(prev => {
                        const newTD = [...prev.treeData];
                        newTD[idx] = { ...newTD[idx], head: val };
                        return { ...prev, treeData: newTD };
                      })}
                      height={100}
                    />
                    <label className="block text-[10px] text-gray-400 mb-1 mt-3">Icon URL</label>
                    <input
                      className="w-full border p-2 rounded text-sm mb-2"
                      value={perk.icon}
                      onChange={(e) => setData(prev => {
                        const newTD = [...prev.treeData];
                        newTD[idx] = { ...newTD[idx], icon: e.target.value };
                        return { ...prev, treeData: newTD };
                      })}
                    />
                    <label className="block text-[10px] text-gray-400 mb-1">Perk Description</label>
                    <textarea
                      className="w-full border p-2 rounded text-sm h-16"
                      value={perk.body}
                      onChange={(e) => setData(prev => {
                        const newTD = [...prev.treeData];
                        newTD[idx] = { ...newTD[idx], body: e.target.value };
                        return { ...prev, treeData: newTD };
                      })}
                    />
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ 
                    ...prev, 
                    treeData: [...prev.treeData, { head: "New Perk Title", icon: "", body: "Description body of this perk..." }] 
                  }))}
                  className="mt-2 w-full py-1.5 bg-green-50 text-[#6abd45] border border-[#6abd45] border-dashed rounded text-xs font-semibold hover:bg-green-100 transition-colors"
                >
                  + Add Perk Card
                </button>
              </div>

              {/* Equal Opportunity Section */}
              <div className="pb-4 p-2 rounded" ref={equalOpportunityRef}>
                <h3 className="text-lg font-semibold mb-2">Equal Opportunity Info</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Section Title (Rich Text)</label>
                <JoditWrapper
                  value={data.equalOpportunity.title}
                  onChange={(val) => setData(prev => ({ ...prev, equalOpportunity: { ...prev.equalOpportunity, title: val } }))}
                  height={120}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Description (HTML enabled)</label>
                <JoditWrapper
                  value={data.equalOpportunity.body}
                  onChange={(val) => setData(prev => ({ ...prev, equalOpportunity: { ...prev.equalOpportunity, body: val } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-2">Illustration Image URL</label>
                <input
                  className="w-full border p-2 rounded text-sm"
                  value={data.equalOpportunity.image}
                  onChange={(e) => setData(prev => ({ ...prev, equalOpportunity: { ...prev.equalOpportunity, image: e.target.value } }))}
                />
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
              <Careers previewData={data} onSectionClick={mode === "split" ? handleSectionClick : undefined} />
            </div>
          </div>
          </div>
        )}
      </main>
    </section>
  );
}
