import React, { useState, useEffect, useRef } from "react";
import ourFirmData from "../../../data/ourFirm.json";
import { saveToGithub } from "../../../config/github";
import { Header, Sidebar, SubNavbar } from "../components";
import OurFirm from "../../ourFirm/OurFirm";
import { Jodit } from "jodit";
import "jodit/es2021/jodit.min.css";

const ourFirmTabs = [
  { name: "Our Firm Details", to: "/admin/edit-our-firm" },
  { name: "Business Model", to: "/admin/edit-business-model" },
  { name: "Leadership Team", to: "/admin/leadership" },
  { name: "Gallery", to: "/admin/gallery" },
];

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

interface OurFirmData {
  banner: any;
  intro: any;
  visionMission: any;
  largeProject: any;
  keyDifferentiators: any[];
  projectManagement: any;
  additionalBlocks?: any[];
}

export default function EditOurFirm() {
  const [data, setData] = useState<OurFirmData>(ourFirmData as OurFirmData);
  const [githubToken, setGithubToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Resize Panel State
  const [editorWidth, setEditorWidth] = useState(550);
  const [isDragging, setIsDragging] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const visionMissionRef = useRef<HTMLDivElement>(null);
  const largeProjectRef = useRef<HTMLDivElement>(null);
  const keyDifferentiatorsRef = useRef<HTMLDivElement>(null);
  const projectManagementRef = useRef<HTMLDivElement>(null);

  const header = { head: "Live Editor: Our Firm" };

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
        "src/data/ourFirm.json",
        JSON.stringify(data, null, 2),
        githubToken,
        "Update Our Firm page content via Admin CMS"
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
      visionMission: visionMissionRef,
      largeProject: largeProjectRef,
      keyDifferentiators: keyDifferentiatorsRef,
      projectManagement: projectManagementRef
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
    <section className="w-full h-screen grid grid-cols-[250px_1fr] bg-gray-50 overflow-hidden select-none">
      {/* App Sidebar */}
      <aside className="overflow-auto bg-white border-r border-gray-200 select-none">
        <Sidebar />
      </aside>

      <main className="flex flex-col h-full overflow-hidden select-text">
        <Header {...header} />
        <SubNavbar tabs={ourFirmTabs} />

        <div className="flex flex-row h-full overflow-hidden">
          {/* EDITOR PANEL (Resizable Left side) */}
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
              </div>

              {/* Intro Section */}
              <div className="border-b pb-4 p-2 rounded" ref={introRef}>
                <h3 className="text-lg font-semibold mb-2">Intro Section</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Heading (Rich Text)</label>
                <JoditWrapper
                  value={data.intro.heading}
                  onChange={(val) => setData(prev => ({ ...prev, intro: { ...prev.intro, heading: val } }))}
                  height={120}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Paragraph 1</label>
                <JoditWrapper
                  value={data.intro.paragraph1}
                  onChange={(val) => setData(prev => ({ ...prev, intro: { ...prev.intro, paragraph1: val } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Paragraph 2</label>
                <JoditWrapper
                  value={data.intro.paragraph2}
                  onChange={(val) => setData(prev => ({ ...prev, intro: { ...prev.intro, paragraph2: val } }))}
                />
              </div>

              {/* Vision & Mission */}
              <div className="border-b pb-4 p-2 rounded" ref={visionMissionRef}>
                <h3 className="text-lg font-semibold mb-2">Vision & Mission</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Vision</label>
                <JoditWrapper
                  value={data.visionMission.vision}
                  onChange={(val) => setData(prev => ({ ...prev, visionMission: { ...prev.visionMission, vision: val } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Mission</label>
                <JoditWrapper
                  value={data.visionMission.mission}
                  onChange={(val) => setData(prev => ({ ...prev, visionMission: { ...prev.visionMission, mission: val } }))}
                />
              </div>
              
              {/* Large Project Section */}
              <div className="border-b pb-4 p-2 rounded" ref={largeProjectRef}>
                <h3 className="text-lg font-semibold mb-2">Large Project Section</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Heading (Rich Text)</label>
                <JoditWrapper
                  value={data.largeProject.heading}
                  onChange={(val) => setData(prev => ({ ...prev, largeProject: { ...prev.largeProject, heading: val } }))}
                  height={120}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Subheading (Rich Text)</label>
                <JoditWrapper
                  value={data.largeProject.subheading}
                  onChange={(val) => setData(prev => ({ ...prev, largeProject: { ...prev.largeProject, subheading: val } }))}
                  height={120}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Description</label>
                <JoditWrapper
                  value={data.largeProject.description}
                  onChange={(val) => setData(prev => ({ ...prev, largeProject: { ...prev.largeProject, description: val } }))}
                />
              </div>

              {/* Key Differentiators */}
              <div className="border-b pb-4 p-2 rounded" ref={keyDifferentiatorsRef}>
                <h3 className="text-lg font-semibold mb-2">Key Differentiators</h3>
                {data.keyDifferentiators.map((item: any, idx: number) => (
                  <div key={idx} className="mb-6 border-l-4 border-blue-500 pl-3 relative bg-gray-50 p-3 rounded shadow-sm">
                    <button 
                      onClick={() => {
                        const name = item.head.replace(/<[^>]*>/g, "") || `Differentiator #${idx + 1}`;
                        if (window.confirm(`Are you sure to delete this section: "${name}"?`)) {
                          setData(prev => {
                            const newArr = [...prev.keyDifferentiators];
                            newArr.splice(idx, 1);
                            return { ...prev, keyDifferentiators: newArr };
                          });
                        }
                      }}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold bg-white p-1 rounded border shadow-sm"
                    >
                      Delete Block
                    </button>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Heading (Rich Text)</label>
                    <JoditWrapper
                      value={item.head}
                      onChange={(val) => {
                        setData(prev => {
                          const newArr = [...prev.keyDifferentiators];
                          newArr[idx] = { ...newArr[idx], head: val };
                          return { ...prev, keyDifferentiators: newArr };
                        });
                      }}
                      height={100}
                    />
                    <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Body</label>
                    <JoditWrapper
                      value={item.body}
                      onChange={(val) => {
                        setData(prev => {
                          const newArr = [...prev.keyDifferentiators];
                          newArr[idx] = { ...newArr[idx], body: val };
                          return { ...prev, keyDifferentiators: newArr };
                        });
                      }}
                    />
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ ...prev, keyDifferentiators: [...prev.keyDifferentiators, { icon: "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685578/icons/process_skpasx.png", head: "New Item", body: "Description..." }] }))}
                  className="mt-2 w-full py-2 bg-blue-50 text-blue-600 border border-blue-300 border-dashed rounded text-sm font-semibold hover:bg-blue-100 transition-colors"
                >
                  + Add Key Differentiator Card
                </button>
              </div>

              {/* Project Management */}
              <div className="border-b pb-4 p-2 rounded" ref={projectManagementRef}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Project Management</h3>
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure to reset the Project Management section?')) {
                        setData(prev => ({ ...prev, projectManagement: { heading: "<h3>Heading</h3>", description: "<p>Description</p>", features: [] } }));
                      }
                    }}
                    className="text-xs text-red-500 hover:text-red-700 font-semibold"
                  >
                    Reset Section
                  </button>
                </div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Heading (Rich Text)</label>
                <JoditWrapper
                  value={data.projectManagement.heading}
                  onChange={(val) => setData(prev => ({ ...prev, projectManagement: { ...prev.projectManagement, heading: val } }))}
                  height={120}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Description</label>
                <JoditWrapper
                  value={data.projectManagement.description}
                  onChange={(val) => setData(prev => ({ ...prev, projectManagement: { ...prev.projectManagement, description: val } }))}
                />
                
                <label className="block text-xs font-medium text-gray-500 mb-2 mt-4 font-bold">Features List</label>
                {data.projectManagement.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex flex-row items-center mb-2 gap-2">
                    <input
                      className="flex-1 border p-2 rounded text-sm"
                      value={feature}
                      onChange={(e) => setData(prev => {
                        const newFeatures = [...prev.projectManagement.features];
                        newFeatures[idx] = e.target.value;
                        return { ...prev, projectManagement: { ...prev.projectManagement, features: newFeatures } };
                      })}
                    />
                    <button 
                      onClick={() => {
                        if (window.confirm(`Are you sure to delete this section: "Feature: ${feature || "Untitled"}"?`)) {
                          setData(prev => {
                            const newFeatures = [...prev.projectManagement.features];
                            newFeatures.splice(idx, 1);
                            return { ...prev, projectManagement: { ...prev.projectManagement, features: newFeatures } };
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
                  onClick={() => setData(prev => ({ ...prev, projectManagement: { ...prev.projectManagement, features: [...prev.projectManagement.features, "New Feature item"] } }))}
                  className="mt-2 w-full py-1.5 bg-green-50 text-[#6abd45] border border-[#6abd45] border-dashed rounded text-xs font-semibold hover:bg-green-100 transition-colors"
                >
                  + Add Feature
                </button>
              </div>

              {/* ADDITIONAL WORDPRESS-STYLE BLOCKS */}
              <div className="pb-4 p-2 rounded">
                <h3 className="text-lg font-semibold mb-2">Custom Dynamic Blocks</h3>
                <p className="text-xs text-gray-500 mb-4">Add WordPress-style custom blocks to the bottom of your page.</p>
                
                {(data.additionalBlocks || []).map((block: any, idx: number) => (
                  <div key={idx} className="mb-6 border-l-4 border-green-500 pl-3 relative bg-gray-50 p-3 rounded">
                    <button 
                      onClick={() => {
                        if (window.confirm(`Are you sure to delete this section: "${block.type} Block"?`)) {
                          setData(prev => {
                            const newBlocks = [...(prev.additionalBlocks || [])];
                            newBlocks.splice(idx, 1);
                            return { ...prev, additionalBlocks: newBlocks };
                          });
                        }
                      }}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold"
                    >
                      Remove
                    </button>
                    <h4 className="font-bold text-sm text-green-700 capitalize mb-3 border-b pb-1">{block.type} Block</h4>
                    
                    {block.type === 'text' && (
                      <JoditWrapper
                        value={block.content}
                        onChange={(val) => setData(prev => {
                          const newBlocks = [...(prev.additionalBlocks || [])];
                          newBlocks[idx] = { ...newBlocks[idx], content: val };
                          return { ...prev, additionalBlocks: newBlocks };
                        })}
                      />
                    )}

                    {block.type === 'quote' && (
                      <>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Quote Text</label>
                        <textarea
                          className="w-full border p-2 rounded mb-2 text-sm h-16"
                          value={block.text}
                          onChange={(e) => setData(prev => {
                            const newBlocks = [...(prev.additionalBlocks || [])];
                            newBlocks[idx] = { ...newBlocks[idx], text: e.target.value };
                            return { ...prev, additionalBlocks: newBlocks };
                          })}
                        />
                        <label className="block text-xs font-medium text-gray-500 mb-1">Author Name</label>
                        <input
                          className="w-full border p-2 rounded text-sm"
                          value={block.author}
                          onChange={(e) => setData(prev => {
                            const newBlocks = [...(prev.additionalBlocks || [])];
                            newBlocks[idx] = { ...newBlocks[idx], author: e.target.value };
                            return { ...prev, additionalBlocks: newBlocks };
                          })}
                        />
                      </>
                    )}
                  </div>
                ))}
                
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => setData(prev => ({ ...prev, additionalBlocks: [...(prev.additionalBlocks || []), { type: 'text', content: '<p>New text block...</p>' }] }))}
                    className="flex-1 py-2 bg-green-100 text-green-700 rounded text-sm font-semibold hover:bg-green-200"
                  >
                    + Rich Text Block
                  </button>
                  <button 
                    onClick={() => setData(prev => ({ ...prev, additionalBlocks: [...(prev.additionalBlocks || []), { type: 'quote', text: 'This is a great quote!', author: 'John Doe' }] }))}
                    className="flex-1 py-2 bg-green-100 text-green-700 rounded text-sm font-semibold hover:bg-green-200"
                  >
                    + Quote Block
                  </button>
                </div>
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
              <OurFirm previewData={data} onSectionClick={handleSectionClick} />
            </div>
          </div>

        </div>
      </main>
    </section>
  );
}
