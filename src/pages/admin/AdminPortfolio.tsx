import { useEffect } from "react";
import { auth } from "../../config/firebase";
import { Navigate } from "react-router-dom";
import { Header, HeaderProp, Sidebar } from "./components";


function AdminPortfolio() {
  useEffect(() => {
    document.title = "Admin | Dashboard - Whiteboard";
  });

  const header: HeaderProp = {
    head: "Portfolio",
  };

  if (auth.currentUser?.email) {
    return (
      <>
        <section className="w-full grid grid-cols-[20%_80%]">
          <div style={{ minHeight: "95.2vh" }}>
            <Sidebar />
          </div>
          <div className="flex flex-col flex-wrap">
            <Header {...header} />
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold">Welcome to Whiteboard</h1>
              <p className="text-lg">
                You are logged in as {auth.currentUser?.email}
              </p>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return <Navigate to="/admin/login" />;
  }
}

export default AdminPortfolio