import { useState } from 'react';
import { useRegistration } from '../context/RegistrationContext';
import { Church } from "lucide-react";


const Step3MembershipInfo = () => {
  const { formData, updateForm, nextStep, prevStep } = useRegistration();

  const [localData, setLocalData] = useState({
    membershipStatus: formData.membershipStatus || '',
    membershipDate: formData.membershipDate || '',
    firstVisitDate: formData.firstVisitDate || '',
    invitedBy: formData.invitedBy || '',
    baptismStatus: formData.baptismStatus || '',
    baptismDate: formData.baptismDate || '',
    membershipType: formData.membershipType || '',
    fellowshipGroup: formData.fellowshipGroup || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateForm(localData);
    nextStep();
  };

  return (
    <div className=" min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
           <Church  className='w-6 h-6 text-orange-500 mr-3.5'/>
            Spiritual Journey & Church Membership
            <span className="text-gray-500 text-sm">• 3/7</span>
          </h2>
          <p className="text-gray-500 text-sm ml-15 mt-1">
            Tracks spiritual growth, integration into the church, and status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className='text-gray-700 font-semibold'>Date Joined Church<span className='text-red-600'>*</span></label>
            <input type="date" name="membershipDate" value={localData.membershipDate} onChange={handleChange} className="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className='text-gray-600 font-semibold'>Status<span className='text-red-600'>*</span></label>
            <select name="membershipStatus" value={localData.membershipStatus} onChange={handleChange} className="w-full  rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select status</option>
              <option>New Member</option>
              <option>Returning Member</option>
              <option>Transferred</option>
            </select>
          </div>

          <div>
            <label className='text-gray-600 font-semibold'>Baptism Status<span className='text-red-600'>*</span></label>
            <select name="baptismStatus" value={localData.baptismStatus} onChange={handleChange} className="w-full  rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select status</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label className='text-gray-600 font-semibold'>Baptism Date (optional)</label>
            <input type="date" name="baptismDate" value={localData.baptismDate} onChange={handleChange} className="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className='text-gray-600 font-semibold'>Baptism Location (optional)</label>
            <input name="invitedBy" value={localData.invitedBy} onChange={handleChange} placeholder="Enter location" className="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className='text-gray-600 font-semibold'>Type of Baptism<span className='text-red-600'>*</span></label>
            <select name="membershipType" value={localData.membershipType} onChange={handleChange} className="w-full bg-gray-100 rounded-md px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select baptism type</option>
              <option>Regular</option>
              <option>Associate</option>
              <option>Probationary</option>
            </select>
          </div>

          <div>
            <label className='text-gray-600 font-semibold'>Salvation/Born Again<span className='text-red-600'>*</span></label>
            <select name="firstVisitDate" value={localData.firstVisitDate} onChange={handleChange} className="w-full  rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select status</option>
              <option>Yes</option>
              <option>No</option>
              <option>Not Sure</option>
            </select>
          </div>

          <div>
            <label className='text-gray-600 font-semibold'>Church Experience Rating<span className='text-red-600'>*</span></label>
            <select name="fellowshipGroup" value={localData.fellowshipGroup} onChange={handleChange} className="w-full  rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Average</option>
              <option>Poor</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button type="button" onClick={prevStep} className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-white text-blue-500 rounded border border-blue-500 "
          >
           Save and Exit
          </button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3MembershipInfo;
