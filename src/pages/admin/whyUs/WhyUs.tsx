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
  Layers,
  ArrowUpDown,
  RefreshCw,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Header, HeaderProp, Sidebar, useSidebar } from "../components";
import Service from "../../../config/service";
import { whyUsPicInterface } from "../../../config/interface";

const TAG_PRESETS = [
  "Outings & Fun",
  "Celebrations",
  "Rewards",
  "Workplace",
  "Wellbeing",
  "Growth",
];

const DEFAULT_CARD_IMAGE =
  "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753685708/route-image/our-firm_qbwtod.jpg";

/** Helper to robustly extract image URL from various backend formats */
export const getWhyUsImageUrl = (image: any): string => {
  if (!image) return DEFAULT_CARD_IMAGE;

  // If it's already a direct string URL
  if (typeof image === "string") {
    const trimmed = image.trim();
    if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
      try {
        const parsed = JSON.parse(trimmed);
        return getWhyUsImageUrl(parsed);
      } catch {
        return trimmed || DEFAULT_CARD_IMAGE;
      }
    }
    return trimmed || DEFAULT_CARD_IMAGE;
  }

  // If it's an array
  if (Array.isArray(image)) {
    if (image.length === 0) return DEFAULT_CARD_IMAGE;
    return getWhyUsImageUrl(image[0]);
  }

  // If it's an object with url / secureUrl / secure_url
  if (typeof image === "object") {
    return (
      image.secureUrl ||
      image.secure_url ||
      image.url ||
      image.path ||
      DEFAULT_CARD_IMAGE
    );
  }

  return DEFAULT_CARD_IMAGE;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputId = useId();

  // Inspect / View Modal State
  const [viewCard, setViewCard] = useState<whyUsPicInterface | null>(null);
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
    setSelectedFile(null);
    setFilePreview(null);
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    if (isSubmitting) return;
    setIsAddModalOpen(false);
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setFilePreview(url);
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
    if (!formDescription.trim()) {
      alert("Please provide a description.");
      return;
    }
    if (!selectedFile) {
      alert("Please select an image for this card.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("tag", formTag.trim());
      formData.append("title", formTitle.trim());
      formData.append("description", formDescription.trim());
      formData.append("image", selectedFile);

      await Service.whyUsAdd(formData);
      alert("Card added successfully!");
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
    setIsViewModalOpen(true);
    try {
      const freshData = await Service.whyUsPicGetbyId(card.id);
      if (freshData) {
        setViewCard(freshData);
      }
    } catch (err: any) {
      console.error("Error fetching card details by ID:", err);
      // Keep displaying the current card from state if byId fails
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
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-[#509633]">
                  Public Section
                </span>
                <span className="text-xs text-gray-500">
                  /why-us &bull; "What does working here actually feel like?"
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                Why Us - Highlight Cards
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage the interactive feature cards displayed on the public
                "Life at WBT" section.
              </p>
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
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#6abd45] hover:bg-[#5da73d] text-white rounded-lg text-sm font-bold shadow transition transform hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Card</span>
              </button>
            </div>
          </div>

          {/* Metrics summary bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-[#6abd45]">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Total Cards
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {cards.length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <ArrowUpDown className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Sorting
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  Ascending by Order #
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Next Order #
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {cards.reduce(
                    (max, c) => Math.max(max, Number(c.order) || 0),
                    0
                  ) + 1}
                </p>
              </div>
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#6abd45] hover:bg-[#5da73d] text-white rounded-xl text-sm font-bold shadow transition"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Your First Card</span>
              </button>
            </div>
          )}

          {/* Cards Grid */}
          {!loading && !error && cards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
              {cards.map((card) => {
                const imgUrl = getWhyUsImageUrl(card.image);
                const isDeleting = deletingId === card.id;

                return (
                  <div
                    key={card.id}
                    className="group bg-white border-2 border-gray-200 hover:border-[#6abd45]/60 shadow-sm hover:shadow-xl rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 relative"
                  >
                    {/* Top image with badge */}
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={imgUrl}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback if image fails to load
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
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                          {card.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed text-justify line-clamp-4">
                          {card.description}
                        </p>
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white p-6 md:p-8 text-left align-middle shadow-2xl transition-all">
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
                          {/* Quick Tag Presets */}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            <span className="text-[11px] text-gray-500 self-center mr-1">
                              Presets:
                            </span>
                            {TAG_PRESETS.map((preset) => (
                              <button
                                key={preset}
                                type="button"
                                onClick={() => setFormTag(preset)}
                                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition ${
                                  formTag === preset
                                    ? "bg-[#6abd45] text-white border-[#6abd45]"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200"
                                }`}
                              >
                                {preset}
                              </button>
                            ))}
                          </div>
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
                          <textarea
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            rows={4}
                            placeholder="Describe what employees experience and celebrate..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6abd45] focus:border-transparent text-sm resize-none"
                            required
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
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                            Card Cover Image <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-2xl hover:border-[#6abd45] transition bg-gray-50">
                            <div className="space-y-1 text-center">
                              <Upload className="mx-auto h-10 w-10 text-gray-400" />
                              <div className="flex text-sm text-gray-600 justify-center">
                                <label
                                  htmlFor={fileInputId}
                                  className="relative cursor-pointer bg-white rounded-md font-bold text-[#6abd45] hover:text-[#589c37] focus-within:outline-none px-2 py-0.5 border border-gray-200"
                                >
                                  <span>Choose File</span>
                                  <input
                                    id={fileInputId}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="sr-only"
                                  />
                                </label>
                                <p className="pl-2 self-center">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, WEBP up to 10MB
                              </p>
                              {selectedFile && (
                                <p className="text-xs font-bold text-[#509633] mt-2 bg-green-50 py-1 px-3 rounded-full inline-block">
                                  ✓ Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Live Card Preview (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Live Public Card Preview
                        </label>

                        <div className="bg-white border-2 border-gray-200 shadow-md rounded-3xl overflow-hidden flex flex-col justify-between my-auto">
                          <div className="relative h-48 overflow-hidden bg-gray-100">
                            <img
                              src={filePreview || DEFAULT_CARD_IMAGE}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-3 left-3 bg-[#6abd45] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                              {formTag || "Badge Tag"}
                            </span>
                            <span className="absolute top-3 right-3 bg-black/70 text-white text-xs font-mono font-semibold px-2.5 py-1 rounded-full shadow">
                              #{formOrder || 1}
                            </span>
                          </div>

                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-black mb-2 leading-tight">
                                {formTitle || "Card Title Goes Here"}
                              </h3>
                              <p className="text-gray-700 text-sm leading-relaxed text-justify">
                                {formDescription ||
                                  "This is a live preview of the description text that visitors will read on the Life at WBT page."}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-500">
                          ℹ️ The card will be uploaded to Cloudinary via the backend{" "}
                          <code className="font-mono text-gray-700 font-bold">whyUsPic/create</code>{" "}
                          endpoint.
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
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6abd45] hover:bg-[#5da73d] text-white rounded-xl text-sm font-bold shadow transition disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Uploading & Saving...</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 stroke-[3]" />
                            <span>Create Card</span>
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

                  {viewCard && (
                    <div className="mt-6 space-y-6">
                      {/* Image preview */}
                      <div className="relative h-64 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                        <img
                          src={getWhyUsImageUrl(viewCard.image)}
                          alt={viewCard.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-[#6abd45] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                          {viewCard.tag}
                        </span>
                        <span className="absolute top-3 right-3 bg-black/75 text-white text-xs font-mono font-semibold px-3 py-1 rounded-full shadow">
                          Order: #{viewCard.order}
                        </span>
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
                          <p className="text-gray-700 leading-relaxed text-justify mt-1">
                            {viewCard.description}
                          </p>
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
                  )}

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
