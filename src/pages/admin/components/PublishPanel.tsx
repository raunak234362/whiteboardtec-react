import React, { useState, useEffect } from "react";
import { saveLocalDraft, publishAllStagedToGithub, getStagedCount } from "../../../config/github";

interface PublishPanelProps {
  filePath: string;
  data: any;
}

export const PublishPanel: React.FC<PublishPanelProps> = ({ filePath, data }) => {
  const [githubToken, setGithubToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [stagedCount, setStagedCount] = useState(0);

  const updateStagedCount = () => {
    setStagedCount(getStagedCount());
  };

  useEffect(() => {
    updateStagedCount();
  }, []);

  const handleSaveLocal = async () => {
    try {
      await saveLocalDraft(filePath, JSON.stringify(data, null, 2));
      updateStagedCount();
      const count = getStagedCount();
      setMessage(`Saved draft locally! ${count} update${count > 1 ? "s" : ""} staged in storage ready for GitHub publish.`);
    } catch (e: any) {
      setMessage(`Error saving draft: ${e.message}`);
    }
  };

  const handlePublishAll = async () => {
    if (!githubToken) {
      setMessage("Please enter a GitHub Personal Access Token to publish changes.");
      return;
    }
    setLoading(true);
    setMessage("Publishing all staged updates to GitHub...");
    try {
      const count = await publishAllStagedToGithub(
        githubToken,
        filePath,
        JSON.stringify(data, null, 2),
        (statusMsg) => setMessage(statusMsg)
      );
      updateStagedCount();
      setMessage(`Successfully published ${count} component update${count > 1 ? "s" : ""} to GitHub at once!`);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 border-b sticky top-0 z-10 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Publish Settings</h3>
        {stagedCount > 0 && (
          <span className="text-[11px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full border border-amber-300">
            {stagedCount} staged update{stagedCount > 1 ? "s" : ""}
          </span>
        )}
      </div>
      <input
        type="password"
        className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 mb-2 text-sm"
        placeholder="GitHub Token (ghp_...)"
        value={githubToken}
        onChange={(e) => setGithubToken(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          onClick={handleSaveLocal}
          disabled={loading}
          type="button"
          className="flex-1 py-2 px-3 border border-gray-300 rounded font-semibold text-xs bg-white hover:bg-gray-50 text-gray-700 shadow-sm transition-all active:scale-95"
        >
          💾 Save Draft
        </button>
        <button
          onClick={handlePublishAll}
          disabled={loading}
          type="button"
          className={`flex-1 py-2 px-3 rounded font-bold text-xs uppercase transition-all shadow flex items-center justify-center gap-1 ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#6abd45] text-white hover:bg-[#5aa839] active:scale-95"
          }`}
        >
          {loading ? "Publishing..." : `🚀 Publish ${stagedCount > 1 ? `All (${stagedCount})` : "to GitHub"}`}
        </button>
      </div>
      {message && (
        <div className={`mt-2 p-2 rounded text-xs ${message.includes("Error") || message.includes("Please enter") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message}
        </div>
      )}
    </div>
  );
};
