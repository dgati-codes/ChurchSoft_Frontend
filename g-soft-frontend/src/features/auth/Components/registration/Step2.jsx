import React, { useState } from 'react';
import { useRegistration } from "../context/RegistrationContext";
import { MapPin } from 'lucide-react';


const Step2ContactInfo = () => {
  const { formData, updateForm, nextStep, prevStep } = useRegistration();

  const [localData, setLocalData] = useState({
    phoneNumber: formData.phoneNumber || '',
    email: formData.email || '',
    whatsapp: formData.whatsapp || false,
    residentialAddress: formData.residentialAddress || '',
    nextOfKinName: formData.nextOfKinName || '',
    nextOfKinRelationship: formData.nextOfKinRelationship || '',
    nextOfKinContact: formData.nextOfKinContact || '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setLocalData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateForm(localData);
    nextStep();
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-center mb-1">Church Member Registration</h1>
      <p className="text-center pb-6">Please fill out all sections to complete your membership registration</p>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg space-y-8">

        {/* Contact and Location Section */}
        <div>
          <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
            <MapPin className='h-5 w-5 text-green-500' /> Contact and Location Details <span className="text-gray-500 text-sm">• 2/7</span>
          </h2>
          <p className="text-gray-600 mb-2">
            Used for communication, visitation, outreach, and community engagement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="phoneNumber"
              value={localData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number*"
              className="input bg-gray-100 rounded px-4 py-2"
              required
            />
            <input
              name="email"
              value={localData.email}
              onChange={handleChange}
              placeholder="Email Address*"
              className="input bg-gray-100 rounded px-4 py-2"
              type="email"
              required
            />
          </div>

          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              name="whatsapp"
              checked={localData.whatsapp}
              onChange={handleChange}
              className="h-4 w-4"
            />
            {/* <input type="text" name="whatsapp" className='input' /> */}
            <label htmlFor="whatsapp" className="text-gray-700 text-sm">
              WhatsApp Available (optional)
            </label>
             <input
              type="text"
              name="whatsapp"
             value={localData.whatsapp}
              onChange={handleChange}
              className="input bg-gray-100 rounded px-4 py-2"
            />
          </div>

          <div className="mt-4">
            <input
              name="residentialAddress"
              value={localData.residentialAddress}
              onChange={handleChange}
              placeholder="Area of Residence / Physical Address*"
              className="w-full bg-gray-100 rounded px-4 py-2"
              required
            />
          </div>
        </div>

        {/* Next of Kin Section */}
        <div>
          <hr className="my-6 bg-gray-100-t" />
          <h3 className="text-lg font-semibold mb-4">Next of Kin Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="nextOfKinName"
              value={localData.nextOfKinName}
              onChange={handleChange}
              placeholder="Name*"
              className="input bg-gray-100 rounded px-4 py-2"
              required
            />
            <input
              name="nextOfKinRelationship"
              value={localData.nextOfKinRelationship}
              onChange={handleChange}
              placeholder="Relationship*"
              className="input bg-gray-100 rounded px-4 py-2"
              required
            />
            <input
              name="nextOfKinContact"
              value={localData.nextOfKinContact}
              onChange={handleChange}
              placeholder="Contact Information*"
              className="input bg-gray-100 rounded px-4 py-2"
              required
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-white text-blue-500 rounded border border-blue-500 "
          >
           Save and Exit
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Save and Continue
          </button>
        </div>
      </form>
    </>
  );
};

export default Step2ContactInfo;
