import { useEffect, useState } from "react";
import { Header, HeaderProp, Sidebar, SubNavbar } from "../components";
import { Dialog } from "@headlessui/react";
import Service from "../../../config/service";
import { leadershipInterface } from "../../../config/interface";

const ourFirmTabs = [
  { name: "Our Firm Details", to: "/admin/edit-our-firm" },
  { name: "Business Model", to: "/admin/edit-business-model" },
  { name: "Leadership Team", to: "/admin/leadership" },
];

const DEFAULT_AVATAR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48cmVjdCB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCcgZmlsbD0nI2UyZThmMCcvPjxjaXJjbGUgY3g9JzUwJyBjeT0nMzUnIHI9JzE4JyBmaWxsPScjY2JkNWUxJy8+PHBhdGggZD0nTTE1IDg1YzAtMTggMTUtMzAgMzUtMzBzMzUgMTIgMzUgMzAnIGZpbGw9JyNjYmQ1ZTEnLz48L3N2Zz4=";

function AdminLeadership() {
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
    <section className="min-h-screen grid grid-cols-[20%_1fr] bg-gray-50">
      <aside className="bg-gray-900 text-white min-h-screen">
        <Sidebar />
      </aside>

      <main className="flex flex-col">
        <Header {...header} />
        <SubNavbar tabs={ourFirmTabs} />

        <div className="flex-grow p-8 overflow-auto bg-white">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Content Management - Leadership Team
            </h2>
            <button
              type="button"
              onClick={() => openForm()}
              className="inline-flex items-center justify-center px-5 py-2.5 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
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
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <thead className="text-white bg-green-500">
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
                    leaders.map((leader, index) => (
                      <tr
                        key={leader.id || (leader as any)._id || index}
                        className="transition-colors hover:bg-gray-50"
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
                          {leader.bio}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => openForm(leader)}
                              className="px-3.5 py-1.5 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-200 text-sm shadow"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(leader)}
                              className="px-3.5 py-1.5 font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-200 text-sm shadow"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Form Modal */}
      {formOpen && (
        <Dialog
          open={formOpen}
          onClose={() => !submitting && setFormOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="w-full max-w-2xl p-4 mx-auto">
            <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto border border-gray-200">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <Dialog.Title className="text-xl font-bold text-gray-800">
                  {editingLeader ? "Edit Leader Details" : "Add New Team Leader"}
                </Dialog.Title>
                <button
                  type="button"
                  onClick={() => !submitting && setFormOpen(false)}
                  className="text-gray-400 hover:text-gray-700 text-xl font-semibold focus:outline-none"
                  disabled={submitting}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    placeholder="e.g. Vishal L Khandappanavar"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Designation *
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    placeholder="e.g. CEO or Managing Director"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    LinkedIn / Social Link
                  </label>
                  <input
                    type="url"
                    value={socialLinks}
                    onChange={(e) => setSocialLinks(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    placeholder="e.g. https://www.linkedin.com/in/..."
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Profile Picture * {editingLeader && "(Upload new to replace)"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    required={!editingLeader}
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Biography / Thoughts *
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    placeholder="Write details about the team member..."
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    disabled={submitting}
                    className="px-5 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 font-semibold transition-colors duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md font-semibold transition-colors duration-200 disabled:opacity-50 shadow"
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
