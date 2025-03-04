import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, User, Calendar, Lock, DollarSign, CreditCardIcon } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';

const Payment = () => {
  const itemId = useParams().id;
  const userId = useSelector((state) => state.user.id);
  const navigate = useNavigate();

  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    paymentMethod: 'credit-card',
    nameOfCard: '',
    numOfCard: '',
    month: '',
    year: '',
    code: '',
  });

  useEffect(() => {
    console.log(userId)
    console.log(itemId)
  }, [userId, itemId])

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!paymentDetails.amount) newErrors.amount = 'المبلغ مطلوب';
    if (!paymentDetails.nameOfCard) newErrors.nameOfCard = 'اسم البطاقة مطلوب';

    if (!paymentDetails.numOfCard) {
      newErrors.numOfCard = 'رقم البطاقة مطلوب';
    } else if (paymentDetails.numOfCard.replace(/\s/g, '').length !== 16) {
      newErrors.numOfCard = 'رقم البطاقة يجب أن يكون 16 رقم';
    }

    if (!paymentDetails.month) {
      newErrors.month = 'الشهر مطلوب';
    } else if (parseInt(paymentDetails.month) < 1 || parseInt(paymentDetails.month) > 12) {
      newErrors.month = 'الشهر غير صالح';
    }

    const currentYear = new Date().getFullYear() % 100;
    if (!paymentDetails.year) {
      newErrors.year = 'السنة مطلوبة';
    } else if (parseInt(paymentDetails.year) < currentYear) {
      newErrors.year = 'تاريخ غير صالح';
    }

    if (!paymentDetails.code) {
      newErrors.code = 'رمز الأمان مطلوب';
    } else if (!/^\d{3,4}$/.test(paymentDetails.code)) {
      newErrors.code = 'رمز الأمان يجب أن يكون 3-4 أرقام';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'numOfCard') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(.{4})/g, '$1 ')
        .trim();

      setPaymentDetails({
        ...paymentDetails,
        [name]: formattedValue,
      });
    } else {
      setPaymentDetails({
        ...paymentDetails,
        [name]: value,
      });
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('يرجى التحقق من صحة جميع البيانات المدخلة', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        rtl: true
      });
      return;
    }



    const paymentData = {
      userId,
      itemId,
      ...paymentDetails,
      numOfCard: paymentDetails.numOfCard.replace(/\s/g, ''),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/payment', paymentData);
      if (response.status === 201) {
        toast.success('تمت عملية الدفع بنجاح!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          rtl: true,
          onClose: () => {
            navigate(`/DonationDetails/${itemId}`);
          }
        });
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast.error('فشلت عملية الدفع. يرجى المحاولة مرة أخرى.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        rtl: true
      });
    }
  };

  return (
    <>
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      {/* إضافة حاوية Toastify */}
      <ToastContainer />

      <div className="flex justify-center mb-6">
        <div className="p-3 bg-[#EDBED8] rounded-full">
          <CreditCard className="w-10 h-10 text-[#E3007E]" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">معلومات الدفع</h2>

      <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
        <div className="relative">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <DollarSign className="w-4 h-4 ml-1" />
            <span>المبلغ:</span>
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={paymentDetails.amount}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-3 bg-gray-50 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E3007E] focus:border-transparent`}
          />
          {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
        </div>

        <div className="relative">
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <CreditCardIcon className="w-4 h-4 ml-1" />
            <span>طريقة الدفع:</span>
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentDetails.paymentMethod}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E3007E] focus:border-transparent"
          >
            <option value="credit-card">بطاقة ائتمان</option>
            <option value="debit-card">فيزا</option>
            <option value="prepaid-card">محفظة الكترونية</option>
          </select>
        </div>

        <div className="relative">
          <label htmlFor="nameOfCard" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <User className="w-4 h-4 ml-1" />
            <span>الاسم على البطاقة:</span>
          </label>
          <input
            type="text"
            id="nameOfCard"
            name="nameOfCard"
            value={paymentDetails.nameOfCard}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-3 bg-gray-50 border ${errors.nameOfCard ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E3007E] focus:border-transparent`}
          />
          {errors.nameOfCard && <p className="text-red-500 text-xs mt-1">{errors.nameOfCard}</p>}
        </div>

        <div className="relative">
          <label htmlFor="numOfCard" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <CreditCard className="w-4 h-4 ml-1" />
            <span>رقم البطاقة:</span>
          </label>
          <input
            type="text"
            id="numOfCard"
            name="numOfCard"
            value={paymentDetails.numOfCard}
            onChange={handleChange}
            placeholder="XXXX XXXX XXXX XXXX"
            className={`mt-1 block w-full px-3 py-3 bg-gray-50 border ${errors.numOfCard ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E3007E] focus:border-transparent`}
          />
          {errors.numOfCard && <p className="text-red-500 text-xs mt-1">{errors.numOfCard}</p>}
        </div>

        <div className="flex space-x-4 space-x-reverse">
          <div className="w-1/2">
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Calendar className="w-4 h-4 ml-1" />
              <span>شهر:</span>
            </label>
            <input
              type="text"
              id="month"
              name="month"
              value={paymentDetails.month}
              onChange={handleChange}
              placeholder="MM"
              maxLength="2"
              className={`mt-1 block w-full px-3 py-3 bg-gray-50 border ${errors.month ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E3007E] focus:border-transparent`}
            />
            {errors.month && <p className="text-red-500 text-xs mt-1">{errors.month}</p>}
          </div>
          <div className="w-1/2">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Calendar className="w-4 h-4 ml-1" />
              <span>سنة:</span>
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={paymentDetails.year}
              onChange={handleChange}
              placeholder="YY"
              maxLength="2"
              className={`mt-1 block w-full px-3 py-3 bg-gray-50 border ${errors.year ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E3007E] focus:border-transparent`}
            />
            {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
          </div>
        </div>

        <div className="relative">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Lock className="w-4 h-4 ml-1" />
            <span>رمز الأمان (CVV):</span>
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={paymentDetails.code}
            onChange={handleChange}
            placeholder="CVV"
            maxLength="4"
            className={`mt-1 block w-full px-3 py-3 bg-gray-50 border ${errors.code ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E3007E] focus:border-transparent`}
          />
          {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
        </div>

        <div className="mt-8">
          <button 
            type="submit" 
            className="w-full py-4 bg-[#E3007E] cursor-pointer hover:bg-[#E3007E] text-white text-lg font-bold rounded-lg shadow-lg transition duration-200 transform hover:scale-105 flex items-center justify-center"
          >
            <CreditCard className="w-5 h-5 ml-2" />
            إتمام عملية الدفع
          </button>
        </div>

        <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
          <Lock className="w-4 h-4 ml-1" />
          <span>جميع المعاملات آمنة ومشفرة</span>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Payment;