import { useEffect, useState } from "react";
import Service from "../../config/service";
import { ConnectProps } from "../../config/interface";
import { Header, HeaderProp, Sidebar, SubNavbar, useSidebar } from "./components";

export default function ConnectInfo() {
  const { isSidebarOpen } = useSidebar();
  const [connectForms, setConnectForms] = useState<ConnectProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Admin | Connect Form Submissions - Whiteboard";
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await Service.connectGetMethod();
        setConnectForms(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load connect form submissions.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleRow = (id: string) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  const header: HeaderProp = { head: "Connect Form Submissions" };

  return (
    <section className={`min-h-screen grid ${isSidebarOpen ? "grid-cols-[260px_1fr]" : "grid-cols-[0px_1fr]"} bg-gray-50 transition-all duration-300`}>
      <aside className={`overflow-auto bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? "w-[260px]" : "w-0 border-r-0 overflow-hidden"}`}>
          <Sidebar />
        </aside>

      <main className="flex flex-col min-w-0 h-screen overflow-hidden">
        <Header {...header} />
        <SubNavbar tabs={[
          { name: "Connect Page", to: "/admin/connect/edit" },
          { name: "Queries Received", to: "/admin/connect-info" }
        ]} />

        <div className="flex-grow p-8 overflow-auto bg-white">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <span className="text-lg text-gray-600 font-medium">Loading submissions...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-20">
              <span className="text-lg text-red-600 font-semibold">{error}</span>
            </div>
          )}

          {!loading && !error && (
            <>
              {connectForms.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <p className="text-lg font-medium">No submissions found.</p>
                  <p className="text-sm mt-1">When clients submit connect forms, they will show up here.</p>
                </div>
              ) : (
                <div className="overflow-auto h-[90vh] border border-gray-200 rounded-lg shadow-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="text-black bg-[#6abd45]">
                      <tr>
                        <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider w-1/4">
                          Name
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider w-1/4">
                          Email
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider w-1/6">
                          Phone
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-left uppercase tracking-wider w-1/6">
                          Received Date
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-center uppercase tracking-wider w-1/12">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {connectForms.map((form, index) => {
                        const rowId = (form as any).id || (form as any)._id || String(index);
                        const isExpanded = expandedRowId === rowId;
                        const dateStr = (form as any).createdAt
                          ? new Date((form as any).createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A";

                        return (
                          <>
                            <tr
                              key={rowId}
                              onClick={() => toggleRow(rowId)}
                              className="cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                            >
                              <td className="px-6 py-4 font-semibold text-gray-800">
                                {form.name}
                              </td>
                              <td className="px-6 py-4 text-gray-600">
                                {form.email}
                              </td>
                              <td className="px-6 py-4 text-gray-600">
                                {form.phone}
                              </td>
                              <td className="px-6 py-4 text-gray-500">
                                {dateStr}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <button className="text-gray-500 hover:text-green-600 transition-colors duration-200 focus:outline-none">
                                  <svg
                                    className={`w-5 h-5 transform transition-transform duration-200 ${
                                      isExpanded ? "rotate-180 text-green-600" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                            {isExpanded && (
                              <tr className="bg-gray-50/50">
                                <td colSpan={5} className="px-6 py-6 border-t border-b border-gray-200">
                                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full flex flex-col md:flex-row gap-6 items-start">
                                    {/* Left side: Initials Avatar */}
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#6abd45] text-white rounded-full flex items-center justify-center text-lg font-bold shadow-sm">
                                      {form.name ? form.name.charAt(0).toUpperCase() : "?"}
                                    </div>

                                    {/* Right side: Submission info and message */}
                                    <div className="flex-1 min-w-0 space-y-4">
                                      {/* Name & Contact Info Header */}
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                                        <div>
                                          <h4 className="text-lg font-bold text-gray-900">{form.name}</h4>
                                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
                                            <span className="flex items-center gap-1.5">
                                              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                              </svg>
                                              <a href={`mailto:${form.email}`} className="hover:text-[#6abd45] hover:underline font-medium">{form.email}</a>
                                            </span>
                                            <span className="text-gray-300">|</span>
                                            <span className="flex items-center gap-1.5">
                                              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                              </svg>
                                              <a href={`tel:${form.phone}`} className="hover:text-[#6abd45] hover:underline font-medium">{form.phone}</a>
                                            </span>
                                          </div>
                                        </div>
                                        <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded border border-gray-200 self-start sm:self-center font-medium">
                                          Submitted: {dateStr}
                                        </div>
                                      </div>

                                      {/* Message Content Body */}
                                      <div className="text-gray-750 text-sm leading-relaxed whitespace-pre-wrap bg-gray-50/50 p-5 rounded-lg border border-gray-150">
                                        {form.message || <span className="italic text-gray-400">No message provided.</span>}
                                      </div>

                                      {/* File Attachment Button */}
                                      {(form as any).file && (
                                        <div className="pt-2">
                                          <a
                                            href={typeof (form as any).file === "string" ? (form as any).file : "#"}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:text-black transition-colors shadow-sm"
                                          >
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            View Attachment
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </section>
  );
}
