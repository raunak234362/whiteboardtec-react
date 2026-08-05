import React, { useState, useEffect, useRef } from "react";
import ourFirmData from "../../../data/ourFirm.json";
import { saveToGithub } from "../../../config/github";
import { Header, Sidebar } from "../components";
import OurFirm from "../../ourFirm/OurFirm";
import { Jodit } from "jodit";
import "jodit/es2021/jodit.min.css";

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
        height: 250
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

  const bannerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const visionMissionRef = useRef<HTMLDivElement>(null);
  const largeProjectRef = useRef<HTMLDivElement>(null);
  const keyDifferentiatorsRef = useRef<HTMLDivElement>(null);
  const projectManagementRef = useRef<HTMLDivElement>(null);

  const header = { head: "Live Editor: Our Firm" };

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
      // Optional: Add a brief highlight effect
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
    <section className="w-full h-screen grid grid-cols-[250px_1fr] bg-gray-50 overflow-hidden">
      {/* App Sidebar */}
      <div className="bg-gray-800 overflow-y-auto">
        <Sidebar />
      </div>

      <main className="flex flex-col h-full overflow-hidden">
        <Header {...header} />

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
                className={`w-full py-2 px-4 rounded font-bold text-white transition-colors text-sm ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
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
              </div>

              <div className="border-b pb-4 p-2 rounded" ref={introRef}>
                <h3 className="text-lg font-semibold mb-2">Intro Section</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Heading</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.intro.heading}
                  onChange={(e) => setData(prev => ({ ...prev, intro: { ...prev.intro, heading: e.target.value } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1">Paragraph 1</label>
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
              
               <div className="pb-4 p-2 rounded" ref={largeProjectRef}>
                <h3 className="text-lg font-semibold mb-2">Large Project Section</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Heading</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.largeProject.heading}
                  onChange={(e) => setData(prev => ({ ...prev, largeProject: { ...prev.largeProject, heading: e.target.value } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1">Subheading</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.largeProject.subheading}
                  onChange={(e) => setData(prev => ({ ...prev, largeProject: { ...prev.largeProject, subheading: e.target.value } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <JoditWrapper
                  value={data.largeProject.description}
                  onChange={(val) => setData(prev => ({ ...prev, largeProject: { ...prev.largeProject, description: val } }))}
                />
              </div>

              <div className="border-b pb-4 p-2 rounded" ref={keyDifferentiatorsRef}>
                <h3 className="text-lg font-semibold mb-2">Key Differentiators</h3>
                {data.keyDifferentiators.map((item: any, idx: number) => (
                  <div key={idx} className="mb-6 border-l-4 border-blue-500 pl-3 relative bg-gray-50 p-2 rounded">
                    <button 
                      onClick={() => {
                        setData(prev => {
                          const newArr = [...prev.keyDifferentiators];
                          newArr.splice(idx, 1);
                          return { ...prev, keyDifferentiators: newArr };
                        });
                      }}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold"
                    >
                      Remove
                    </button>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Heading</label>
                    <input
                      className="w-full border p-2 rounded mb-2 text-sm"
                      value={item.head}
                      onChange={(e) => {
                        setData(prev => {
                          const newArr = [...prev.keyDifferentiators];
                          newArr[idx] = { ...newArr[idx], head: e.target.value };
                          return { ...prev, keyDifferentiators: newArr };
                        });
                      }}
                    />
                    <label className="block text-xs font-medium text-gray-500 mb-1 mt-2">Body</label>
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
                  className="mt-2 w-full py-2 bg-blue-100 text-blue-700 rounded text-sm font-semibold hover:bg-blue-200"
                >
                  + Add Differentiator
                </button>
              </div>

              <div className="border-b pb-4 p-2 rounded" ref={projectManagementRef}>
                <h3 className="text-lg font-semibold mb-2">Project Management</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Heading</label>
                <input
                  className="w-full border p-2 rounded mb-2 text-sm"
                  value={data.projectManagement.heading}
                  onChange={(e) => setData(prev => ({ ...prev, projectManagement: { ...prev.projectManagement, heading: e.target.value } }))}
                />
                <label className="block text-xs font-medium text-gray-500 mb-1 mt-2">Description</label>
                <JoditWrapper
                  value={data.projectManagement.description}
                  onChange={(val) => setData(prev => ({ ...prev, projectManagement: { ...prev.projectManagement, description: val } }))}
                />
                
                <label className="block text-xs font-medium text-gray-500 mb-2 mt-4">Features List</label>
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
                      onClick={() => setData(prev => {
                        const newFeatures = [...prev.projectManagement.features];
                        newFeatures.splice(idx, 1);
                        return { ...prev, projectManagement: { ...prev.projectManagement, features: newFeatures } };
                      })}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded text-xs font-bold hover:bg-red-200"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ ...prev, projectManagement: { ...prev.projectManagement, features: [...prev.projectManagement.features, "New Feature"] } }))}
                  className="mt-2 w-full py-2 bg-blue-100 text-blue-700 rounded text-sm font-semibold hover:bg-blue-200"
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
                      onClick={() => setData(prev => {
                        const newBlocks = [...(prev.additionalBlocks || [])];
                        newBlocks.splice(idx, 1);
                        return { ...prev, additionalBlocks: newBlocks };
                      })}
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

          {/* LIVE PREVIEW PANEL (Right side) */}
          <div className="flex-1 bg-gray-200 overflow-y-auto relative">
            <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded shadow opacity-50 pointer-events-none z-10">Live Preview (Click a section to edit)</div>
            <div className="w-full bg-white min-h-full pb-20">
              <OurFirm previewData={data} onSectionClick={handleSectionClick} />
            </div>
          </div>

        </div>
      </main>
    </section>
  );
}
