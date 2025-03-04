import React from 'react';
import { FileText, TrendingUp, Users, ChevronRight, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Reports = () => {
  
  const donationTrends = [
    { month: 'يناير', donations: 5000 },
    { month: 'فبراير', donations: 7000 },
    { month: 'مارس', donations: 6000 },
    { month: 'أبريل', donations: 8000 },
    { month: 'مايو', donations: 9000 },
  ];

  const donorDemographics = [
    { name: '18-24 سنة', value: 30 },
    { name: '25-34 سنة', value: 45 },
    { name: '35-44 سنة', value: 20 },
    { name: '45+ سنة', value: 5 },
  ];

  const campaignPerformance = [
    { name: 'حملة التعليم', donations: 12000, donors: 150 },
    { name: 'حملة الصحة', donations: 8000, donors: 100 },
    { name: 'حملة الإغاثة', donations: 15000, donors: 200 },
  ];

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

  
  const exportToPDF = () => {
    const input = document.getElementById('reports-content');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); 
      const imgWidth = 210; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('reports.pdf');
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden" dir="rtl">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          التقارير والتحليلات
        </h2>
        <div className="flex items-center text-sm text-gray-500 font-medium">
          <span>آخر تحديث اليوم</span>
        </div>
      </div>

      <div id="reports-content" className="p-5">
        {/* Donation Trends Chart */}
        <div className="bg-gray-50 rounded-xl p-5 shadow-sm transition-all hover:shadow-md hover:bg-blue-50 border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp size={16} className="text-green-600" />
              اتجاهات التبرعات
            </h3>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">+10% هذا الشهر</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donationTrends}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="donations" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donor Demographics */}
        <div className="bg-gray-50 rounded-xl p-5 shadow-sm transition-all hover:shadow-md hover:bg-indigo-50 border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users size={16} className="text-blue-600" />
              توزيع المتبرعين حسب العمر
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={donorDemographics}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {donorDemographics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Performance */}
        <div className="bg-gray-50 rounded-xl p-5 shadow-sm transition-all hover:shadow-md hover:bg-purple-50 border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <PieChart size={16} className="text-purple-600" />
              أداء الحملات
            </h3>
          </div>
          <ul className="space-y-3">
            {campaignPerformance.map((campaign) => (
              <li key={campaign.name} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg shadow-sm">
                <span className="text-gray-800 font-medium">{campaign.name}</span>
                <div className="flex items-center">
                  <span className="text-purple-600 font-bold">JD {campaign.donations.toLocaleString()}</span>
                  <ChevronRight size={16} className="mr-2 text-gray-400" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Export Button */}
        <div className="mt-8">
          <button
            onClick={exportToPDF}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 shadow-sm hover:cursor-pointer"
          >
            <FileText size={16} />
            تصدير كـ PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;