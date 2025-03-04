import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, XCircle, Search, FileText, User, Filter } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import BeneficiaryProfile from './modals/BeneficiaryProfile';

const Beneficiaries = () => {

  const navigate = useNavigate();

  const [beneficiaries, setBeneficiaries] = useState([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [loading, setLoading] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/', { withCredentials: true });
        if (response.status == 200) {
          setBeneficiaries(response.data); 
        } else {
          navigate('/')
        }
      } catch (error) {
        console.error('Error fetching beneficiaries:', error);
      }
    };

    fetchBeneficiaries();
  }, []);

  const updateBeneficiaryStatus = async (id, newStatus) => {
    setLoading(id);
    try {
      const response = await axios.put(`http://localhost:5000/api/${id}/status`, { status: newStatus }, {withCredentials: true});
      setBeneficiaries((prev) =>
        prev.map((b) => (b.id === id ? response.data.request : b))
      );
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(null);
    }
  };

  const viewProfile = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
  };

  const filteredBeneficiaries = beneficiaries.filter(
    (beneficiary) =>
      (beneficiary.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === 'all' || beneficiary.status === statusFilter)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBeneficiaries = filteredBeneficiaries.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100" dir="rtl">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <User size={20} className="text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            إدارة المستفيدين
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pr-9 pl-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full shadow-sm appearance-none text-gray-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="approved">تمت الموافقة</option>
              <option value="pending">قيد الانتظار</option>
              <option value="rejected">مرفوض</option>
            </select>
            <Filter size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="بحث في المستفيدين..."
              className="pr-9 pl-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full min-w-[600px] sm:min-w-0">
            <thead>
              <tr className="bg-gray-50 text-right">
                {['اسم المنظمة', 'البريد الإلكتروني', 'الهاتف', 'العنوان', 'الحالة', 'الإجراءات'].map((header) => (
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
              {currentBeneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                        {beneficiary.organizationName.charAt(0)}
                      </div>
                      <div className="mr-3">
                        <p className="font-medium text-gray-800">{beneficiary.organizationName}</p>
                        <p className="text-xs text-gray-500">ID: {beneficiary.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {beneficiary.email}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {beneficiary.phone}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {beneficiary.organizationAddress}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${beneficiary.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : beneficiary.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                    >
                      {beneficiary.status === 'approved' && <CheckCircle size={12} className="ml-1" />}
                      {beneficiary.status === 'rejected' && <XCircle size={12} className="ml-1" />}
                      {beneficiary.status === 'pending' && <FileText size={12} className="ml-1" />}
                      {beneficiary.status === 'approved' ? 'تمت الموافقة' : beneficiary.status === 'rejected' ? 'مرفوض' : 'قيد الانتظار'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => viewProfile(beneficiary)}
                        className="inline-flex items-center justify-center p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors"
                        title="عرض الملف الشخصي"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => updateBeneficiaryStatus(beneficiary.id, 'approved')}
                        className="inline-flex items-center justify-center p-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
                        disabled={loading === beneficiary.id || beneficiary.status === 'approved'}
                        title="موافقة"
                      >
                        <CheckCircle size={16} />
                      </button>
                      <button
                        onClick={() => updateBeneficiaryStatus(beneficiary.id, 'rejected')}
                        className="inline-flex items-center justify-center p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
                        disabled={loading === beneficiary.id || beneficiary.status === 'rejected'}
                        title="رفض"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBeneficiaries.length === 0 && (
            <div className="py-12 text-center bg-white">
              <User size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 font-medium">لم يتم العثور على مستفيدين</p>
              <p className="text-gray-400 text-sm mt-1">
                {searchQuery ? 'حاول تعديل مصطلح البحث' : 'أضف مستفيدًا جديدًا للبدء'}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            عرض {currentBeneficiaries.length} من {filteredBeneficiaries.length} مستفيدين
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
              disabled={indexOfLastItem >= filteredBeneficiaries.length}
              className="px-3 py-1 bg-indigo-600 border border-indigo-600 rounded-md text-white text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              التالي
            </button>
          </div>
        </div>
      </div>

      <BeneficiaryProfile
        beneficiary={selectedBeneficiary}
        onClose={() => setSelectedBeneficiary(null)}
      />
    </div>
  );
};

export default Beneficiaries;