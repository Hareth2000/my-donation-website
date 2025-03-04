

// // // import React, { useEffect, useState } from "react";
// // // import { useSelector } from "react-redux";
// // // import axios from "axios";

// // // const UserProfile = () => {
// // //   const userId = useSelector((state) => state.user.id);
// // //   const [userData, setUserData] = useState({
// // //     name: "",
// // //     email: "",
// // //     user_type: "",
// // //   });
// // //   const [originalData, setOriginalData] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [isEditing, setIsEditing] = useState(false);

// // //   useEffect(() => {
// // //     if (userId) {
// // //       fetchUserData();
// // //     }
// // //   }, [userId]);

// // //   const fetchUserData = async () => {
// // //     const controller = new AbortController();
// // //     const signal = controller.signal;
  
// // //     try {
// // //       const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`, { signal });
  
// // //       console.log("User Data:", response.data);
  
// // //       if (response.data.user) {
// // //         setUserData({
// // //           name: response.data.user.name,
// // //           email: response.data.user.email,
// // //           user_type: response.data.user.user_type,
// // //           donations: response.data.donations || [],
// // //           transactions: response.data.transactions || [],
// // //           requests: response.data.requests || [],
// // //         });
// // //       }
// // //     } catch (err) {
// // //       if (err.name !== "AbortError") {
// // //         setError("فشل في تحميل بيانات المستخدم");
// // //         console.error(err);
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
  
// // //     return () => controller.abort();
// // //   };
  
// // //   const handleChange = (e) => {
// // //     setUserData({ ...userData, [e.target.name]: e.target.value });
// // //   };

// // //   const handleUpdate = async () => {
// // //     if (!isEditing) return;
// // //     try {
// // //       const response = await axios.put(`http://localhost:5000/api/users/profile/${userId}`, userData);
// // //       setUserData(response.data);
// // //       setIsEditing(false);
// // //       alert("تم تحديث الملف الشخصي بنجاح!");
// // //     } catch (err) {
// // //       setError("فشل في تحديث بيانات المستخدم");
// // //       console.error(err);
// // //     }
// // //   };

// // //   const handleEditClick = () => {
// // //     setOriginalData(userData);
// // //     setIsEditing(true);
// // //   };

// // //   if (loading) return (
// // //     <div className="flex justify-center items-center h-64">
// // //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
// // //     </div>
// // //   );
  
// // //   if (error) return (
// // //     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-right" role="alert">
// // //       <strong className="font-bold">خطأ! </strong>
// // //       <span className="block sm:inline">{error}</span>
// // //     </div>
// // //   );

// // //   const getUserTypeArabic = (type) => {
// // //     switch(type) {
// // //       case "donor": return "متبرع";
// // //       case "beneficiary": return "مستفيد";
// // //       default: return type;
// // //     }
// // //   };

// // //   return (
// // //     <div dir="rtl" className="max-w-4xl mx-auto px-4 py-8 font-sans">
// // //       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
// // //         <div className="bg-gradient-to-l from-purple-700 to-pink-600 text-white p-6">
// // //           <h2 className="text-2xl font-bold text-center">الملف الشخصي</h2>
// // //         </div>
        
// // //         {userData && (
// // //           <div className="p-6">
// // //             <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
// // //               <div className="flex items-center justify-center md:ml-4">
// // //                 <div className="w-24 h-24 rounded-full bg-gradient-to-l from-purple-600 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
// // //                   {userData.name ? userData.name.charAt(0).toUpperCase() : "م"}
// // //                 </div>
// // //               </div>
              
// // //               <div className="flex-1 text-center md:text-right">
// // //                 <h3 className="text-xl font-bold text-gray-800">{userData.name || "المستخدم"}</h3>
// // //                 <p className="text-gray-600">{userData.email || ""}</p>
// // //                 <span className="inline-block px-3 py-1 mt-2 bg-gradient-to-l from-purple-600 to-pink-500 text-white text-sm rounded-full">
// // //                   {getUserTypeArabic(userData.user_type)}
// // //                 </span>
// // //               </div>
// // //             </div>
            
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// // //               <div className="col-span-1">
// // //                 <label className="block text-gray-700 font-bold mb-2">الاسم:</label>
// // //                 <input 
// // //                   type="text" 
// // //                   name="name" 
// // //                   value={userData.name || ""} 
// // //                   onChange={handleChange} 
// // //                   disabled={!isEditing}
// // //                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none text-right ${isEditing ? "focus:ring-2 focus:ring-pink-500 border-gray-300" : "bg-gray-100 border-gray-200"}`}
// // //                 />
// // //               </div>
              
