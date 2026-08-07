import React, { useState, useEffect, useRef } from "react";
import rebarEstimationData from "../../../data/rebarEstimation.json";
import { saveToGithub } from "../../../config/github";
import { Header, Sidebar, SubNavbar } from "../components";
import Rebar from "../../services/Rebar";
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
        height: 180
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

interface RebarEstimationData {
  banner: {
    header: string;
    subheader: string;
    image: string;
  };
  headSection: {
    title: string;
    description: string[];
  };
  estimate: {
    head: string;
    body: string;
    bullets: string[];
  };
  rebarDetailing: string[];
  rebarEstimation: {
    title: string;
    description: string[];
  };
  rebarStructures: {
    title: string;
    description: string[];
  };
  workDone: {
    title: string;
    desc: string;
  }[];
  jobDone: string[];
}

export default function EditRebarEstimation() {
  const [data, setData] = useState<RebarEstimationData>(rebarEstimationData as RebarEstimationData);
  const [githubToken, setGithubToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const bannerRef = useRef<HTMLDivElement>(null);
  const headSectionRef = useRef<HTMLDivElement>(null);
  const estimateRef = useRef<HTMLDivElement>(null);
  const rebarDetailingRef = useRef<HTMLDivElement>(null);
  const estimationAndStructuresRef = useRef<HTMLDivElement>(null);
  const workDoneRef = useRef<HTMLDivElement>(null);
  const jobDoneRef = useRef<HTMLDivElement>(null);

  const header = { head: "Live Editor: Rebar Estimation & Detailing" };

  const handleSave = async () => {
    if (!githubToken) {
      setMessage("Please enter a GitHub Personal Access Token to save changes.");
      return;
    }
    setLoading(true);
    setMessage("Saving to GitHub...");
    try {
      await saveToGithub(
        "src/data/rebarEstimation.json",
        JSON.stringify(data, null, 2),
        githubToken,
        "Update Rebar Estimation & Detailing page content via Admin CMS"
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
      estimate: estimateRef,
      rebarDetailing: rebarDetailingRef,
      estimationAndStructures: estimationAndStructuresRef,
      workDone: workDoneRef,
      jobDone: jobDoneRef
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
    <section className="w-full h-screen grid grid-cols-[250px_1fr] bg-gray-50 overflow-hidden">
      {/* App Sidebar */}
      <aside className="overflow-auto bg-white border-r border-gray-200">
        <Sidebar />
      </aside>

      <main className="flex flex-col h-full overflow-hidden">
        <Header {...header} />
        <SubNavbar tabs={servicesTabs} />

        <div className="flex flex-row h-full overflow-hidden">
          {/* EDITOR PANEL (Left side) */}
          <div className="w-[550px] bg-white border-r flex flex-col h-full overflow-y-auto animate-fade-in">
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

              {/* Head Section */}
              <div className="border-b pb-4 p-2 rounded" ref={headSectionRef}>
                <h3 className="text-lg font-semibold mb-2">Intro Section</h3>
                <label className="block text-xs font-medium text-gray-500 mb-1">Green Alert Title</label>
                <textarea
                  className="w-full border p-2 rounded mb-3 text-sm font-semibold h-16"
                  value={data.headSection.title}
                  onChange={(e) => setData(prev => ({ ...prev, headSection: { ...prev.headSection, title: e.target.value } }))}
                />

                <label className="block text-xs font-medium text-gray-500 mb-2 font-bold">Intro Paragraphs</label>
                {data.headSection.description.map((pText, idx) => (
                  <div key={idx} className="mb-4 border-l-2 border-green-300 pl-2 relative bg-gray-50 p-2 rounded">
                    <button 
                      onClick={() => setData(prev => {
                        const newP = [...prev.headSection.description];
                        newP.splice(idx, 1);
                        return { ...prev, headSection: { ...prev.headSection, description: newP } };
                      })}
                      className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs font-bold"
                    >
                      Remove
                    </button>
                    <label className="block text-[10px] text-gray-400 mb-1">Paragraph {idx + 1}</label>
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

              {/* Rebar Detailing Section */}
              <div className="border-b pb-4 p-2 rounded" ref={rebarDetailingRef}>
                <h3 className="text-lg font-semibold mb-2">Rebar Detailing Services</h3>
                {data.rebarDetailing.map((item, idx) => (
                  <div key={idx} className="flex flex-row items-center mb-2 gap-2">
                    <input
                      className="flex-1 border p-2 rounded text-sm"
                      value={item}
                      onChange={(e) => setData(prev => {
                        const newRD = [...prev.rebarDetailing];
                        newRD[idx] = e.target.value;
                        return { ...prev, rebarDetailing: newRD };
                      })}
                    />
                    <button 
                      onClick={() => setData(prev => {
                        const newRD = [...prev.rebarDetailing];
                        newRD.splice(idx, 1);
                        return { ...prev, rebarDetailing: newRD };
                      })}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded text-xs font-bold hover:bg-red-200"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ ...prev, rebarDetailing: [...prev.rebarDetailing, "New Detailing Offering"] }))}
                  className="mt-2 w-full py-1.5 border border-dashed border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 rounded-sm text-xs font-bold uppercase transition-all shadow-sm"
                >
                  + Add Detailing Offering
                </button>
              </div>

              {/* Rebar Estimation and Structures Detailed Section */}
              <div className="border-b pb-4 p-2 rounded space-y-6" ref={estimationAndStructuresRef}>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{data.rebarEstimation.title}</h3>
                  {data.rebarEstimation.description.map((item, idx) => (
                    <div key={idx} className="flex flex-row items-center mb-2 gap-2">
                      <input
                        className="flex-1 border p-2 rounded text-sm"
                        value={item}
                        onChange={(e) => setData(prev => {
                          const newDesc = [...prev.rebarEstimation.description];
                          newDesc[idx] = e.target.value;
                          return { ...prev, rebarEstimation: { ...prev.rebarEstimation, description: newDesc } };
                        })}
                      />
                      <button 
                        onClick={() => setData(prev => {
                          const newDesc = [...prev.rebarEstimation.description];
                          newDesc.splice(idx, 1);
                          return { ...prev, rebarEstimation: { ...prev.rebarEstimation, description: newDesc } };
                        })}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded text-xs font-bold hover:bg-red-200"
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => setData(prev => ({ 
                      ...prev, 
                      rebarEstimation: { 
                        ...prev.rebarEstimation, 
                        description: [...prev.rebarEstimation.description, "New Estimation Detail"] 
                      } 
                    }))}
                    className="mt-2 w-full py-1.5 border border-dashed border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 rounded-sm text-xs font-bold uppercase transition-all shadow-sm"
                  >
                    + Add Estimation Detail
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">{data.rebarStructures.title}</h3>
                  {data.rebarStructures.description.map((item, idx) => (
                    <div key={idx} className="flex flex-row items-center mb-2 gap-2">
                      <input
                        className="flex-1 border p-2 rounded text-sm"
                        value={item}
                        onChange={(e) => setData(prev => {
                          const newDesc = [...prev.rebarStructures.description];
                          newDesc[idx] = e.target.value;
                          return { ...prev, rebarStructures: { ...prev.rebarStructures, description: newDesc } };
                        })}
                      />
                      <button 
                        onClick={() => setData(prev => {
                          const newDesc = [...prev.rebarStructures.description];
                          newDesc.splice(idx, 1);
                          return { ...prev, rebarStructures: { ...prev.rebarStructures, description: newDesc } };
                        })}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded text-xs font-bold hover:bg-red-200"
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => setData(prev => ({ 
                      ...prev, 
                      rebarStructures: { 
                        ...prev.rebarStructures, 
                        description: [...prev.rebarStructures.description, "New Structure Detail"] 
                      } 
                    }))}
                    className="mt-2 w-full py-1.5 border border-dashed border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 rounded-sm text-xs font-bold uppercase transition-all shadow-sm"
                  >
                    + Add Structure Detail
                  </button>
                </div>
              </div>

              {/* Work Done Section */}
              <div className="border-b pb-4 p-2 rounded" ref={workDoneRef}>
                <h3 className="text-lg font-semibold mb-2">Rebar Estimation Work Done</h3>
                {data.workDone.map((item, idx) => (
                  <div key={idx} className="mb-4 border-l-2 border-[#6abd45] pl-2 bg-gray-50 p-2 rounded relative">
                    <button 
                      onClick={() => setData(prev => {
                        const newWD = [...prev.workDone];
                        newWD.splice(idx, 1);
                        return { ...prev, workDone: newWD };
                      })}
                      className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs font-bold"
                    >
                      Remove
                    </button>
                    <label className="block text-[10px] text-gray-400 mb-1">Project Title</label>
                    <input
                      className="w-full border p-2 rounded text-sm mb-2"
                      value={item.title}
                      onChange={(e) => setData(prev => {
                        const newWD = [...prev.workDone];
                        newWD[idx] = { ...newWD[idx], title: e.target.value };
                        return { ...prev, workDone: newWD };
                      })}
                    />
                    <label className="block text-[10px] text-gray-400 mb-1">Location & Weight (e.g. Pennsylvania – 572.88 MT)</label>
                    <input
                      className="w-full border p-2 rounded text-sm"
                      value={item.desc}
                      onChange={(e) => setData(prev => {
                        const newWD = [...prev.workDone];
                        newWD[idx] = { ...newWD[idx], desc: e.target.value };
                        return { ...prev, workDone: newWD };
                      })}
                    />
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ 
                    ...prev, 
                    workDone: [...prev.workDone, { title: "New Project", desc: "State – 0.00 MT" }] 
                  }))}
                  className="mt-2 w-full py-1.5 border border-dashed border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 rounded-sm text-xs font-bold uppercase transition-all shadow-sm"
                >
                  + Add Work Done Project
                </button>
              </div>

              {/* Job Done Section */}
              <div className="pb-4 p-2 rounded" ref={jobDoneRef}>
                <h3 className="text-lg font-semibold mb-2">Job Done By Our Teams</h3>
                {data.jobDone.map((job, idx) => (
                  <div key={idx} className="flex flex-row items-center mb-2 gap-2">
                    <input
                      className="flex-1 border p-2 rounded text-sm"
                      value={job}
                      onChange={(e) => setData(prev => {
                        const newJD = [...prev.jobDone];
                        newJD[idx] = e.target.value;
                        return { ...prev, jobDone: newJD };
                      })}
                    />
                    <button 
                      onClick={() => setData(prev => {
                        const newJD = [...prev.jobDone];
                        newJD.splice(idx, 1);
                        return { ...prev, jobDone: newJD };
                      })}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded text-xs font-bold hover:bg-red-200"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setData(prev => ({ ...prev, jobDone: [...prev.jobDone, "New Job Entry"] }))}
                  className="mt-2 w-full py-1.5 border border-dashed border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 rounded-sm text-xs font-bold uppercase transition-all shadow-sm"
                >
                  + Add Job Entry
                </button>
              </div>

            </div>
          </div>

          {/* LIVE PREVIEW PANEL (Right side) */}
          <div className="flex-1 bg-gray-200 overflow-y-auto relative">
            <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded shadow opacity-50 pointer-events-none z-10">Live Preview (Click a section to edit)</div>
            <div className="w-full bg-white min-h-full pb-20">
              <Rebar previewData={data} onSectionClick={handleSectionClick} />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
