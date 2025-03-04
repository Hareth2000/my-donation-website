import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

export default function DonationDetails() {
    const id = useParams().id;  // Get id from URL
    console.log(id);
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // 👈 Use useNavigate here
    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/details/${id}`);
                setRequest(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching request:", err);
                setError("Error fetching campaign details.");
                setLoading(false);
            }
        };

        fetchRequest();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleDetailsClick = (donationId) => {
        navigate(`/Payment/${donationId}`);
    };

    return (
        <>
            <div className="bg-white min-h-screen" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
                <header className="bg-[#662480] text-white py-6 text-center">
                    <h1 className="text-3xl font-bold">تفاصيل الحملة</h1>
                </header>

                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <img
                            src={request.medicalEquipment 
                                ? `http://localhost:5000/${request.medicalEquipment.replace("\\", "/")}`
                                : "https://via.placeholder.com/150"} 
                            alt="Campaign Image"
                            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="px-20">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-[#E3007E] mb-4">
                                    عنوان الحملة: {request.toolName}
                                </h2>
                                <p className="text-gray-700">
                                    {request.description}
                                </p>
                            </div>

                            <div className="mb-8">
          <button  onClick={() => handleDetailsClick(request.id)} className="bg-[#E3007E] rounded-tl-[18px]  rounded-br-[18px] text-white px-6 py-3 rounded-lg hover:bg-[#C9006E] transition-colors duration-200 flex items-center justify-center space-x-2">
            <FaHeart className="text-white" /> {/* Heart Icon */}
            <span>تبرع الآن</span>
          </button>
        </div>
                        </div>

                        <div className="mb-8 bg-gray-100 p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-[#662480] mb-4">تقدم الحملة</h3>
                            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                                <div
                                    className="bg-[#E3007E] h-4 rounded-full"
                                    style={{ width: `${(request.amount_raised / request.estimatedCost) * 100}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <p>المبلغ المطلوب: {request.estimatedCost} دينار اردني</p>
                                <p>المبلغ المجموع: {request.amount_raised} دينار اردني</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#662480] mb-4">معلومات المستفيد</h3>
                            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                                <p className="text-gray-700"><strong>اسم المستفيد:</strong> {request.organizationName}</p>
                                <p className="text-gray-700 mt-2"><strong>العنوان:</strong> {request.organizationAddress}</p>
                                <p className="text-gray-700 mt-2"><strong>رقم الهاتف:</strong> {request.phone}</p>
                                <p className="text-gray-700 mt-2"><strong>البريد الإلكتروني:</strong> {request.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