// // //               <div className="col-span-1">
// // //                 <label className="block text-gray-700 font-bold mb-2">البريد الإلكتروني:</label>
// // //                 <input 
// // //                   type="email" 
// // //                   name="email" 
// // //                   value={userData.email || ""} 
// // //                   onChange={handleChange} 
// // //                   disabled={!isEditing}
// // //                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none text-right ${isEditing ? "focus:ring-2 focus:ring-pink-500 border-gray-300" : "bg-gray-100 border-gray-200"}`} 
// // //                 />
// // //               </div>
              
// // //               <div className="col-span-1">
// // //                 <label className="block text-gray-700 font-bold mb-2">نوع المستخدم:</label>
// // //                 <input 
// // //                   type="text" 
// // //                   name="user_type" 
// // //                   value={getUserTypeArabic(userData.user_type) || ""} 
// // //                   disabled
// // //                   className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-right" 
// // //                 />
// // //               </div>
// // //             </div>
            
// // //             <div className="flex justify-center space-x-4 space-x-reverse mb-8">
// // //               {isEditing ? (
// // //                 <>
// // //                   <button 
// // //                     onClick={() => { setUserData(originalData); setIsEditing(false); }}
// // //                     className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition duration-200 ml-4"
// // //                   >
// // //                     إلغاء
// // //                   </button>
// // //                   <button 
// // //                     onClick={handleUpdate}
// // //                     className="px-6 py-2 bg-gradient-to-l from-purple-700 to-pink-600 text-white font-medium rounded-lg hover:opacity-90 transition duration-200"
// // //                   >
// // //                     حفظ التغييرات
// // //                   </button>
// // //                 </>
// // //               ) : (
// // //                 <button 
// // //                   onClick={handleEditClick}
// // //                   className="px-6 py-2 bg-gradient-to-l from-purple-700 to-pink-600 text-white font-medium rounded-lg hover:opacity-90 transition duration-200"
// // //                 >
// // //                   تعديل الملف الشخصي
// // //                 </button>
// // //               )}
// // //             </div>
            
// // //             {/* عرض تفاصيل المتبرع */}
// // //             {userData.user_type === "donor" && (
// // //               <div className="border-t border-gray-200 pt-6">
// // //                 <div className="mb-6">
// // //                   <h3 className="text-xl font-bold mb-4 text-purple-800">التبرعات</h3>
// // //                   {userData.donations && userData.donations.length > 0 ? (
// // //                     <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
// // //                       <div className="overflow-x-auto">
// // //                         <table className="min-w-full divide-y divide-gray-200">
// // //                           <thead className="bg-gray-50">
// // //                             <tr>
// // //                               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم التبرع</th>
// // //                               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
// // //                             </tr>
// // //                           </thead>
// // //                           <tbody className="bg-white divide-y divide-gray-200">
// // //                             {userData.donations.map((donation) => (
// // //                               <tr key={donation.donation_id} className="hover:bg-gray-50">
// // //                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.donation_id}</td>
// // //                                 <td className="px-6 py-4 whitespace-nowrap">
// // //                                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
// // //                                     ${donation.status === "completed" ? "bg-green-100 text-green-800" : 
// // //                                       donation.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
// // //                                       "bg-gray-100 text-gray-800"}`}>
// // //                                     {donation.status === "completed" ? "مكتمل" : 
// // //                                      donation.status === "pending" ? "قيد الانتظار" : 
// // //                                      donation.status}
// // //                                   </span>
// // //                                 </td>
// // //                               </tr>
// // //                             ))}
// // //                           </tbody>
// // //                         </table>
// // //                       </div>
// // //                     </div>
// // //                   ) : (
// // //                     <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">لا توجد تبرعات حتى الآن.</p>
// // //                   )}
// // //                 </div>

