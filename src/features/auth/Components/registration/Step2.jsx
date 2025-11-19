import React, { useState } from "react";
import { useRegistration } from "../context/RegistrationContext";
import { MapPin } from "lucide-react";

const Step2ContactInfo = () => {
  const { formData, updateForm, nextStep, prevStep } = useRegistration();

  // Local state initialized from formData
  const [localData, setLocalData] = useState({
    phoneNumber: formData.phoneNumber || "",
    email: formData.email || "",
    whatsappAvailable: formData.whatsappAvailable || false,
    consentForCommunication: formData.consentForCommunication || false,
    residentialAddress: formData.residentialAddress || "",
    nextOfKin: {
      name: formData.nextOfKin?.name || "",
      relationship: formData.nextOfKin?.relationship || "",
      contactInformation: formData.nextOfKin?.contactInformation || "",
    },
  });

  // Handle input and checkbox changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("nextOfKin")) {
  const key = name.replace("nextOfKin", ""); 
  const finalKey = key.charAt(0).toLowerCase() + key.slice(1); 
  setLocalData((prev) => ({
    ...prev,
    nextOfKin: { ...prev.nextOfKin, [finalKey]: value },
  }));
}

     else {
      setLocalData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Save to global formData and proceed
  const handleSubmit = (e) => {
    e.preventDefault();
    updateForm(localData);
    nextStep();
  };

  return (
    <>
      <h1 className="text-3xl  font-semibold text-center mb-1">
        Church Member Registration
      </h1>
      <p className="text-center pb-6">
        Please fill out all sections to complete your membership registration
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto font-[Poppins] px-6 py-10 bg-white shadow-md rounded-lg space-y-8"
      >
        {/* Contact and Location Section */}
        <div>
          <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" /> Contact and Location
            Details <span className="text-gray-500 text-sm">• 2/7</span>
          </h2>
          <p className="text-gray-600 mb-2">
            Used for communication, visitation, outreach, and community
            engagement.
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
              type="email"
              value={localData.email}
              onChange={handleChange}
              placeholder="Email Address*"
              className="input bg-gray-100 rounded px-4 py-2"
              required
            />
          </div>

          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              name="whatsappAvailable"
              checked={localData.whatsappAvailable}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label htmlFor="whatsappAvailable" className="text-gray-700 text-sm">
              WhatsApp Available (optional)
            </label>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <input
              type="checkbox"
              name="consentForCommunication"
              checked={localData.consentForCommunication}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label htmlFor="consentForCommunication" className="text-gray-700 text-sm">
              CONSENT FOR COMMUNICATION (optional)
            </label>
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
          <hr className="my-6 bg-gray-100" />
          <h3 className="text-lg font-semibold mb-4">Next of Kin Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="nextOfKinName"
              value={localData.nextOfKin.name}
              onChange={handleChange}
              placeholder="Name*"
              className="input bg-gray-100 rounded px-4 py-2"
              required
            />
            <input
              name="nextOfKinRelationship"
              value={localData.nextOfKin.relationship}
              onChange={handleChange}
              placeholder="Relationship*"
              className="input bg-gray-100 rounded px-4 py-2"
              required
            />
            <input
              name="nextOfKinContactInformation"
              value={localData.nextOfKin.contactInformation}
              onChange={handleChange}
              placeholder="Contact Information*"
              className="input bg-gray-100 rounded px-4 py-2"
              
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
