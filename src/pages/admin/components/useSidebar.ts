import { useState, useEffect } from "react";

export function useSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return localStorage.getItem("sidebarOpen") !== "false";
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsSidebarOpen(localStorage.getItem("sidebarOpen") !== "false");
    };
    window.addEventListener("sidebar-toggle", handleStorageChange);
    return () => window.removeEventListener("sidebar-toggle", handleStorageChange);
  }, []);

  const toggle = () => {
    const newVal = !isSidebarOpen;
    localStorage.setItem("sidebarOpen", String(newVal));
    window.dispatchEvent(new Event("sidebar-toggle"));
  };

  return { isSidebarOpen, toggle };
}
