import { useEffect, useState } from "react";
import { Header, HeaderProp, Sidebar, useSidebar } from "../components";
import { Dialog } from "@headlessui/react";
import { Editor } from "primereact/editor";
import Service from "../../../config/service";
import { leadershipInterface } from "../../../config/interface";



const DEFAULT_AVATAR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48cmVjdCB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCcgZmlsbD0nI2UyZThmMCcvPjxjaXJjbGUgY3g9JzUwJyBjeT0nMzUnIHI9JzE4JyBmaWxsPScjY2JkNWUxJy8+PHBhdGggZD0nTTE1IDg1YzAtMTggMTUtMzAgMzUtMzBzMzUgMTIgMzUgMzAnIGZpbGw9JyNjYmQ1ZTEnLz48L3N2Zz4=";

function AdminLeadership() {
  const { isSidebarOpen } = useSidebar();
  const header: HeaderProp = { head: "Leadership Management" };

  const [leaders, setLeaders] = useState<leadershipInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingLeader, setEditingLeader] = useState<leadershipInterface | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchLeaders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await Service.leadershipGet();
      setLeaders(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch leadership team details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Admin | Leadership Management - Whiteboard";
    fetchLeaders();
  }, []);

  const openForm = (leader?: leadershipInterface) => {
    if (leader) {
      setEditingLeader(leader);
      setName(leader.name || "");
      setDesignation(leader.designation || "");
      setBio(leader.bio || "");
      
      // Handle sociallink parsing
      let linkStr = "";
      if (leader.socialLinks) {
        let link = leader.socialLinks as any;
        if (typeof link === "string" && link.trim().startsWith("[")) {
          try {
            link = JSON.parse(link);
          } catch (e) {}
        } else if (typeof link === "string" && link.trim().startsWith("{")) {
          try {
            link = JSON.parse(link);
          } catch (e) {}
        }

        if (Array.isArray(link) && link.length > 0) {
          link = link[0];
        }

        if (typeof link === "string") {
          linkStr = link;
        } else if (typeof link === "object" && link !== null) {
          linkStr = (link as any).url || (link as any).link || (link as any).socialLinks || "";
        }
      }
      setSocialLinks(linkStr);
      setProfilePicFile(null);
    } else {
      setEditingLeader(null);
      setName("");
      setDesignation("");
      setBio("");
      setSocialLinks("");
      setProfilePicFile(null);
    }
    setFormOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePicFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !designation.trim() || !bio.trim()) {
      alert("Name, Designation, and Bio are required fields.");
      return;
    }

    if (!editingLeader && !profilePicFile) {
      alert("Please upload a profile picture for the new leader.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("designation", designation);
      formData.append("bio", bio);
      formData.append("socialLinks", socialLinks);
      
      if (profilePicFile) {
        formData.append("profilePic", profilePicFile);
      }

      const id = editingLeader ? (editingLeader.id || (editingLeader as any)._id) : "";

      if (editingLeader && id) {
        await Service.leadershipUpdate(id, formData);
        alert("Leader details updated successfully!");
      } else {
        await Service.leadershipPost(formData);
        alert("New leader added successfully!");
      }

      setFormOpen(false);
      fetchLeaders();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while saving leader details.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (leader: leadershipInterface) => {
    const id = leader.id || (leader as any)._id;
    if (!id) return;

    if (!window.confirm(`Are you sure you want to remove ${leader.name} from the leadership team?`)) {
      return;
    }

    try {
      await Service.leadershipDelete(id);
      alert("Leader deleted successfully.");
      fetchLeaders();
    } catch (err) {
      console.error(err);
      alert("Failed to delete the leader.");
    }
  };

  const getImageUrl = (leader: any): string => {
    if (leader.profilePic) {
      let pic = leader.profilePic;
      
      // Handle stringified JSON arrays/objects
      if (typeof pic === "string" && pic.trim().startsWith("[")) {
        try {
          pic = JSON.parse(pic);
        } catch (e) {}
      } else if (typeof pic === "string" && pic.trim().startsWith("{")) {
        try {
          pic = JSON.parse(pic);
        } catch (e) {}
      }

      // If it is an array, take the first item
      if (Array.isArray(pic)) {
        if (pic.length > 0) {
          pic = pic[0];
        } else {
          return leader.image || DEFAULT_AVATAR;
        }
      }

      if (typeof pic === "string") return pic;
      if (typeof pic === "object" && pic !== null) {
        return pic.secureUrl || pic.secure_url || pic.url || leader.image || DEFAULT_AVATAR;
      }
    }
    return leader.image || DEFAULT_AVATAR;
  };

  return (
    <section className={`min-h-screen grid ${isSidebarOpen ? "grid-cols-[260px_1fr]" : "grid-cols-[0px_1fr]"} bg-gray-50 transition-all duration-300`}>
      <aside className={`overflow-auto bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? "w-[260px]" : "w-0 border-r-0 overflow-hidden"}`}>
          <Sidebar />
        </aside>

      <main className="flex flex-col">
        <Header {...header} />

        <div className="flex-grow p-8 overflow-auto bg-white">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Content Management - Leadership Team
            </h2>
            <button
              type="button"
              onClick={() => openForm()}
              className="inline-flex items-center justify-center px-5 py-2.5 border border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 font-bold uppercase rounded-sm transition-all shadow-sm"
            >
              + Add New Leader
            </button>
          </div>

          {loading && (
            <p className="text-center text-gray-600 py-10 font-medium">Loading leadership data...</p>
          )}
          {error && (
            <p className="font-semibold text-center text-red-600 py-10">{error}</p>
          )}

          {!loading && !error && (
            <div className="overflow-auto border border-gray-200 rounded-lg shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="text-black bg-[#6abd45]">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">
                      Photo
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider">
                      Bio
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-center uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-8 font-medium text-center text-gray-500"
                      >
                        No leadership members found. Add a member to display.
                      </td>
                    </tr>
                  ) : (
                    leaders.map((leader, index) => {
                      const stripTags = (html: string) => {
                        return html.replace(/<[^>]*>/g, "");
                      };
                      return (
                        <tr
                          key={leader.id || (leader as any)._id || index}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <img
                              src={getImageUrl(leader)}
                              alt={leader.name}
                              className="w-12 h-12 object-cover rounded-full shadow border-2 border-gray-200"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = DEFAULT_AVATAR;
                              }}
                            />
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-800">
                            {leader.name}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {leader.designation}
                          </td>
                          <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                            {stripTags(leader.bio || "")}
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => openForm(leader)}
                                className="px-2.5 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors font-semibold"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(leader)}
                                className="px-2.5 py-1 text-sm text-red-600 border border-red-650 rounded hover:bg-red-50 transition-colors font-semibold"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {formOpen && (
        <Dialog
          open={formOpen}
          onClose={() => !submitting && setFormOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className="w-full max-w-2xl mx-auto">
            <Dialog.Panel className="relative w-full bg-white rounded-xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-150 pb-4 mb-6">
                <Dialog.Title className="text-xl font-bold text-gray-900 uppercase tracking-wider">
                  {editingLeader ? "Edit Leader Details" : "Add New Team Leader"}
                </Dialog.Title>
                <button
                  type="button"
                  onClick={() => !submitting && setFormOpen(false)}
                  className="px-6 py-1.5 bg-red-50 text-black border-2 border-red-700/80 rounded-lg hover:bg-red-100 transition-all font-bold text-sm uppercase tracking-tight shadow-sm"
                  disabled={submitting}
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
                    placeholder="e.g. Vishal L Khandappanavar"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Designation *
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
                    placeholder="e.g. CEO or Managing Director"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    LinkedIn / Social Link
                  </label>
                  <input
                    type="url"
                    value={socialLinks}
                    onChange={(e) => setSocialLinks(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6abd45]/20 focus:border-[#6abd45] transition-all"
                    placeholder="e.g. https://www.linkedin.com/in/..."
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Profile Picture * {editingLeader && "(Upload new to replace)"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-250 file:text-xs file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 file:cursor-pointer transition-colors"
                    required={!editingLeader}
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Biography / Thoughts *
                  </label>
                  <Editor
                    value={bio}
                    onTextChange={(e) => setBio(e.htmlValue ?? "")}
                    style={{ height: "200px" }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{ backgroundColor: "#6abd45", color: "#ffffff" }}
                    className="w-full py-2.5 hover:!bg-[#5baf38] rounded-lg font-bold uppercase transition-all duration-150 shadow-md text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Saving..." : editingLeader ? "Update Details" : "Add Team Leader"}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </section>
  );
}

export default AdminLeadership;
