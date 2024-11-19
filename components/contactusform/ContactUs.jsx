'use client'
import React, { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput, { getCountryCallingCode, parsePhoneNumber } from 'react-phone-number-input';
import countryNames from 'react-phone-number-input/locale/en'
import Image from 'next/image';

export default function ContactUs({hero}) {
  const [formData, setFormData] = useState({
    budget: '',
    ready: '',
    name: '',
    phone: '',
    email: '',
    how: '',
    country: countryNames['AE'],
    countryFlagCode: 'AE',
  });
  const [formStatus, setFormStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handlePhoneChange = (phone) => {
  console.log('Phone changed:', phone); // Log the full phone number
  setFormData({
    ...formData,
    phone,
  });
};

useEffect(() => {
  if (formData.phone && formData.phone.length > 5) { // Adjust condition as needed
    try {
      console.log('Parsing phone number:', formData.phone);
      const parsedNumber = parsePhoneNumber(formData.phone);

      if (parsedNumber) {
        console.log('Parsed number:', parsedNumber);
        const country = parsedNumber.country;
        setFormData((prevData) => ({
          ...prevData,
          country: countryNames[country] || '',
          countryFlagCode: country || '',
        }));
      } else {
        console.log('Phone number could not be parsed.');
      }
    } catch (error) {
      console.error('Error parsing phone number:', error);
    }
  } else {
    console.log('Incomplete phone number, skipping parsing.');
  }
}, [formData.phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const response = await fetch('/api/users/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error && errorData.error.includes('E11000')) {
          setFormStatus('emailUsed');
        } else {
          throw new Error('An unknown error occurred.');
        }
      } else {
        const newUser = await response.json();
        setFormStatus('submitted');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      setFormStatus('error');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const renderMessage = () => {
    if (formStatus === 'submitted') {
      return  <div onClick={()=> setFormStatus(null)} className='z-50 w-full h-full bg-black bg-opacity-50 fixed top-0 right-0 flex items-center justify-center'>
      <Image
        src='https://res.cloudinary.com/shhady/image/upload/v1725968866/Popup_ltefca.jpg'
        alt="logo"
        width={1000}
        height={1000}
        className='w-full h-auto max-w-screen-sm md:max-w-full md:w-auto md:h-auto'
      />
    </div>;
    }
    if (formStatus === 'emailUsed') {
      return <div className='text-2xl text-red-700 text-center'>تم استخدام هذا البريد الإلكتروني في السابق</div>;
    }
    if (formStatus === 'error') {
      return <div className='text-2xl text-red-700 text-center'>حدث خطأ في ارسال البيانات. حاول مرة اخرى</div>;
    }
    return null;
  };

  useEffect(()=>{
    if(formStatus === 'submitted'){
      setTimeout(()=>{
        setFormStatus(null);
        setFormData({
          budget: '',
          ready: '',
          name: '',
          phone: '',
          email: '',
          how: '',
          country: '',
          countryFlagCode: '',
        })
      },6000)
    }
   },[formStatus]);

   console.log(formStatus);
  return (
    
    <div className={`p-8  ${hero ? 'text-white':'text-black'} `}>
      <h1 className='text-4xl text-center lg:mb-4'>إحجز شقتك الآن</h1>
      {/* <p className='text-2xl text-center line-under-white'>املأ بياناتك وسنقوم بالرد عليك في أقرب وقت ممكن</p> */}
      <form onSubmit={handleSubmit} className="container mx-auto py-8 px-4 lg:px-0">
        <div className={`grid lg:grid-cols-1 ${hero ? 'gap-0':'gap-4'}  justify-items-center items-end`}>
          <div className={`grid lg:grid-cols-2 ${hero ? 'gap-1 lg:gap-4':'gap-4'} w-full max-w-screen-lg`}>
            <div className="mb-3 text-right">
              <label htmlFor="budget" className={`${hero ? 'text-white':'text-black'} `}>ما هي ميزانية الاستثمار؟ <span className="required text-danger">*</span></label>
              <select name="budget" id="budget" required value={formData.budget} onChange={handleChange} className="form-control mt-2 block w-full rounded-md border-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 bg-gray-200">
                <option value="">اختر</option>
                <option value="I don't have money">ليس لدي المال</option>
                <option value="30 thousand dollars">30 ألف دولار</option>
                <option value="50 thousand dollars">50 ألف دولار</option>
                <option value="100 thousand dollars">100 ألف دولار</option>
                <option value="200 thousand dollars">200 ألف دولار</option>
                <option value="500 thousand dollars">500 ألف دولار</option>
                <option value="1 million dollars">مليون دولار</option>
                <option value="More than 1 million dollars">اكثر من مليون دولار</option>
              </select>
            </div>
            <div className="mb-3 text-right">
              <label htmlFor="ready" className={`${hero ? 'text-white':'text-black'} `}>هل انت جاهز لحجز العقار؟<span className="required text-danger">*</span></label>
              <select name="ready" id="ready" required value={formData.ready} onChange={handleChange} className="form-control mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 bg-gray-200">
                <option value="">اختر</option>
                <option value="Yes">نعم</option>
                <option value="No">لا</option>
              </select>
            </div>
          </div>
          <div className={`grid lg:grid-cols-2 ${hero ? 'gap-1 lg:gap-4':'gap-4'} w-full max-w-screen-lg`}>
            <div className="mb-3 text-right">
              <label htmlFor="name" className={`${hero ? 'text-white':'text-black'} `}>الاسم الكامل <span className="required text-danger">*</span></label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="form-control mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 bg-gray-200" />
            </div>
            <div className="mb-3 text-right" dir="ltr">
              <label htmlFor="phone" className={`${hero ? 'text-white':'text-black'} `}><span className="required text-danger">*</span> رقم الهاتف </label>
              {/* <input type="number" name="phone" required value={formData.phone} onChange={handleChange} className="form-control mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 bg-gray-200" /> */}
              <PhoneInput
               
                className="form-control mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 bg-gray-200"
                placeholder="Enter phone number"
                international
                countryCallingCodeEditable={false}
                defaultCountry="AE"
                value={formData.phone}
                name="phone"
                onChange={handlePhoneChange}
              />
      
            </div>
          </div>
          <div className={`grid lg:grid-cols-2 ${hero ? 'gap-1 lg:gap-4':'gap-4'} w-full max-w-screen-lg`}>
            <div className="mb-3 text-right">
              <label htmlFor="email" className={`${hero ? 'text-white':'text-black'} `}>البريد الإلكتروني <span className="required text-danger">*</span></label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="form-control mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 bg-gray-200" />
            </div>
            <div className="mb-3 text-right">
              <label htmlFor="how" className={`${hero ? 'text-white':'text-black'} `}>كيف تعرف عنا؟<span className="required text-danger">*</span></label>
              <select name="how" id="how" required value={formData.how} onChange={handleChange} className="form-control mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black p-2 bg-gray-200">
                <option value="">اختر</option>
                <option value="Instagram">انستجرام</option>
                <option value="Tik Tok">تيكتوك</option>
                <option value="Facebook">فيسبوك</option>
                <option value="The YouTube">يوتيوب</option>
                <option value="Through a Friend">عن طريق صديق</option>
              </select>
            </div>
          </div>

          {/* Render the submission status message */}
          {renderMessage()}
       
          {formStatus !== 'submitted' && (
            <div className="w-full max-w-screen-lg text-left">
              <button type="submit" 
            className="w-full mt-4 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#dbb454,45%,white,55%,#dbb454)] bg-[length:200%_100%] px-6 font-medium text-[#303030] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" disabled={isLoading}>
{isLoading ? 'جاري الإرسال...' : 'أرسل'}
              </button>
            </div>
          )}
        </div>
        
      </form>
    </div>
  );
}
