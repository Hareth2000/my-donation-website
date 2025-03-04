// import { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from '@react-oauth/google';

// export default function Register() {
//     const navigate = useNavigate();
//     const [error, setError] = useState(""); // Track error messages
//     const [registerForm, setRegisterForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//         phone: "",
//         address: ""
//     });

//     const handleChange = (e) => {
//         setRegisterForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const body = {
//             name: registerForm.name,
//             email: registerForm.email,
//             password: registerForm.password,
//             phone: registerForm.phone,
//             address: registerForm.address
//         };

//         try {
//             const response = await axios.post("http://localhost:5000/auth/register", body, {
//                 withCredentials: true,
//             });

//             console.log(response);
//             navigate("/login"); // Navigate to login page after successful registration
//         } catch (error) {
//             // Handle registration errors
//             if (error.response && error.response.status === 409) {
//                 setError(error.response.data.message); // User already exists
//             } else {
//                 setError("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
//             }
//         }
//     }

//     const handleGoogleRegisterSuccess = async (response) => {
//         const { credential } = response;

//         try {
//             const res = await axios.post("http://localhost:5000/auth/google-register",
//                 { token: credential },
//                 { headers: { 'Content-Type': 'application/json' } }
//             );

//             const data = res.data;
//             console.log("Google Registration successful:", data);

//             // Redirect to the login page after successful Google registration
//             navigate("/login");

//         } catch (error) {
//             console.error("Error during Google registration:", error);
//             setError("حدث خطأ أثناء التسجيل عبر جوجل. يرجى المحاولة مرة أخرى.");
//         }
//     }

//     const handleGoogleRegisterFailure = (error) => {
//         console.error("Google Registration Failure:", error);
//         setError("فشل التسجيل عبر جوجل. حاول مرة أخرى أو استخدم طريقة أخرى.");
//     }

//     return (
//         <>
//             <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-100">
//                 <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//                     <div className="text-center">
//                         <h1 className="text-3xl font-extrabold text-gray-900">إنشاء حساب جديد</h1>
//                         <p className="mt-2 text-sm text-gray-600">سجل الآن للبدء في استخدام منصتنا</p>
//                     </div>

//                     {/* Error Message Display */}
//                     {error && (
//                         <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
//                             {error}
//                         </div>
//                     )}

//                     <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//                         <div className="space-y-4">
//                             <div>
//                                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                                     الاسم الكامل
//                                 </label>
//                                 <input
//                                     onChange={handleChange}
//                                     value={registerForm.name}
//                                     id="name"
//                                     name="name"
//                                     type="text"
//                                     autoComplete="name"
//                                     required
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                     placeholder="أدخل اسمك الكامل"
//                                 />
//                             </div>

//                             <div>
//                                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                                     البريد الإلكتروني
//                                 </label>
//                                 <input
//                                     onChange={handleChange}
//                                     value={registerForm.email}
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     autoComplete="email"
//                                     required
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                     placeholder="أدخل بريدك الإلكتروني"
//                                 />
//                             </div>

//                             <div>
//                                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                                     كلمة المرور
//                                 </label>
//                                 <input
//                                     onChange={handleChange}
//                                     value={registerForm.password}
//                                     id="password"
//                                     name="password"
//                                     type="password"
//                                     autoComplete="new-password"
//                                     required
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                     placeholder="أدخل كلمة المرور"
//                                 />
//                             </div>

//                             <div>
//                                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                                     رقم الهاتف
//                                 </label>
//                                 <input
//                                     onChange={handleChange}
//                                     value={registerForm.phone}
//                                     id="phone"
//                                     name="phone"
//                                     type="tel"
//                                     autoComplete="tel"
//                                     required
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                     placeholder="أدخل رقم هاتفك"
//                                 />
//                             </div>

//                             <div>
//                                 <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                                     العنوان
//                                 </label>
//                                 <textarea
//                                     onChange={handleChange}
//                                     value={registerForm.address}
//                                     id="address"
//                                     name="address"
//                                     rows="3"
//                                     autoComplete="street-address"
//                                     required
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
//                                     placeholder="أدخل عنوانك بالتفصيل"
//                                 ></textarea>
//                             </div>
//                         </div>

//                         <div>
//                             <button
//                                 type="submit"
//                                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 إنشاء حساب
//                             </button>
//                         </div>
//                     </form>

//                     <div className="text-center mt-4">
//                         <p className="text-sm text-gray-600">
//                             لديك حساب بالفعل؟{" "}
//                             <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//                                 تسجيل الدخول
//                             </Link>
//                         </p>
//                     </div>

