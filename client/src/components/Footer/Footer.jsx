import React from 'react';
import logo from "../images/logo2.png";
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoLocationOutline, IoMailOutline, IoCallOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-[#282828] text-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h2 className="text-white text-2xl font-semibold flex items-center">
              <img src={logo} className="h-20" alt="شعار الموقع" />
            </h2>
            <p className="text-sm mt-3">
              منصة التبرع بالأدوات الطبية التي تجعل التبرع سهلاً وفعالاً لإنقاذ الأرواح.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold border-b-2 border-[#E3007E] pb-1 inline-block">
              روابط سريعة
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/" className="hover:text-white">
                  › الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  › من نحن
                </Link>
              </li>
              <li>
                <Link to="/donations" className="hover:text-white">
                  › التبرعات
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  › اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h3 className="text-white text-lg font-semibold border-b-2 border-[#E3007E] pb-1 inline-block">
              روابط أخرى
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/BecomeBeneficiary" className="hover:text-white">
                  › سجل كمستفيد
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-white">
                  › تبرع الآن
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold border-b-2 border-[#E3007E] pb-1 inline-block">
              تواصل معنا
            </h3>
            <ul className="mt-3 space-y-3">
              <li className="flex items-center space-x-2">
                <IoLocationOutline className="text-[#E3007E]" />
                <span>الأردن، الزرقاء</span>
              </li>
              <li className="flex items-center space-x-2">
                <IoMailOutline className="text-[#E3007E]" />
                <span>info@medicaldonation.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <IoCallOutline className="text-[#E3007E]" />
                <span>+962-788844145</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-700 text-center text-sm mt-6 pt-4">
          © 2025 جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}