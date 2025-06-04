import { useState } from "react";
import { ImagePortfolioPropType } from "../../ourWork";
// import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { storage, db } from "../../../config/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";

function ImagePortfolio(props: ImagePortfolioPropType) {
  const [isOpenJob, setOpenJob] = useState(false);
  const [isImageOpen, setImageOpen] = useState(false);
  const [title, setTitle] = useState(props.title || "");
  const [description, setDescription] = useState(props.description || "");
  const [location, setLocation] = useState(props.location || "");
  const [projectType, setProjectType] = useState(props.projectType || "");
  const [softwareUsed, setSoftwareUsed] = useState(props.softwareUsed || "");
  const [projectStatus, setProjectStatus] = useState(
    props.projectStatus || "In Progress"
  );
  const [img, setImage] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(0);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentLoaded = (event.loaded / event.total) * 100;
          setProgress(percentLoaded);
        }
      };

      reader.onloadend = () => {
        setProgress(100);
        setImage(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setTitle(props.title || "");
    setDescription(props.description || "");
    setLocation(props.location || "");
    setProjectType(props.projectType || "");
    setSoftwareUsed(props.softwareUsed || "");
    setProjectStatus(props.projectStatus || "In Progress");
    setImage(props.img);
    // setStatus(props.status || false);
    setProgress(0);
  };

  const handleUpdate = async () => {
    try {
      const data = {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        projectType: projectType.trim(),
        softwareUsed: softwareUsed.trim(),
        projectStatus: projectStatus,
        img: props.img || null,
        status: status,
        updatedAt: new Date().toISOString(),
      };

      if (img && props.img) {
        // Delete old image
        try {
          const oldImageRef = ref(storage, props.img.split("?")[0]);
          await deleteObject(oldImageRef);
          console.log("Old image deleted");
        } catch (err) {
          console.log("Error deleting old image:", err);
        }

        // Upload new image
        const imgFile = ref(
          storage,
          `Gallery/${title.replace(/\s+/g, "_")}_${v4()}`
        );
        const snapshot = await uploadBytes(imgFile, img);
        const url = await getDownloadURL(snapshot.ref);
        data.img = url;
      }

      const portfolioRef = doc(db, "gallery", props.id);
      await updateDoc(portfolioRef, data);

      alert("Portfolio project updated successfully");
      setOpenJob(false);
      setProgress(0);
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      console.error("Error updating portfolio:", error);
      alert("Error updating portfolio. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this portfolio project? This action cannot be undone."
      )
    ) {
      try {
        // Delete image from storage
        if (props.img) {
          try {
            const imageRef = ref(storage, props.img.split("?")[0]);
            await deleteObject(imageRef);
            console.log("Image deleted from storage");
          } catch (err) {
            console.log("Error deleting image:", err);
          }
        }

        // Delete document from Firestore
        await deleteDoc(doc(db, "gallery", props.id));
        alert("Portfolio project deleted successfully");
        window.location.reload(); // Refresh to show updated list
      } catch (error) {
        console.error("Error deleting portfolio:", error);
        alert("Error deleting portfolio. Please try again.");
      }
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  return (
    <>
      {/* Edit Modal */}
      <Dialog
        open={isOpenJob}
        onClose={() => {
          setOpenJob(false);
          resetForm();
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-white w-full max-w-6xl p-6 rounded-lg shadow-lg flex flex-col max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-lg font-semibold">
                  Edit Portfolio: {props.title}
                </Dialog.Title>
                <button
                  onClick={() => {
                    setOpenJob(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-800"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="edit-title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Project Title *
                    </label>
                    <input
                      type="text"
                      id="edit-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description *
                    </label>
                    <textarea
                      id="edit-description"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-location"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      id="edit-location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-projectType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Project Type
                    </label>
                    <select
                      id="edit-projectType"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select project type</option>
                      <option value="Institute">Institute</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Facility Expension">
                        Facility Expension
                      </option>
                      <option value="Industrial">Industrial</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="edit-softwareUsed"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Software/Technologies Used
                    </label>
                    <input
                      type="text"
                      id="edit-softwareUsed"
                      value={softwareUsed}
                      onChange={(e) => setSoftwareUsed(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., React, Node.js, Figma, Photoshop"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-projectStatus"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Project Status
                    </label>
                    <select
                      id="edit-projectStatus"
                      value={projectStatus}
                      onChange={(e) => setProjectStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="edit-img"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Update Project Image
                    </label>
                    <input
                      type="file"
                      id="edit-img"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {progress > 0 && progress <= 100 && (
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 mt-1 block">
                          {progress.toFixed(0)}% uploaded
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Leave empty to keep current image
                    </p>
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visibility Status
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="edit-status"
                        checked={status}
                        onChange={() => setStatus(!status)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="edit-status"
                        className={`text-sm font-medium ${
                          status ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {status
                          ? "Active (Visible to public)"
                          : "Inactive (Hidden from public)"}
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  Update Project
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  Delete Project
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenJob(false);
                    resetForm();
                  }}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Image Viewer Modal */}
      <Dialog
        open={isImageOpen}
        onClose={() => setImageOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <Dialog.Title className="text-lg font-semibold">
                  {props.title}
                </Dialog.Title>
                <button
                  onClick={() => setImageOpen(false)}
                  className="text-gray-400 hover:text-gray-800"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                {props.img ? (
                  <img
                    src={props.img}
                    alt={props.title}
                    className="w-full h-auto max-h-[70vh] object-contain rounded"
                  />
                ) : (
                  <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Table Row */}
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div>
            <div className="text-sm font-medium text-gray-900">
              {props.title}
            </div>
            <div className="text-sm text-gray-500 max-w-xs truncate">
              {props.description}
            </div>
            {props.location && (
              <div className="text-xs text-gray-400 mt-1">
                📍 {props.location}
              </div>
            )}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {props.projectType && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-1">
                {props.projectType}
              </span>
            )}
            <div className="text-xs text-gray-500">
              Status:{" "}
              <span
                className={`font-medium ${
                  props.projectStatus === "Completed"
                    ? "text-green-600"
                    : props.projectStatus === "In Progress"
                    ? "text-blue-600"
                    : props.projectStatus === "On Hold"
                    ? "text-yellow-600"
                    : props.projectStatus === "Cancelled"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {props.projectStatus || "N/A"}
              </span>
            </div>
            {props.softwareUsed && (
              <div className="text-xs text-gray-400 mt-1">
                Tools: {props.softwareUsed}
              </div>
            )}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          {props.img ? (
            <button
              onClick={() => setImageOpen(true)}
              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              View Image
            </button>
          ) : (
            <span className="text-gray-400 text-sm">No image</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          <div className="flex items-center justify-center space-x-2">
            <button
              type="button"
              onClick={() => setOpenJob(true)}
              className="inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
            {/* <div
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                props.status
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {props.status ? "Active" : "Inactive"}
            </div> */}
          </div>
        </td>
      </tr>
    </>
  );
}

export default ImagePortfolio;
