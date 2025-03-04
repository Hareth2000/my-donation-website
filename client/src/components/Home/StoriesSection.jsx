import React from 'react'

function StoriesSection() {
  return (

    <section className="bg-gray-100 py-10 px-4 text-right">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-8">التقييمات وقصص الفيديو</h2>
        <p className="text-lg text-gray-600 mb-12">
          استمعوا إلى آراء المتبرعين وشاهدوا قصص النجاح التي حققناها بفضل دعمكم.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Text Review 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <p className="text-gray-700 mb-4">
              "وكانت منصة أفق بمثابة شعاع النور في وقت مليء بالتحديات. عندما قدمت طلبًا للمساعدة لتوفير كرسي متحرك جديد، بفضل تبرعاتكم، استطعت توفير العلاج الذي غير حياتي. شكراً لمنصة أفق على دعمها!"
            </p>
            <h4 className="text-primary font-semibold">- أحمد من عمان</h4>
            <p className="text-gray-500 text-sm mt-4">Dec 24, 2023</p>
          </div>

          {/* Video Story 1 */}
          <div className="bg-white rounded-lg shadow-md p-2 hover:shadow-lg transition">
            <video
              controls
              className="w-full h-50 rounded-lg object-cover"
            >
              <source src="https://videos.pexels.com/video-files/6191169/6191169-uhd_1440_2732_25fps.mp4" type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
            <p className="text-gray-700 mt-2">قصة نجاح - سارة من اربد</p>
          </div>

          {/* Text Review 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition ">
            <p className="text-gray-700 mb-10">“لم أكن أتخيل أبدًا أنني سأحصل على المساعدة التي أحتاجها بهذه السرعة والشفافية. كانت منصة أفق بوابتي للأمل، حيث تمكّنت من تأمين جهاز طبي ضروري لابنتي. ”</p>
            <h4 className="text-primary font-semibold">- سامر من الزرقاء</h4>
            <p className="text-gray-500 text-sm mt-4">Dec 24, 2023</p>
          </div>

          {/* Video Story 2 */}
          <div className="bg-white rounded-lg shadow-md p-2 hover:shadow-lg transition">
            <video
              controls
              className="w-full rounded-lg h-50 object-cover"
            >
              <source src="https://videos.pexels.com/video-files/6191451/6191451-sd_960_506_25fps.mp4" type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
            <p className="text-gray-700 mt-2">قصة نجاح - مريم من عمان</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StoriesSection