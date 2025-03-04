import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BecomeBeneficiary() {
    const user_id = useSelector((state) => state.user.id);

    // استرجاع بيانات المستخدم الأساسية من `localStorage` أو Redux
    const savedData = JSON.parse(localStorage.getItem(`userData-${user_id}`)) || {};

    const [formData, setFormData] = useState({
        organizationName: savedData.organizationName || "",
        organizationAddress: savedData.organizationAddress || "",
        phone: savedData.phone || "",
        email: savedData.email || "",
        toolName: "",
        medicalEquipment: null, 
        quantity: "",
        estimatedCost: "",
        proofDocument: null, 
        agreement: false,
        description: "",
        hasFundraisingLicense: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // عند تغيير القيم في النموذج
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
        }));
    };

    // عند تقديم النموذج
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!user_id) {
            toast.error("يجب تسجيل الدخول لإرسال الطلب.");
            setIsSubmitting(false);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("user_id", user_id);
        formDataToSend.append("quantity", Number(formData.quantity));
        formDataToSend.append("estimatedCost", parseFloat(formData.estimatedCost));

        Object.keys(formData).forEach((key) => {
            if (key !== "medicalEquipment" && key !== "proofDocument") {
                formDataToSend.append(key, formData[key]);
            }
        });

        if (formData.medicalEquipment) {
            formDataToSend.append("medicalEquipment", formData.medicalEquipment);
        }
        if (formData.proofDocument) {
            formDataToSend.append("proofDocument", formData.proofDocument);
        }

        formDataToSend.append("status", "pending");
        formDataToSend.append("amount_raised", 0);

        try {
            await axios.post('http://localhost:5000/api/requests/submit', formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("تم إرسال طلبك بنجاح! سيتم مراجعته من قبل الإدارة.");

            // ✅ تخزين بيانات المستخدم الأساسية مرة واحدة فقط بعد الإرسال الأول
            if (!localStorage.getItem(`userData-${user_id}`)) {
                localStorage.setItem(`userData-${user_id}`, JSON.stringify({
                    organizationName: formData.organizationName,
                    organizationAddress: formData.organizationAddress,
                    phone: formData.phone,
                    email: formData.email
                }));
            }

            // إعادة تعيين الحقول القابلة للتغيير فقط، مع الاحتفاظ ببيانات المستخدم
            setFormData((prevData) => ({
                ...prevData,
                toolName: "",
                medicalEquipment: null,
                quantity: "",
                estimatedCost: "",
                proofDocument: null,
                agreement: false,
                hasFundraisingLicense: "",
                description: ""
            }));
        } catch (error) {
            console.error("Error submitting form:", error.response ? error.response.data : error.message);
            toast.error("حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="flex flex-col items-start justify-center " style={{  fontFamily: "'IBM Plex Sans Arabic', sans-serif"}}>
        {/* Toast Container */}
        <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        
        {/* Container 50 */}
        <div className="w-full max-w-3xl p-6 pr-16 " style={{ marginRight: '200px',  marginBottom: '30px' }}>
          <div>
            <h1 className="text-2xl font-bold text-right " style={{  color:'#662480' }}>
              انضم إلى <span style={{  color:'#E3007E'}}>أُفُق الخير</span>  
            </h1>
            <div className="text-m text-right text-gray-600 mt-2">
            أُفُق الخير هي همزة الوصل والشريك التسويقي لأكثر من ١٢٠ منظمة و مؤسسة خيرية في الاردن.
            </div>
          </div>
        </div>
        
        {/* Join Form */}
        <div className="w-[1000px] mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200 ">
            <div style={{   marginBottom: '70px' }}>
                    <h2 className="text-2xl font-bold mb-6 text-center" style={{  color:'#662480' }}> طلب شراكة مع أُفُق  </h2>
                    <p className="text-center text-gray-600 mb-4">يرجى ملئ البيانات التالية وسنقوم بالتواصل معك في حالة الموافقة على طلبك</p>

                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
        
                        {/* معلومات المنظمة */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-semibold flex " style={{  color:'#662480' }}>اسم المنظمة:</label>
                                <input type="text" name="organizationName" value={formData.organizationName} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-md bg-white focus:ring-2 focus:ring-purple-500" required readOnly={!!savedData.organizationName}/>
                            </div>
                            <div>
                                <label className="block mb-1 font-semibold flex " style={{  color:'#662480' }}>عنوان المنظمة:</label>
                                <input type="text" name="organizationAddress" value={formData.organizationAddress} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-md bg-white focus:ring-2 focus:ring-purple-500" required readOnly={!!savedData.organizationAddress}/>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
    <div>
        <label className="block mb-1 font-semibol flex" style={{ color: '#662480' }}>رقم الهاتف:</label>
        <input 
    type="tel" 
    name="phone" 
    value={formData.phone} 
    onChange={handleChange} 
    className="w-full p-3 border border-gray-400 rounded-md bg-white focus:ring-2 focus:ring-purple-500" 
    required 
    readOnly={!!savedData.phone} 
    pattern="^07\d{8}$" 
    title="أدخل رقم هاتف صحيح يبدأ بـ 07 ويحتوي على 10 أرقام (مثل: 0791234567)"
/>
    </div>
    <div>
        <label className="block mb-1 font-semibold flex" style={{ color: '#662480' }}>البريد الإلكتروني:</label>
        <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-400 rounded-md bg-white focus:ring-2 focus:ring-purple-500" 
            required 
            readOnly={!!savedData.email} 
            pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$" 
            title="أدخل بريد إلكتروني صحيح (مثل: example@email.com)"
        />
    </div>
</div>


                        <div>
                                <label className="block mb-1 font-semibold flex " style={{  color:'#662480' }}> تفاصيل الطلب:</label>
                                <textarea type="text" name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-md bg-white focus:ring-2 focus:ring-purple-500" required />
                            </div>
                            
                        {/* تفاصيل الاحتياج */}
                        <div>
                                <label className="block mb-1 font-semibold flex " style={{  color:'#662480' }}>اسم الاداة الطبية المتبرع بها:</label>
                                <input type="text" name="toolName" value={formData.toolName} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-md bg-white focus:ring-2 focus:ring-purple-500" required />
                            </div>
                        <div>
                         <label className="block mb-1 font-semibold flex " style={{  color:'#662480' }}>صورة للأداة الطبية المطلوبة:</label>
                        <input 
                         type="file" 
                         name="medicalEquipment" 
                         accept="image/*" 
                        onChange={handleChange} 
                        className="w-full p-3 border border-gray-400 rounded-md bg-white focus:ring-2 focus:ring-purple-500 text-gray-600" 
                      
                      required 
                       />
                     </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-semibold flex " style={{  color:'#662480' }}>الكمية المطلوبة:</label>
                                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-md bg-white focus:ring-2 focus:ring-purple-500 text-gray-600" required />
                            </div>
                            <div>
                                <label className="block mb-1 font-semibold flex " style={{  color:'#662480' }}>التكلفة التقديرية:</label>
                                <input type="number" name="estimatedCost" value={formData.estimatedCost} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-md bg-white focus:ring-2 focus:ring-purple-500 text-gray-600" required />
                            </div>
                        </div>
        
                        {/* سؤال عن ترخيص جمع المال */}
                        {/* <div>
                            <label className="block mb-1 font-semibold flex " style={{  color:'#662480' }}>هل لدى المنظمة ترخيص جمع مال حالي / ساري؟</label>
                            <select name="hasFundraisingLicense" 
                            value={formData.hasFundraisingLicense} onChange={handleChange}
                             className=" w-full p-3 border border-gray-400 rounded-md bg-white focus:ring-2 focus:ring-purple-500 text-gray-600" 
                             required>
                                <option  value="">هل المنظمة او المؤسسة مسجلة ؟</option>
                                <option value="yes">نعم</option>
                                <option value="no">لا</option>
   
                         </select>
                            
                        </div> */}
        
                        {/* رفع إثبات الحاجة */}
                        <div>
                            <label className="block mb-1 font-semibold flex " style={{  color:'#662480' }}>ترخيص جمع المال للوجوه الخيرية:</label>
                            <input  type="file"
                             name="proofDocument" 
                             accept=".pdf,.jpg,.png" 
                             onChange={handleChange} 
                             className="w-full p-3 border border-gray-400 rounded-md bg-white focus:ring-2 focus:ring-purple-500 text-gray-600" 
                              required />
                        </div>
        
                        {/* الموافقة على الشروط */}
                        <div className="flex items-center" >
                            <input type="checkbox" 
                            name="agreement" 
                            checked={formData.agreement} onChange={handleChange}
                             className="mr-2" 
                             required />
                            <label className="text-gray-600 mr-2">أوافق على الشروط والأحكام</label>
                        </div>
                <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="  w-40 bg-pink-600 text-white py-3 px-6  hover:bg-[#662480] transition"
                    style={{ borderRadius: "18px 0 18px 18px" }}>
                    {isSubmitting ? "جاري الإرسال..." : "إرسال"}
                        </button>
                    </form>
                </div>
        </section> 
    );
}