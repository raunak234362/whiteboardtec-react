import React, { useEffect, useState, useId } from "react";
import { Navigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  Plus,
  Trash2,
  Eye,
  X,
  Upload,
  Image as ImageIcon,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Header, HeaderProp, Sidebar, useSidebar, RichTextEditor } from "../components";
import Service from "../../../config/service";
import { whyUsPicInterface } from "../../../config/interface";


const DEFAULT_CARD_IMAGE =
  "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685708/route-image/our-firm_qbwtod.jpg";

/** Helper to extract all image URLs from various backend formats */
export const getWhyUsImageUrls = (image: any): string[] => {
  if (!image) return [DEFAULT_CARD_IMAGE];

  // If it's already a direct string URL or a JSON string
  if (typeof image === "string") {
    const trimmed = image.trim();
    if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
      try {
        const parsed = JSON.parse(trimmed);
        return getWhyUsImageUrls(parsed);
      } catch {
        return [trimmed || DEFAULT_CARD_IMAGE];
      }
    }
    return [trimmed || DEFAULT_CARD_IMAGE];
  }

  // If it's an array
  if (Array.isArray(image)) {
    if (image.length === 0) return [DEFAULT_CARD_IMAGE];
    const urls = image
      .map((item) => {
        if (typeof item === "string") return item.trim();
        if (typeof item === "object" && item) {
          return (
            item.secureUrl ||
            item.secure_url ||
            item.url ||
            item.path ||
            ""
          );
        }
        return "";
      })
      .filter(Boolean);
    return urls.length > 0 ? urls : [DEFAULT_CARD_IMAGE];
  }

  // If it's an object with url / secureUrl / secure_url
  if (typeof image === "object" && image) {
    const url =
      image.secureUrl ||
      image.secure_url ||
      image.url ||
      image.path ||
      DEFAULT_CARD_IMAGE;
    return [url];
  }

  return [DEFAULT_CARD_IMAGE];
};

/** Helper to robustly extract primary image URL */
export const getWhyUsImageUrl = (image: any): string => {
  const list = getWhyUsImageUrls(image);
  return list[0] || DEFAULT_CARD_IMAGE;
};

