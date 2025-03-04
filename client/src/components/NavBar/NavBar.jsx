import { Link, Outlet, useLocation } from "react-router-dom";
import { useState ,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux"; // Import Redux hooks
import { clearUser } from "../../store/userSlice"; // Import clearUser action
import logo from "../images/logo.png";
import { UserCircle, ChevronDown, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State for profile dropdown
  const [username, setUsername]= useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user from Redux store
  const user = useSelector((state) => state.user);
  console.log(user);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
   
    useEffect(() => {
      if (user.id) {
        fetchUserData();
      }
    },[] );

  const fetchUserData = async () => {
    console.log(user.id)
    try {
      const response = await axios.get(`http://localhost:5000/api/users/profile/${user.id}`);
      
      console.log("User Data:", response.data.name);
  
     
        setUsername( response.data.name);
    
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err);
      }
    }
  };

  const handleLogout = async () => {
    try {
    await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });

    dispatch(clearUser()); // Clear user from Redux store
    setIsProfileOpen(false); // Close the dropdown
    navigate("/");
    } catch (error){
        console.error ('Error logging out' , error)
    }
  };

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `relative px-3 py-2 transition-colors duration-200 ${isActive
      ? "text-[#E3007E] font-semibold border-b-2 border-[#E3007E]"
      : "text-gray-700 hover:text-[#E3007E]"
      }`;
  };

  const navLinks = [
    { to: "/", label: "الرئيسية" },
    { to: "/Donations", label: "خيارات التبرع" },
    { to: "/BecomeBeneficiary", label: "سجل كمستفيد" },
    { to: "/About", label: "من نحن" },
    { to: "/Contact", label: "تواصل معنا" },
  ];

  return (
    <>
      <nav
        className="backdrop-blur-md bg-white/95 sticky top-0 z-50 border-b border-gray-100 shadow-sm"
        style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo Section */}
            <Link to="/" className="relative group flex items-center space-x-3">
              <img src={logo} className="h-20 w-40" alt="Logo" />
            </Link>

            {/* Profile Dropdown or Login Button */}
            <div className="ml-20 relative">
              {user.id ? (
                // Profile Dropdown 
                <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E3007E] focus:ring-opacity-50"
                >
                  <UserCircle className="w-5 h-5 text-[#E3007E]" />
                  <span className="text-sm font-medium text-gray-700">
                    {username}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                  {/* Dropdown Menu with Animation */}
                  {isProfileOpen && (
                    <div className="absolute right-0 left-10 mt-2 w-40 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
                      <div className="py-1">
                        <Link
                          to="/Profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        >
                          الملف الشخصي
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors duration-150"
                        >
                          تسجيل الخروج
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Login Button
                <Link
                  to="/login"
                  className="rounded-tl-[18px] rounded-tr-[0px] rounded-br-[18px] rounded-bl-[18px] bg-[#E3007E] text-white px-4 py-2 rounded-md hover:bg-[#C9006E] transition-colors duration-200"
                >
                  تسجيل الدخول
                </Link>
              )}
            </div>

            {/* Desktop Menu - Centered */}
            <div className="hidden md:flex md:items-center md:space-x-4 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={getLinkClass(link.to)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 py-2">
              <div className="flex flex-col space-y-2 px-4 pb-3 pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={getLinkClass(link.to)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;