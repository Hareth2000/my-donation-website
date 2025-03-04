import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/userSlice"; 
import {
  FaHome,
  FaTachometerAlt,
  FaHandHoldingHeart,
  FaUsers,
  FaChartBar,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { icon: <FaTachometerAlt />, label: "لوحة التحكم", path: "/AdminDash" },
    { icon: <FaHandHoldingHeart />, label: "التبرعات", path: "/AdminDash/donations" },
    { icon: <FaUsers />, label: "المستفيدين", path: "/AdminDash/beneficiaries" },
    { icon: <FaChartBar />, label: "التقارير", path: "/AdminDash/reports" },
  ];

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
      dispatch(clearUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside
      className={`
        fixed sm:sticky top-0 left-0
        w-64 h-screen
        bg-[#E3007E] text-white shadow-xl z-40
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
      `}
      dir="rtl"
    >
      {/* Header / Logo */}
      <div className="p-4 sm:p-6 border-b border-[#E3007E] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg">
            <FaHome className="text-white text-xl" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">لوحة الإدارة</h1>
        </div>
        <button
          className="text-white hover:text-gray-200 text-2xl sm:hidden focus:outline-none"
          onClick={toggleSidebar}
          aria-label="إغلاق القائمة الجانبية"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 sm:px-3 py-4 sm:py-6 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="flex items-center px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-white transition-all duration-300 group hover:bg-[#FF5BA8] hover:text-white"
                onClick={toggleSidebar}
              >
                <span className="text-lg text-white group-hover:text-white ml-3">
                  {item.icon}
                </span>
                <span className="text-sm sm:text-base font-medium group-hover:text-white">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
          
          {/* Logout Button */}
          <li className="mt-3">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-white transition-all duration-300 group hover:bg-[#FF5BA8] hover:text-white hover:cursor-pointer"
            >
              <span className="text-lg text-white ml-3">
                <FaSignOutAlt />
              </span>
              <span className="text-sm sm:text-base font-medium">تسجيل الخروج</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