const WhyUs: React.FC = () => {
  const { isSidebarOpen } = useSidebar();
  const header: HeaderProp = { head: "Why Us - Life at WBT Cards" };
  const token = sessionStorage.getItem("token");

  const [cards, setCards] = useState<whyUsPicInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Add Card Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formTag, setFormTag] = useState<string>("");
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formOrder, setFormOrder] = useState<number>(1);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [previewActiveIdx, setPreviewActiveIdx] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputId = useId();

  // Inspect / View Modal State
  const [viewCard, setViewCard] = useState<whyUsPicInterface | null>(null);
  const [viewImageIndex, setViewImageIndex] = useState<number>(0);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isFetchingDetails, setIsFetchingDetails] = useState<boolean>(false);

  // Deleting State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch all cards
  const fetchCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await Service.whyUsPicGet();
      // Sort cards by order ascending
      const sorted = (data || []).slice().sort((a, b) => {
        const orderA = Number(a.order) || 0;
        const orderB = Number(b.order) || 0;
        return orderA - orderB;
      });
      setCards(sorted);
    } catch (err: any) {
      console.error("Error fetching WhyUs cards:", err);
      setError(
        err?.response?.data?.message ||
          "Failed to load Why Us cards from the server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Admin | Why Us - Life at WBT";
    if (token) {
      fetchCards();
    }
  }, [token]);

  // Auth Guard
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Open Add Card Modal with auto-calculated order
  const handleOpenAddModal = () => {
    const maxOrder = cards.reduce(
      (max, c) => Math.max(max, Number(c.order) || 0),
      0
    );
    setFormTag("Outings & Fun");
    setFormTitle("");
    setFormDescription("");
    setFormOrder(maxOrder + 1);
    setSelectedFiles([]);
    setFilePreviews([]);
    setPreviewActiveIdx(0);
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    if (isSubmitting) return;
    setIsAddModalOpen(false);
    setSelectedFiles([]);
    setFilePreviews([]);
    setPreviewActiveIdx(0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const added = Array.from(e.target.files);
      const combined = [...selectedFiles, ...added];
      setSelectedFiles(combined);
      setFilePreviews(combined.map((f) => URL.createObjectURL(f)));
      e.target.value = "";
    }
  };

  const removeSelectedFile = (idxToRemove: number) => {
    const updated = selectedFiles.filter((_, idx) => idx !== idxToRemove);
    setSelectedFiles(updated);
    setFilePreviews(updated.map((f) => URL.createObjectURL(f)));
    if (previewActiveIdx >= updated.length) {
      setPreviewActiveIdx(Math.max(0, updated.length - 1));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const dropped = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (dropped.length > 0) {
        const combined = [...selectedFiles, ...dropped];
        setSelectedFiles(combined);
        setFilePreviews(combined.map((f) => URL.createObjectURL(f)));
      }
    }
  };

  // Submit Add Card Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTag.trim()) {
      alert("Please provide a tag/badge for the card.");
      return;
    }
    if (!formTitle.trim()) {
      alert("Please provide a title for the card.");
      return;
    }
    const strippedDesc = formDescription.replace(/<[^>]*>/g, "").trim();
    if (!strippedDesc) {
      alert("Please provide a description.");
      return;
    }
    if (selectedFiles.length === 0) {
      alert("Please select at least one image for this card.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("tag", formTag.trim());
      formData.append("title", formTitle.trim());
      formData.append("description", formDescription.trim());
      formData.append("order", String(formOrder ?? 1));

      // Append multiple images for backend array ingestion
      selectedFiles.forEach((file) => {
        formData.append("image", file);
      });

      await Service.whyUsAdd(formData);
      alert(`Card with ${selectedFiles.length} image(s) added successfully!`);
      handleCloseAddModal();
      await fetchCards();
    } catch (err: any) {
      console.error("Error adding card:", err);
      const msg =
        err?.response?.data?.message ||
        "Failed to add card. Please ensure all fields and images are valid.";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // View card by ID using Service.whyUsPicGetbyId
  const handleViewCard = async (card: whyUsPicInterface) => {
    setIsFetchingDetails(true);
    setViewCard(card);
    setViewImageIndex(0);
    setIsViewModalOpen(true);
    try {
      const freshData = await Service.whyUsPicGetbyId(card.id);
      if (freshData) {
        setViewCard(freshData);
      }
    } catch (err: any) {
      console.error("Error fetching card details by ID:", err);
    } finally {
      setIsFetchingDetails(false);
    }
  };

  // Delete card using Service.whyUsPicDelete
  const handleDeleteCard = async (card: whyUsPicInterface) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${card.title}"?\nThis action cannot be undone.`
    );
    if (!confirmDelete) return;

    setDeletingId(card.id);
    try {
      await Service.whyUsPicDelete(card.id);
      alert("Card deleted successfully!");
      await fetchCards();
    } catch (err: any) {
      console.error("Error deleting card:", err);
      const msg =
        err?.response?.data?.message ||
        "Failed to delete the card. Please check server logs.";
      alert(msg);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section
      className={`min-h-screen grid ${
        isSidebarOpen ? "grid-cols-[260px_1fr]" : "grid-cols-[0px_1fr]"
      } bg-gray-50 transition-all duration-300`}
    >
      <aside
        className={`overflow-auto bg-white border-r border-gray-200 transition-all duration-300 ${
          isSidebarOpen ? "w-[260px]" : "w-0 border-r-0 overflow-hidden"
        }`}
      >
        <Sidebar />
      </aside>

      <main className="flex flex-col min-w-0">
        <Header {...header} />

        <div className="flex-grow p-6 md:p-8 overflow-auto bg-gray-50">
          {/* Top Banner Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                Why Us - Highlight Cards
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={fetchCards}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg text-sm font-medium transition shadow-sm disabled:opacity-50"
                title="Refresh cards"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>

              <button
                type="button"
                onClick={handleOpenAddModal}
                style={{ backgroundColor: "#6abd45", color: "#ffffff" }}
                className="inline-flex items-center gap-2 px-5 py-2 !bg-[#6abd45] hover:!bg-[#5da73d] !text-white rounded-lg text-sm font-bold shadow transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3] text-white" />
                <span className="text-white">Add New Card</span>
              </button>
            </div>
          </div>
         

          {/* Cards Content Area */}
          {loading && (
            <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm text-center">
              <RefreshCw className="w-8 h-8 mx-auto text-[#6abd45] animate-spin mb-3" />
              <p className="text-gray-600 font-medium">
                Fetching Why Us cards from server...
              </p>
            </div>
          )}

          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-700">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <h3 className="font-bold text-lg mb-1">Failed to Load Cards</h3>
              <p className="text-sm max-w-md mx-auto">{error}</p>
              <button
                type="button"
                onClick={fetchCards}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && cards.length === 0 && (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center my-6">
              <div className="w-16 h-16 bg-green-50 text-[#6abd45] rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Why Us Cards Found
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
                There are currently no cards saved in the database for the Why
                Us section. Click below to add your first highlight card!
              </p>
              <button
                type="button"
                onClick={handleOpenAddModal}
                style={{ backgroundColor: "#6abd45", color: "#ffffff" }}
                className="inline-flex items-center gap-2 px-6 py-3 !bg-[#6abd45] hover:!bg-[#5da73d] !text-white rounded-xl text-sm font-bold shadow transition cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3] text-white" />
                <span className="text-white">Add Your First Card</span>
              </button>
            </div>
          )}

          {/* Cards Grid */}
          {!loading && !error && cards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
              {cards.map((card) => {
                const cardImages = getWhyUsImageUrls(card.image);
                const primaryImg = cardImages[0] || DEFAULT_CARD_IMAGE;
                const isDeleting = deletingId === card.id;

                return (
                  <div
                    key={card.id}
                    className="group bg-white border-2 border-gray-200 hover:border-[#6abd45]/60 shadow-sm hover:shadow-xl rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 relative"
                  >
                    {/* Top image with badge */}
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={primaryImg}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            DEFAULT_CARD_IMAGE;
                        }}
                      />
                      {/* Pill Badge */}
                      <span className="absolute top-3 left-3 bg-[#6abd45] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {card.tag}
                      </span>

                      {/* Order indicator */}
                      <span className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white text-xs font-mono font-semibold px-2.5 py-1 rounded-full shadow">
                        #{card.order}
                      </span>

                      {/* Multiple images indicator */}
                      {cardImages.length > 1 && (
                        <span className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow flex items-center gap-1.5">
                          <ImageIcon className="w-3 h-3 text-[#6abd45]" />
                          <span>{cardImages.length} images</span>
                        </span>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                          {card.title}
                        </h3>
                        <div
                          className="text-gray-600 text-sm leading-relaxed text-justify line-clamp-4 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: card.description }}
                        />
                      </div>

                      {/* Card Footer Actions */}
                      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-mono text-gray-400 truncate max-w-[120px]" title={card.id}>
                          ID: {card.id.slice(0, 8)}...
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleViewCard(card)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                            title="View Full Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteCard(card)}
                            disabled={isDeleting}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition disabled:opacity-50"
                            title="Delete Card"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* ================= ADD CARD MODAL ================= */}
      <Transition appear show={isAddModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={handleCloseAddModal}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl max-h-[90vh] overflow-y-auto transform rounded-3xl bg-white p-6 md:p-8 text-left align-middle shadow-2xl transition-all">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-bold text-gray-900"
                      >
                        Add New Why Us Card
                      </Dialog.Title>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Fill in the details below to add a card to the "What does working here actually feel like?" section.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCloseAddModal}
                      disabled={isSubmitting}
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Modal Body: Form & Live Preview split */}
                  <form onSubmit={handleSubmit} className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left: Inputs (7 cols) */}
                      <div className="lg:col-span-7 space-y-4">
                        {/* Tag */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                            Tag / Badge <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formTag}
                            onChange={(e) => setFormTag(e.target.value)}
                            placeholder="e.g. Outings & Fun, Celebrations..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6abd45] focus:border-transparent text-sm"
                            required
                          />
                        </div>

                        {/* Title */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                            Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formTitle}
                            onChange={(e) => setFormTitle(e.target.value)}
                            placeholder="e.g. Team Outings & Annual Retreats"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6abd45] focus:border-transparent text-sm font-medium"
                            required
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                            Description <span className="text-red-500">*</span>
                          </label>
                          <RichTextEditor
                            value={formDescription}
                            onChange={(val) => setFormDescription(val)}
                            height={220}
                          />
                        </div>

                        {/* Order */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                            Display Order Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={formOrder}
                            onChange={(e) => setFormOrder(Number(e.target.value) || 0)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6abd45] focus:border-transparent text-sm"
                            required
                          />
                          <p className="text-[11px] text-gray-500 mt-1">
                            Cards are sorted by this number in ascending order (1, 2, 3...).
                          </p>
                        </div>

                        {/* Image Upload */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                              Card Images <span className="text-red-500">*</span>
                            </label>
                            <span className="text-[11px] text-gray-500 font-medium">
                              Multiple files supported
                            </span>
                          </div>

                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`mt-1 flex flex-col justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-2xl transition bg-gray-50 ${
                              isDragging
                                ? "border-[#6abd45] bg-green-50/50 scale-[0.99]"
                                : "border-gray-300 hover:border-[#6abd45]"
                            }`}
                          >
                            <div className="space-y-2 text-center">
                              <Upload className="mx-auto h-9 w-9 text-gray-400" />
                              <div className="flex text-sm text-gray-600 justify-center items-center gap-2">
                                <label
                                  htmlFor={fileInputId}
                                  className="relative cursor-pointer bg-white rounded-md font-bold text-[#6abd45] hover:text-[#589c37] focus-within:outline-none px-3 py-1 border border-gray-200 shadow-sm"
                                >
                                  <span>Choose Images</span>
                                  <input
                                    id={fileInputId}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    className="sr-only"
                                  />
                                </label>
                                <p className="self-center">or drag and drop here</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, WEBP • Select one or multiple images
                              </p>
                            </div>
                          </div>

                          {/* Selected files preview gallery */}
                          {selectedFiles.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                                <span>Selected Images ({selectedFiles.length})</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedFiles([]);
                                    setFilePreviews([]);
                                    setPreviewActiveIdx(0);
                                  }}
                                  className="text-red-500 hover:text-red-700 font-semibold"
                                >
                                  Clear all
                                </button>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-200">
                                {selectedFiles.map((file, idx) => (
                                  <div
                                    key={idx}
                                    onClick={() => setPreviewActiveIdx(idx)}
                                    className={`relative group rounded-lg overflow-hidden border-2 bg-white p-1 cursor-pointer transition ${
                                      previewActiveIdx === idx
                                        ? "border-[#6abd45] ring-2 ring-[#6abd45]/30"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                                  >
                                    <img
                                      src={filePreviews[idx]}
                                      alt={file.name}
                                      className="w-full h-16 object-cover rounded"
                                    />
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeSelectedFile(idx);
                                      }}
                                      className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full p-1 opacity-90 hover:opacity-100 shadow transition"
                                      title="Remove image"
                                    >
                                      <X className="w-3 h-3 stroke-[3]" />
                                    </button>
                                    <p
                                      className="text-[10px] text-gray-700 truncate mt-1 px-0.5 font-medium"
                                      title={file.name}
                                    >
                                      {file.name}
                                    </p>
                                    <p className="text-[9px] text-gray-400 px-0.5">
                                      {(file.size / 1024).toFixed(1)} KB
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Live Card Preview (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                            Live Public Card Preview
                          </label>
                          {filePreviews.length > 1 && (
                            <span className="text-[11px] text-[#6abd45] font-bold">
                              Viewing photo {previewActiveIdx + 1} of {filePreviews.length}
                            </span>
                          )}
                        </div>

                        <div className="bg-white border-2 border-gray-200 shadow-md rounded-3xl overflow-hidden flex flex-col justify-between my-auto">
                          <div className="relative h-48 overflow-hidden bg-gray-100">
                            <img
                              src={
                                filePreviews[previewActiveIdx] ||
                                filePreviews[0] ||
                                DEFAULT_CARD_IMAGE
                              }
                              alt="Preview"
                              className="w-full h-full object-cover transition-all duration-300"
                            />
                            <span className="absolute top-3 left-3 bg-[#6abd45] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                              {formTag || "Badge Tag"}
                            </span>
                            <span className="absolute top-3 right-3 bg-black/70 text-white text-xs font-mono font-semibold px-2.5 py-1 rounded-full shadow">
                              #{formOrder || 1}
                            </span>
                            {filePreviews.length > 1 && (
                              <span className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded-md shadow flex items-center gap-1">
                                <ImageIcon className="w-3 h-3 text-[#6abd45]" />
                                <span>{filePreviews.length} photos</span>
                              </span>
                            )}
                          </div>

                          {/* Mini thumbnails ribbon if multiple images */}
                          {filePreviews.length > 1 && (
                            <div className="flex gap-1.5 p-2 bg-gray-50 border-b border-gray-100 overflow-x-auto">
                              {filePreviews.map((pUrl, pIdx) => (
                                <button
                                  key={pIdx}
                                  type="button"
                                  onClick={() => setPreviewActiveIdx(pIdx)}
                                  className={`relative rounded-md overflow-hidden flex-shrink-0 w-12 h-10 border-2 transition ${
                                    previewActiveIdx === pIdx
                                      ? "border-[#6abd45] ring-2 ring-[#6abd45]/30"
                                      : "border-transparent opacity-60 hover:opacity-100"
                                  }`}
                                >
                                  <img
                                    src={pUrl}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              ))}
                            </div>
                          )}

                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-black mb-2 leading-tight">
                                {formTitle || "Card Title Goes Here"}
                              </h3>
                              <div
                                className="text-gray-700 text-sm leading-relaxed text-justify prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    formDescription ||
                                    "This is a live preview of the description text that visitors will read on the Life at WBT page.",
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        
                      </div>
                    </div>

                    {/* Modal Actions */}
                    <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={handleCloseAddModal}
                        disabled={isSubmitting}
                        className="px-5 py-2.5 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl text-sm font-semibold transition"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{ backgroundColor: "#6abd45", color: "#ffffff" }}
                        className="inline-flex items-center gap-2 px-6 py-2.5 !bg-[#6abd45] hover:!bg-[#5da73d] !text-white rounded-xl text-sm font-bold shadow transition disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-white" />
                            <span className="text-white">Uploading & Saving...</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 stroke-[3] text-white" />
                            <span className="text-white">Create Card</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* ================= VIEW / INSPECT MODAL ================= */}
      <Transition appear show={isViewModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsViewModalOpen(false)}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white p-6 md:p-8 text-left align-middle shadow-2xl transition-all">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-bold text-gray-900 flex items-center gap-2"
                      >
                        <span>Card Details (API Inspection)</span>
                        {isFetchingDetails && (
                          <RefreshCw className="w-4 h-4 text-[#6abd45] animate-spin" />
                        )}
                      </Dialog.Title>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">
                        Fetched via Service.whyUsPicGetbyId
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsViewModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {viewCard && (() => {
                    const viewImages = getWhyUsImageUrls(viewCard.image);
                    const currentImg = viewImages[viewImageIndex] || viewImages[0];

                    return (
                      <div className="mt-6 space-y-6">
                        {/* Interactive Multi-Image viewer */}
                        <div className="space-y-2">
                          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                            <img
                              src={currentImg}
                              alt={viewCard.title}
                              className="w-full h-full object-cover transition-all duration-300"
                            />
                            <span className="absolute top-3 left-3 bg-[#6abd45] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                              {viewCard.tag}
                            </span>
                            <span className="absolute top-3 right-3 bg-black/75 text-white text-xs font-mono font-semibold px-3 py-1 rounded-full shadow">
                              Order: #{viewCard.order}
                            </span>

                            {/* Left/Right navigation arrows if multiple images */}
                            {viewImages.length > 1 && (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setViewImageIndex((prev) =>
                                      prev === 0 ? viewImages.length - 1 : prev - 1
                                    )
                                  }
                                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full backdrop-blur-sm transition"
                                  title="Previous image"
                                >
                                  <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setViewImageIndex((prev) =>
                                      prev === viewImages.length - 1 ? 0 : prev + 1
                                    )
                                  }
                                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full backdrop-blur-sm transition"
                                  title="Next image"
                                >
                                  <ChevronRight className="w-5 h-5" />
                                </button>
                                <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                  {viewImageIndex + 1} / {viewImages.length}
                                </span>
                              </>
                            )}
                          </div>

                          {/* Gallery Thumbnail Strip */}
                          {viewImages.length > 1 && (
                            <div className="flex gap-2 p-1.5 bg-gray-50 rounded-xl border border-gray-200 overflow-x-auto">
                              {viewImages.map((imgUrl, imgIdx) => (
                                <button
                                  key={imgIdx}
                                  type="button"
                                  onClick={() => setViewImageIndex(imgIdx)}
                                  className={`relative rounded-lg overflow-hidden flex-shrink-0 w-16 h-12 border-2 transition ${
                                    viewImageIndex === imgIdx
                                      ? "border-[#6abd45] ring-2 ring-[#6abd45]/40"
                                      : "border-transparent opacity-60 hover:opacity-100"
                                  }`}
                                >
                                  <img
                                    src={imgUrl}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                      {/* Fields */}
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                            Title
                          </span>
                          <p className="text-lg font-bold text-gray-900">
                            {viewCard.title}
                          </p>
                        </div>

                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                            Description
                          </span>
                          <div
                            className="text-gray-700 leading-relaxed text-justify mt-1 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: viewCard.description }}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                              UUID / ID
                            </span>
                            <span className="font-mono text-xs text-gray-800 break-all select-all">
                              {viewCard.id}
                            </span>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                              Order Index
                            </span>
                            <span className="font-bold text-sm text-[#509633]">
                              {viewCard.order}
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                            Image Raw Data
                          </span>
                          <pre className="bg-gray-900 text-green-400 p-3 rounded-xl text-xs overflow-x-auto font-mono">
                            {JSON.stringify(viewCard.image, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                    );
                  })()}

                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsViewModalOpen(false)}
                      className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};

export default WhyUs;
