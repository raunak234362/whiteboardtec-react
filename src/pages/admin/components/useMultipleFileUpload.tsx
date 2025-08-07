import { useState } from "react";

export function useMultipleFileUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Handle file selection
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  // Remove file by index
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear all selected files
  const clearFiles = () => {
    setSelectedFiles([]);
  };

  return {
    selectedFiles,
    onFileChange,
    removeFile,
    clearFiles,
    setSelectedFiles,
  };
}
