import { useEffect, useState } from "react";
import Service from "../../config/service";
import { ConnectProps } from "../../config/interface";
import { Header, HeaderProp, Sidebar } from "./components";

export default function ConnectInfo() {
  const [connectForms, setConnectForms] = useState<ConnectProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    document.title = "Admin | Connect Form Submissions - Whiteboard";
  }, []);

  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await Service.connectGetMethod();
        setConnectForms(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load connect form submissions.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const header: HeaderProp = { head: "Connect Form Submissions" };

  return (
    <section className="w-full min-h-screen grid grid-cols-[20%_1fr] bg-gray-50">
      
      <div style={{ minHeight: "95.2vh" }} className="bg-gray-800">
        <Sidebar />
      </div>

    
      <main className="flex flex-col px-8 py-10 overflow-auto">
        <Header {...header} />

        {loading && (
          <div className="flex items-center justify-center py-20">
            <span className="text-lg text-gray-600">Loading data...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-20">
            <span className="text-lg text-red-600">{error}</span>
          </div>
        )}

        {!loading && !error && (
          <>
            {connectForms.length === 0 ? (
              <p className="text-gray-500">No submissions found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Email</th>
                      <th className="px-4 py-2 border">Phone</th>
                      <th className="px-4 py-2 border">Message</th>
                      {/* <th className="px-4 py-2 border">File</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {connectForms.map((form, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{form.name}</td>
                        <td className="px-4 py-2 border">{form.email}</td>
                        <td className="px-4 py-2 border">{form.phone}</td>
                        <td className="px-4 py-2 border">{form.message}</td>
                        {/* <td className="px-4 py-2 border">
                          {form.file ? (
                            <a
                              href={
                                typeof form.file === "string" ? form.file : "#"
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-500 underline"
                            >
                              View
                            </a>
                          ) : (
                            "No File"
                          )}
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </section>
  );
}
