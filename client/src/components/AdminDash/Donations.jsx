import React, { useEffect, useState } from 'react';
import { DollarSign, Search, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Donations = () => {
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/donation', { withCredentials: true });
        if (response.status === 200) {
          setDonations(response.data); 
          setLoading(false); 
        } else {
          navigate('/');
        }
      } catch (err) {
        setError(err.message); 
        setLoading(false); 
      }
    };

    fetchDonations();
  }, []);

  const filteredDonations = donations.filter(
    (donation) =>
      donation.nameOfCard.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.amount.toString().includes(searchQuery)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDonations = filteredDonations.slice(indexOfFirstItem, indexOfLastItem);

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">جاري التحميل...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">حدث خطأ: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100" dir="rtl">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <DollarSign size={20} className="text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            إدارة التبرعات
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث في التبرعات..."
              className="pr-9 pl-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full min-w-[600px] sm:min-w-0">
            <thead>
              <tr className="bg-gray-50 text-right">
                {['المتبرع', 'المبلغ', 'طريقة الدفع', 'تاريخ التبرع'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {currentDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        {donation.nameOfCard.charAt(0)}
                      </div>
                      <div className="mr-3">
                        <p className="font-medium text-gray-800">{donation.nameOfCard}</p>
                        <p className="text-xs text-gray-500">donor#{donation.userId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-green-600 font-medium">JD {donation.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {donation.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600 text-sm">
                      {new Date(donation.createdAt).toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDonations.length === 0 && (
            <div className="py-12 text-center bg-white">
              <Users size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 font-medium">لم يتم العثور على تبرعات</p>
              <p className="text-gray-400 text-sm mt-1">
                {searchQuery ? 'حاول تعديل مصطلح البحث' : 'أضف تبرعًا جديدًا للبدء'}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            عرض {currentDonations.length} من {filteredDonations.length} تبرعات
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white border border-gray-200 rounded-md text-gray-600 text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              السابق
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= filteredDonations.length}
              className="px-3 py-1 bg-blue-600 border border-blue-600 rounded-md text-white text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;