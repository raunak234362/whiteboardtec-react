import { useEffect, useState } from "react";
import Service from "../../config/service";
import { ConnectProps } from "../../config/interface";
import { Header, HeaderProp, Sidebar, SubNavbar } from "./components";

export default function ConnectInfo() {
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
    <section className="min-h-screen grid grid-cols-[240px_1fr] bg-gray-50">
      <aside className="h-screen overflow-y-auto text-white bg-gray-900 border-r border-gray-300">
        <Sidebar />
      </aside>

      <main className="flex flex-col min-w-0 h-screen overflow-hidden">
        <Header {...header} />
        <SubNavbar tabs={[
          { name: "Queries Received", to: "/admin/connect-info" },
          { name: "Connect Page", to: "/admin/connect/edit" }
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
                    <thead className="text-white bg-green-600">
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
                                <td colSpan={5} className="px-8 py-6 border-t border-b border-gray-200">
                                  <div className="space-y-4 max-w-4xl">
                                    <div>
                                      <h4 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-2">
                                        Message Content
                                      </h4>
                                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed bg-white p-5 rounded-lg border border-gray-200 shadow-inner">
                                        {form.message || <span className="italic text-gray-400">No message provided.</span>}
                                      </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-sm text-gray-600">
                                      <div>
                                        <span className="font-semibold text-gray-700">Email:</span>{" "}
                                        <a href={`mailto:${form.email}`} className="text-green-600 hover:underline">
                                          {form.email}
                                        </a>
                                      </div>
                                      <div>
                                        <span className="font-semibold text-gray-700">Phone:</span>{" "}
                                        <a href={`tel:${form.phone}`} className="text-green-600 hover:underline">
                                          {form.phone}
                                        </a>
                                      </div>
                                      <div>
                                        <span className="font-semibold text-gray-700">Submitted:</span>{" "}
                                        {dateStr}
                                      </div>
                                    </div>

                                    {(form as any).file && (
                                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <span className="text-sm font-semibold text-gray-700">Attachment:</span>
                                        <a
                                          href={typeof (form as any).file === "string" ? (form as any).file : "#"}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-semibold transition-colors duration-200 shadow-sm border border-green-200"
                                        >
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                          </svg>
                                          View Attachment
                                        </a>
                                      </div>
                                    )}
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
