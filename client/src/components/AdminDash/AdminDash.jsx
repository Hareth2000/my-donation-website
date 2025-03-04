import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Donations from "./Donations";
import Beneficiaries from "./Beneficiaries";
import Reports from "./Reports";

export default function AdminDash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
      <div className="flex bg-gray-50 min-h-screen relative">
        {/* Mobile Sidebar Toggle */}
        <button
          className="sm:hidden fixed bottom-4 right-4 z-50 p-3 bg-[#E3007E] text-white rounded-full shadow-lg"
          onClick={toggleSidebar}
        >
          <FaBars className="w-5 h-5" />
        </button>

        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header toggleSidebar={toggleSidebar} />

          {/* Content Area */}
          <main className="p-4 sm:p-6 overflow-y-auto space-y-6 sm:space-y-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="donations" element={<Donations />} />
              <Route path="beneficiaries" element={<Beneficiaries />} />
              <Route path="reports" element={<Reports />} />
            </Routes>
          </main>
        </div>
      </div>
  );
}