// // //                 <div className="mb-6">
// // //                   <h3 className="text-xl font-bold mb-4 text-purple-800">المعاملات المالية</h3>
// // //                   {userData.transactions && userData.transactions.length > 0 ? (
// // //                     <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
// // //                       <div className="overflow-x-auto">
// // //                         <table className="min-w-full divide-y divide-gray-200">
// // //                           <thead className="bg-gray-50">
// // //                             <tr>
// // //                               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم المعاملة</th>
// // //                               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
// // //                               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
// // //                             </tr>
// // //                           </thead>
// // //                           <tbody className="bg-white divide-y divide-gray-200">
// // //                             {userData.transactions.map((transaction) => (
// // //                               <tr key={transaction.transaction_id} className="hover:bg-gray-50">
// // //                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.transaction_id}</td>
// // //                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.amount}</td>
// // //                                 <td className="px-6 py-4 whitespace-nowrap">
// // //                                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
// // //                                     ${transaction.status === "completed" ? "bg-green-100 text-green-800" : 
// // //                                       transaction.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
// // //                                       "bg-gray-100 text-gray-800"}`}>
// // //                                     {transaction.status === "completed" ? "مكتمل" : 
// // //                                      transaction.status === "pending" ? "قيد الانتظار" : 
// // //                                      transaction.status}
// // //                                   </span>
// // //                                 </td>
// // //                               </tr>
// // //                             ))}
// // //                           </tbody>
// // //                         </table>
// // //                       </div>
// // //                     </div>
// // //                   ) : (
// // //                     <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">لا توجد معاملات مالية حتى الآن.</p>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             )}
            
// // //             {/* عرض تفاصيل المستفيد */}
// // //             {userData.user_type === "beneficiary" && (
// // //               <div className="border-t border-gray-200 pt-6">
// // //                 <h3 className="text-xl font-bold mb-4 text-purple-800">الطلبات</h3>
// // //                 {userData.requests && userData.requests.length > 0 ? (
// // //                   <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
// // //                     <div className="overflow-x-auto">
// // //                       <table className="min-w-full divide-y divide-gray-200">
// // //                         <thead className="bg-gray-50">
// // //                           <tr>
// // //                             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم الطلب</th>
// // //                             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العنصر</th>
// // //                             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
// // //                           </tr>
// // //                         </thead>
// // //                         <tbody className="bg-white divide-y divide-gray-200">
// // //                           {userData.requests.map((request) => (
// // //                             <tr key={request.request_id} className="hover:bg-gray-50">
// // //                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.request_id}</td>
// // //                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.item_name}</td>
// // //                               <td className="px-6 py-4 whitespace-nowrap">
// // //                                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
// // //                                   ${request.status === "approved" ? "bg-green-100 text-green-800" : 
// // //                                     request.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
// // //                                     request.status === "rejected" ? "bg-red-100 text-red-800" :
// // //                                     "bg-gray-100 text-gray-800"}`}>
// // //                                   {request.status === "approved" ? "موافق عليه" : 
// // //                                    request.status === "pending" ? "قيد الانتظار" : 
// // //                                    request.status === "rejected" ? "مرفوض" :
// // //                                    request.status}
// // //                                 </span>
// // //                               </td>
// // //                             </tr>
// // //                           ))}
// // //                         </tbody>
// // //                       </table>
// // //                     </div>
// // //                   </div>
// // //                 ) : (
// // //                   <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">لا توجد طلبات حتى الآن.</p>
// // //                 )}
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // export default UserProfile;
// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { useSelector } from "react-redux";

// // // const UserProfile = () => {
// // //   const userId = useSelector((state) => state.user.id); // استرجاع userId من الريدوكس
// // //   const [userData, setUserData] = useState({
// // //     name: "",
// // //     email: "",
// // //     phone: "",
// // //     address: "",
// // //   });
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [error, setError] = useState(null);

