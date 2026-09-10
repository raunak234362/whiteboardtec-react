import axios from "axios";

const GITHUB_REPO = "raunak234362/whiteboardtec-react";
const GITHUB_BRANCH = "main"; // Currently running on development branch

export const saveToGithub = async (
  filePath: string,
  content: string,
  token: string,
  commitMessage: string,
) => {
  if (!token) {
    throw new Error("GitHub token is required to save changes.");
  }

  // Attempt to save locally if running in development mode (Vite plugin)
  try {
    await fetch("/api/save-json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filePath, content })
    });
  } catch (e) {
    console.warn("Could not save locally. This is normal in production.", e);
  }

  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;

  const fetchLatestSha = async () => {
    try {
      const formattedToken = token.trim().startsWith("token ") || token.trim().startsWith("Bearer ")
        ? token.trim()
        : `token ${token.trim()}`;

      const getResponse = await axios.get<any>(url, {
        headers: {
          Authorization: formattedToken,
          Accept: "application/vnd.github.v3+json",
        },
        params: {
          ref: GITHUB_BRANCH,
          _t: Date.now(),
        },
      });
      return getResponse.data?.sha || "";
    } catch (err: any) {
      if (!err.response || err.response.status !== 404) {
        throw err;
      }
      return "";
    }
  };

  try {
    // 1. Get the current file SHA with cache busting
    let sha = await fetchLatestSha();

    // 2. Encode content to base64
    const base64Content = btoa(unescape(encodeURIComponent(content)));

    // Helper for PUT request
    const attemptPut = async (currentSha: string) => {
      const formattedToken = token.trim().startsWith("token ") || token.trim().startsWith("Bearer ")
        ? token.trim()
        : `token ${token.trim()}`;

      const payload: any = {
        message: commitMessage,
        content: base64Content,
        branch: GITHUB_BRANCH,
      };

      if (currentSha) {
        payload.sha = currentSha;
      }

      return await axios.put(url, payload, {
        headers: {
          Authorization: formattedToken,
          Accept: "application/vnd.github.v3+json",
        },
      });
    };

    // 3. Put the updated content, with auto-retry on 409 SHA conflict
    try {
      const putResponse = await attemptPut(sha);
      return putResponse.data;
    } catch (putErr: any) {
      if (putErr.response && putErr.response.status === 409) {
        console.warn("SHA mismatch (409 Conflict). Fetching latest SHA and retrying...");
        const freshSha = await fetchLatestSha();
        const putResponse = await attemptPut(freshSha);
        return putResponse.data;
      }
      throw putErr;
    }
  } catch (error: any) {
    console.error("GitHub API Error:", error);
    let errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to save to GitHub";

    throw new Error(errorMsg);
  }
};

export const saveLocalDraft = async (filePath: string, content: string) => {
  // 1. Attempt to save locally if running in development mode (Vite plugin)
  try {
    await fetch("/api/save-json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filePath, content })
    });
  } catch (e) {
    console.warn("Could not save locally. This is normal in production.", e);
  }

  // 2. Stage in localStorage
  try {
    const staged = getStagedChangesMap();
    staged[filePath] = {
      filePath,
      content,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("staged_cms_updates", JSON.stringify(staged));
  } catch (e) {
    console.error("Failed to save to localStorage staging:", e);
  }
};

export const getStagedChangesMap = (): Record<string, { filePath: string; content: string; updatedAt: string }> => {
  try {
    const raw = localStorage.getItem("staged_cms_updates");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const getStagedCount = (): number => {
  return Object.keys(getStagedChangesMap()).length;
};

export const clearStagedChanges = () => {
  try {
    localStorage.removeItem("staged_cms_updates");
  } catch (e) {
    console.error("Failed to clear staged changes:", e);
  }
};

export const publishAllStagedToGithub = async (
  token: string,
  currentFilePath?: string,
  currentContent?: string,
  onProgress?: (msg: string) => void
) => {
  if (!token) {
    throw new Error("GitHub token is required to save changes.");
  }

  // If current file was provided, save/stage it first
  if (currentFilePath && currentContent) {
    await saveLocalDraft(currentFilePath, currentContent);
  }

  const stagedMap = getStagedChangesMap();
  const filePaths = Object.keys(stagedMap);

  if (filePaths.length === 0) {
    throw new Error("No updates found in storage to publish.");
  }

  let publishedCount = 0;

  for (let i = 0; i < filePaths.length; i++) {
    const path = filePaths[i];
    const item = stagedMap[path];
    if (onProgress) {
      onProgress(`[${i + 1}/${filePaths.length}] Publishing ${path} to GitHub...`);
    }

    const filename = path.split("/").pop() || path;
    await saveToGithub(
      path,
      item.content,
      token,
      `Update ${filename} via Admin CMS Batch Publish`
    );
    publishedCount++;
  }

  clearStagedChanges();
  return publishedCount;
};
