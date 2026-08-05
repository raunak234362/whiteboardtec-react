import React, { useState } from "react";
import ourFirmData from "../../../data/ourFirm.json";
import { saveToGithub } from "../../../config/github";
import { Header, Sidebar } from "../components";

export default function EditOurFirm() {
  const [data, setData] = useState(ourFirmData);
  const [githubToken, setGithubToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const header = { head: "Edit Page: Our Firm" };

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

  return (
    <section className="w-full min-h-screen grid grid-cols-[20%_1fr] bg-gray-50">
      <div style={{ minHeight: "95.2vh" }} className="bg-gray-800">
        <Sidebar />
      </div>

      <main className="flex flex-col max-w-full px-8 py-10 overflow-auto">
        <Header {...header} />

        <div className="flex flex-row gap-6 mt-6">
          {/* Main Content Area */}
          <div className="flex-1 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Edit Content</h2>

            <div className="mb-6 border-b pb-4">
              <h3 className="text-xl font-semibold mb-2">Banner</h3>
              <label className="block text-sm font-medium mb-1">Header</label>
              <input
                className="w-full border p-2 rounded mb-2"
                value={data.banner.header}
                onChange={(e) => setData({ ...data, banner: { ...data.banner, header: e.target.value } })}
              />
              <label className="block text-sm font-medium mb-1">Subheader</label>
              <input
                className="w-full border p-2 rounded mb-2"
                value={data.banner.subheader}
                onChange={(e) => setData({ ...data, banner: { ...data.banner, subheader: e.target.value } })}
              />
            </div>

            <div className="mb-6 border-b pb-4">
              <h3 className="text-xl font-semibold mb-2">Intro Section</h3>
              <label className="block text-sm font-medium mb-1">Heading</label>
              <input
                className="w-full border p-2 rounded mb-2"
                value={data.intro.heading}
                onChange={(e) => setData({ ...data, intro: { ...data.intro, heading: e.target.value } })}
              />
              <label className="block text-sm font-medium mb-1">Paragraph 1</label>
              <textarea
                className="w-full border p-2 rounded mb-2 h-24"
                value={data.intro.paragraph1}
                onChange={(e) => setData({ ...data, intro: { ...data.intro, paragraph1: e.target.value } })}
              />
              <label className="block text-sm font-medium mb-1">Paragraph 2</label>
              <textarea
                className="w-full border p-2 rounded mb-2 h-32"
                value={data.intro.paragraph2}
                onChange={(e) => setData({ ...data, intro: { ...data.intro, paragraph2: e.target.value } })}
              />
            </div>

            <div className="mb-6 border-b pb-4">
              <h3 className="text-xl font-semibold mb-2">Vision & Mission</h3>
              <label className="block text-sm font-medium mb-1">Vision</label>
              <textarea
                className="w-full border p-2 rounded mb-2 h-20"
                value={data.visionMission.vision}
                onChange={(e) => setData({ ...data, visionMission: { ...data.visionMission, vision: e.target.value } })}
              />
              <label className="block text-sm font-medium mb-1">Mission</label>
              <textarea
                className="w-full border p-2 rounded mb-2 h-32"
                value={data.visionMission.mission}
                onChange={(e) => setData({ ...data, visionMission: { ...data.visionMission, mission: e.target.value } })}
              />
            </div>
            
             <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Large Project Section</h3>
              <label className="block text-sm font-medium mb-1">Heading</label>
              <input
                className="w-full border p-2 rounded mb-2"
                value={data.largeProject.heading}
                onChange={(e) => setData({ ...data, largeProject: { ...data.largeProject, heading: e.target.value } })}
              />
              <label className="block text-sm font-medium mb-1">Subheading</label>
              <input
                className="w-full border p-2 rounded mb-2"
                value={data.largeProject.subheading}
                onChange={(e) => setData({ ...data, largeProject: { ...data.largeProject, subheading: e.target.value } })}
              />
              <label className="block text-sm font-medium mb-1">Description</label>
               <textarea
                className="w-full border p-2 rounded mb-2 h-32"
                value={data.largeProject.description}
                onChange={(e) => setData({ ...data, largeProject: { ...data.largeProject, description: e.target.value } })}
              />
            </div>
          </div>

          {/* WordPress-like Publish Side Panel */}
          <div className="w-80 bg-white p-6 rounded shadow self-start sticky top-6 border border-gray-200">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">Publish / Publish Settings</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-gray-700">GitHub Access Token</label>
              <p className="text-xs text-gray-500 mb-2">Required to push changes to the repository.</p>
              <input
                type="password"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="ghp_xxxxxxxxxxxx..."
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
              />
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className={`w-full py-2 px-4 rounded font-bold text-white transition-colors ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Saving..." : "Update Page"}
            </button>

            {message && (
              <div className={`mt-4 p-3 rounded text-sm ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                {message}
              </div>
            )}
            
            <div className="mt-6 text-sm text-gray-600">
              <p><strong>Status:</strong> Draft / Edits</p>
              <p><strong>Visibility:</strong> Public</p>
              <p><strong>Revisions:</strong> Managed by Git</p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
