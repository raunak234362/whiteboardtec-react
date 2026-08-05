import axios from 'axios';

const GITHUB_REPO = 'raunak234362/whiteboardtec-react';
const GITHUB_BRANCH = 'development'; // Currently running on development branch

export const saveToGithub = async (filePath: string, content: string, token: string, commitMessage: string) => {
  if (!token) {
    throw new Error('GitHub token is required to save changes.');
  }

  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;
  
  try {
    // 1. Get the current file to get its SHA (required for updating an existing file)
    let sha = '';
    try {
      const getResponse = await axios.get(url, {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json'
        },
        params: {
          ref: GITHUB_BRANCH
        }
      });
      sha = getResponse.data.sha;
    } catch (err: any) {
      if (err.response && err.response.status !== 404) {
        throw new Error('Failed to fetch existing file from GitHub.');
      }
      // If 404, file doesn't exist yet, we just create it (sha remains empty)
    }

    // 2. Encode content to base64
    const base64Content = btoa(unescape(encodeURIComponent(content)));

    // 3. Put the updated content
    const putResponse = await axios.put(
      url,
      {
        message: commitMessage,
        content: base64Content,
        sha: sha || undefined,
        branch: GITHUB_BRANCH
      },
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );

    return putResponse.data;
  } catch (error: any) {
    console.error('GitHub API Error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to save to GitHub');
  }
};