// // //   // جلب بيانات المستخدم عند تحميل الصفحة
// // //   useEffect(() => {
// // //     const fetchUserData = async () => {
// // //       try {
// // //         const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
// // //         setUserData(response.data);
// // //       } catch (err) {
// // //         setError("فشل في تحميل بيانات المستخدم");
// // //         console.error(err);
// // //       }
// // //     };
    
// // //     if (userId) {
// // //       fetchUserData();
// // //     }
// // //   }, [userId]);

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setUserData((prevData) => ({
// // //       ...prevData,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   const handleSave = async () => {
// // //     try {
// // //       const response = await axios.put(`http://localhost:5000/api/users/profile/${userId}`, userData);
// // //       setUserData(response.data.user);
// // //       setIsEditing(false);
// // //       alert("تم تحديث البيانات بنجاح");
// // //     } catch (err) {
// // //       setError("فشل في تحديث البيانات");
// // //       console.error(err);
// // //     }
// // //   };

// // //   const handleEditClick = () => {
// // //     setIsEditing(true);
// // //   };

// // //   if (error) {
// // //     return <div>{error}</div>;
// // //   }

// // //   return (
// // //     <div className="container">
// // //       <h2>الملف الشخصي</h2>
// // //       <div>
// // //         <label>الاسم:</label>
// // //         <input
// // //           type="text"
// // //           name="name"
// // //           value={userData.name}
// // //           onChange={handleChange}
// // //           disabled={!isEditing}
// // //         />
// // //       </div>
// // //       <div>
// // //         <label>البريد الإلكتروني:</label>
// // //         <input
// // //           type="email"
// // //           name="email"
// // //           value={userData.email}
// // //           onChange={handleChange}
// // //           disabled={!isEditing}
// // //         />
// // //       </div>
// // //       <div>
// // //         <label>رقم الهاتف:</label>
// // //         <input
// // //           type="text"
// // //           name="phone"
// // //           value={userData.phone}
// // //           onChange={handleChange}
// // //           disabled={!isEditing}
// // //         />
// // //       </div>
// // //       <div>
// // //         <label>العنوان:</label>
// // //         <input
// // //           type="text"
// // //           name="address"
// // //           value={userData.address}
// // //           onChange={handleChange}
// // //           disabled={!isEditing}
// // //         />
// // //       </div>

// // //       <div>
// // //         {isEditing ? (
// // //           <>
// // //             <button onClick={handleSave}>حفظ التغييرات</button>
// // //             <button onClick={() => setIsEditing(false)}>إلغاء التعديل</button>
// // //           </>
// // //         ) : (
// // //           <button onClick={handleEditClick}>تعديل</button>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default UserProfile;


// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useSelector } from "react-redux";

// // const UserProfile = () => {
// //   const userId = useSelector((state) => state.user.id); // استرجاع userId من الريدوكس
// //   const [userData, setUserData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     address: "",
// //   });
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [error, setError] = useState(null);

// //   // جلب بيانات المستخدم عند تحميل الصفحة
// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
// //         setUserData(response.data);
// //       } catch (err) {
// //         setError("فشل في تحميل بيانات المستخدم");
// //         console.error(err);
// //       }
// //     };

// //     if (userId) {
// //       fetchUserData();
// //     }
// //   }, [userId]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setUserData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSave = async () => {
// //     try {
// //       const response = await axios.put(`http://localhost:5000/api/users/profile/${userId}`, userData);
// //       setUserData(response.data.user);
// //       setIsEditing(false);
// //       alert("تم تحديث البيانات بنجاح");
// //     } catch (err) {
// //       setError("فشل في تحديث البيانات");
// //       console.error(err);
// //     }
// //   };

// //   const handleEditClick = () => {
// //     setIsEditing(true);
// //   };

// //   if (error) {
// //     return <div className="text-red-600 text-center p-4 bg-red-50 rounded-md border border-red-200 shadow-sm">{error}</div>;
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
// //       <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        
// //         {/* Header */}
// //         <div className="bg-gradient-to-r from-[#662480] to-[#E3007E] py-6 px-8">
// //           <h2 className="text-2xl font-bold text-white text-center">الملف الشخصي</h2>
// //         </div>
        
// //         {/* Profile Form */}
// //         <div className="p-8">
// //           {/* Name Field */}
// //           <div className="mb-6">
// //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
// //               الاسم:
// //             </label>
// //             <input
// //               id="name"
// //               type="text"
// //               name="name"
// //               value={userData.name}
// //               onChange={handleChange}
// //               disabled={!isEditing}
// //               className={`w-full px-4 py-3 rounded-lg border ${
// //                 isEditing ? "border-[#662480] focus:outline-none focus:ring-2 focus:ring-[#E3007E]" : "bg-gray-50 border-gray-200"
// //               } transition-all duration-200`}
// //             />
// //           </div>
          
// //           {/* Email Field */}
// //           <div className="mb-6">
// //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
// //               البريد الإلكتروني:
// //             </label>
// //             <input
// //               id="email"
// //               type="email"
// //               name="email"
// //               value={userData.email}
// //               onChange={handleChange}
// //               disabled={!isEditing}
// //               className={`w-full px-4 py-3 rounded-lg border ${
// //                 isEditing ? "border-[#662480] focus:outline-none focus:ring-2 focus:ring-[#E3007E]" : "bg-gray-50 border-gray-200"
// //               } transition-all duration-200`}
// //             />
// //           </div>
          
// //           {/* Phone Field */}
// //           <div className="mb-6">
// //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
// //               رقم الهاتف:
// //             </label>
// //             <input
// //               id="phone"
// //               type="text"
// //               name="phone"
// //               value={userData.phone}
// //               onChange={handleChange}
// //               disabled={!isEditing}
// //               className={`w-full px-4 py-3 rounded-lg border ${
// //                 isEditing ? "border-[#662480] focus:outline-none focus:ring-2 focus:ring-[#E3007E]" : "bg-gray-50 border-gray-200"
// //               } transition-all duration-200`}
// //             />
// //           </div>
          
// //           {/* Address Field */}
// //           <div className="mb-8">
// //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
// //               العنوان:
// //             </label>
// //             <input
// //               id="address"
// //               type="text"
// //               name="address"
// //               value={userData.address}
// //               onChange={handleChange}
// //               disabled={!isEditing}
// //               className={`w-full px-4 py-3 rounded-lg border ${
// //                 isEditing ? "border-[#662480] focus:outline-none focus:ring-2 focus:ring-[#E3007E]" : "bg-gray-50 border-gray-200"
// //               } transition-all duration-200`}
// //             />
// //           </div>
          
// //           {/* Buttons */}
// //           <div className="flex justify-center space-x-4 space-x-reverse">
// //             {isEditing ? (
// //               <>
// //                 <button 
// //                   onClick={handleSave}
// //                   className="bg-[#E3007E] hover:bg-[#c00068] text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
// //                 >
// //                   حفظ التغييرات
// //                 </button>
// //                 <button 
// //                   onClick={() => setIsEditing(false)}
// //                   className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300"
// //                 >
// //                   إلغاء التعديل
// //                 </button>
// //               </>
// //             ) : (
// //               <button 
// //                 onClick={handleEditClick}
// //                 className="bg-[#662480] hover:bg-[#501c64] text-white font-bold py-2 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
// //               >
// //                 تعديل
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserProfile;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const UserProfile = () => {
//   const userId = useSelector((state) => state.user.id);
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     roleType: "",
//   });
//   const [donations, setDonations] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
//         setUserData(response.data);

//         // إذا كان المستخدم متبرعًا، اجلب تبرعاته
//         if (response.data.roleType === "donor") {
//           const donationsResponse = await axios.get(`http://localhost:5000/api/users/donations/${userId}`);
//           setDonations(donationsResponse.data.donations);
//         }
//       } catch (err) {
//         setError("فشل في تحميل بيانات المستخدم");
//         console.error(err);
//       }
//     };

//     if (userId) {
//       fetchUserData();
//     }
//   }, [userId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/users/profile/${userId}`, userData);
//       setUserData(response.data.user);
//       setIsEditing(false);
//       alert("تم تحديث البيانات بنجاح");
//     } catch (err) {
//       setError("فشل في تحديث البيانات");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
//       <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="bg-gradient-to-r from-[#662480] to-[#E3007E] py-6 px-8">
//           <h2 className="text-2xl font-bold text-white text-center">الملف الشخصي</h2>
//         </div>
//         <div className="p-8">
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">الاسم:</label>
//             <input type="text" name="name" value={userData.name} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 rounded-lg border bg-gray-50" />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">البريد الإلكتروني:</label>
//             <input type="email" name="email" value={userData.email} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 rounded-lg border bg-gray-50" />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">رقم الهاتف:</label>
//             <input type="text" name="phone" value={userData.phone} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 rounded-lg border bg-gray-50" />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">العنوان:</label>
//             <input type="text" name="address" value={userData.address} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 rounded-lg border bg-gray-50" />
//           </div>
//           {userData.roleType === "donor" && (
//             <div className="mb-6">
//               <h3 className="text-xl font-bold mb-2">التبرعات السابقة:</h3>
//               <ul className="list-disc pl-6">
//                 {donations.map((donation) => (
//                   <li key={donation.id}>{donation.amount} دولار - {donation.paymentMethod}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//           <div className="flex justify-center space-x-4">
//             {isEditing ? (
//               <>
//                 <button onClick={handleSave} className="bg-[#E3007E] text-white font-bold py-2 px-6 rounded-full">حفظ التغييرات</button>
//                 <button onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full">إلغاء</button>
//               </>
//             ) : (
//               <button onClick={() => setIsEditing(true)} className="bg-[#662480] text-white font-bold py-2 px-8 rounded-full">تعديل</button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Footer from '../Footer/Footer';

const UserProfile = () => {
  const userId = useSelector((state) => state.user.id);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    roleType: "",
  });
  const [donations, setDonations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
        console.log("بيانات المستخدم:", response.data); // تحقق من البيانات
        setUserData(response.data);
  
        // إذا كان المستخدم متبرعًا، اجلب تبرعاته
        if (response.data.roleType === "donor") {
          const donationsResponse = await axios.get(`http://localhost:5000/api/users/donations/${userId}`);
          console.log("تبرعات المستخدم:", donationsResponse.data.donations); // تحقق من التبرعات
          setDonations(donationsResponse.data.donations);
        }
      } catch (err) {
        setError("فشل في تحميل بيانات المستخدم");
        console.error("خطأ في جلب البيانات:", err);
      }
    };
  
    if (userId) {
      fetchUserData();
    }
  }, [userId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/profile/${userId}`, userData);
      setUserData(response.data.user);
      setIsEditing(false);
      alert("تم تحديث البيانات بنجاح");
    } catch (err) {
      setError("فشل في تحديث البيانات");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#662480] to-[#E3007E] py-6 px-8">
          <h2 className="text-2xl font-bold text-white text-center">الملف الشخصي</h2>
        </div>
        <div className="p-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">الاسم:</label>
            <input type="text" name="name" value={userData.name} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 rounded-lg border bg-gray-50" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">البريد الإلكتروني:</label>
            <input type="email" name="email" value={userData.email} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 rounded-lg border bg-gray-50" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">رقم الهاتف:</label>
            <input type="text" name="phone" value={userData.phone} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 rounded-lg border bg-gray-50" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">العنوان:</label>
            <input type="text" name="address" value={userData.address} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 rounded-lg border bg-gray-50" />
          </div>
          {userData.roleType === "donor" && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">التبرعات السابقة:</h3>
              <ul className="list-disc pl-6">
                {donations.map((donation) => (
                  <li key={donation.id}>{donation.amount} دولار - {donation.paymentMethod}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex justify-center space-x-4">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="bg-[#E3007E] text-white font-bold py-2 px-6 rounded-full">حفظ التغييرات</button>
                <button onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full">إلغاء</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-[#662480] text-white font-bold py-2 px-8 rounded-full">تعديل</button>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default UserProfile;
