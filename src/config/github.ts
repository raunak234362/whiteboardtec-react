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
      const getResponse = await axios.get<any>(url, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
        params: {
          ref: GITHUB_BRANCH,
          _t: Date.now(),
        },
      });
      return getResponse.data.sha;
    } catch (err: any) {
      if (err.response && err.response.status !== 404) {
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
          Authorization: `token ${token}`,
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
    const status = error.response?.status;
    let errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to save to GitHub";

    if (status === 404) {
      errorMsg =
        "Not Found (404). This usually means your GitHub Token is invalid, expired, or DOES NOT have the 'repo' scope checked. Please generate a new Classic Token with 'repo' permissions.";
    }

    throw new Error(errorMsg);
  }
};