//                     <div className="text-center mt-6">
//                         <p className="text-sm text-gray-600">
//                             أو يمكنك التسجيل باستخدام{" "}
//                             <span className="font-medium text-indigo-600 hover:text-indigo-500">جوجل</span>
//                         </p>
//                         <GoogleLogin
//                             onSuccess={handleGoogleRegisterSuccess}
//                             onError={handleGoogleRegisterFailure}
//                             useOneTap
//                             shape="rectangular"
//                             theme="filled_blue"
//                             size="large"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }


import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { motion } from "framer-motion";

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        setRegisterForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const body = {
            name: registerForm.name,
            email: registerForm.email,
            password: registerForm.password,
            phone: registerForm.phone,
            address: registerForm.address
        };

        try {
            const response = await axios.post("http://localhost:5000/auth/register", body, {
                withCredentials: true,
            });

            console.log(response);
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError(error.response.data.message);
            } else {
                setError("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleGoogleRegisterSuccess = async (response) => {
        setIsLoading(true);
        const { credential } = response;

        try {
            const res = await axios.post("http://localhost:5000/auth/google-register",
                { token: credential },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const data = res.data;
            console.log("Google Registration successful:", data);
            navigate("/login");

        } catch (error) {
            console.error("Error during Google registration:", error);
            setError("حدث خطأ أثناء التسجيل عبر جوجل. يرجى المحاولة مرة أخرى.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleGoogleRegisterFailure = (error) => {
        console.error("Google Registration Failure:", error);
        setError("فشل التسجيل عبر جوجل. حاول مرة أخرى أو استخدم طريقة أخرى.");
    }

    return (
        <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-200 p-5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl mx-4"
            >
                <div className="flex justify-center mb-4">
                    <div className="bg-[#662480] p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E3007E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </div>
                <div className="text-center">

                    <h1 className="mt-4 text-3xl font-extrabold text-gray-900">إنشاء حساب جديد</h1>
                    <p className="mt-2 text-sm text-gray-600">سجل الآن للبدء في استخدام منصتنا</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-sm flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{error}</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-5">
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            className="group relative"
                        >
                            <div className="flex items-center mb-1 gap-2">
                                <svg className="w-4 h-4 text-[#662480] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    الاسم الكامل
                                </label>
                            </div>
                            <input
                                onChange={handleChange}
                                value={registerForm.name}
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#662480] focus:border-[#662480] transition duration-200"
                                placeholder="أدخل اسمك الكامل"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                            className="group relative"
                        >
                            <div className="flex items-center mb-1 gap-2">
                                <svg className="w-4 h-4 text-[#662480] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    البريد الإلكتروني
                                </label>
                            </div>
                            <input
                                onChange={handleChange}
                                value={registerForm.email}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#662480] focus:border-[#662480] transition duration-200"
                                placeholder="أدخل بريدك الإلكتروني"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                            className="group relative"
                        >
                            <div className="flex items-center mb-1 gap-2">
                                <svg className="w-4 h-4 text-[#662480] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    كلمة المرور
                                </label>
                            </div>
                            <input
                                onChange={handleChange}
                                value={registerForm.password}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#662480] focus:border-[#662480] transition duration-200"
                                placeholder="أدخل كلمة المرور"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                            className="group relative"
                        >
                            <div className="flex items-center mb-1 gap-2">
                                <svg className="w-4 h-4 text-[#662480] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    رقم الهاتف
                                </label>
                            </div>
                            <input
                                onChange={handleChange}
                                value={registerForm.phone}
                                id="phone"
                                name="phone"
                                type="tel"
                                autoComplete="tel"
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#662480] focus:border-[#662480] transition duration-200"
                                placeholder="أدخل رقم هاتفك"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className="group relative"
                        >
                            <div className="flex items-center mb-1 gap-2">
                                <svg className="w-4 h-4 text-[#662480] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    العنوان
                                </label>
                            </div>
                            <textarea
                                onChange={handleChange}
                                value={registerForm.address}
                                id="address"
                                name="address"
                                rows="3"
                                autoComplete="street-address"
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#662480] focus:border-[#662480] transition duration-200 resize-none"
                                placeholder="أدخل عنوانك بالتفصيل"
                            ></textarea>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                    >
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-gradient-to-r from-[#662480] to-[#E3007E] hover:from-[#E3007E] hover:to-[#662480] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#662480] transform hover:scale-105 transition duration-200"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    إنشاء حساب
                                </>
                            )}
                        </button>
                    </motion.div>
                </form>

                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                    className="text-center mt-1"
                >
                    <p className="text-sm text-gray-600">
                        لديك حساب بالفعل؟{" "}
                        <Link to="/login" className="font-medium text-[#662480] hover:text-[#E3007E] transition duration-200">
                            تسجيل الدخول
                        </Link>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                    className="text-center mt-1"
                >
                    <p className="text-sm text-gray-600 mb-1">
                        التسجيل باستخدام
                    </p>
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleRegisterSuccess}
                            onError={handleGoogleRegisterFailure}
                            useOneTap
                            shape="pill"
                            size="large"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}