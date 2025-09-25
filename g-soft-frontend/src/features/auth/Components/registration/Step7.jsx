// components/registration/Step7ReviewSubmit.jsx
import React from 'react';
import { useRegistration } from "../context/RegistrationContext";

const Step7ReviewSubmit = () => {
  const { formData, setStep, updateForm } = useRegistration();

  const handleFinalSubmit = (e) => {
    e.preventDefault();

    // 👉 Send formData to your backend or Firebase here
    console.log('Final Submitted Data:', formData);

    alert('Registration complete!');
    handleReset();
  };

  const handleReset = () => {
    updateForm({
      fullName: '',
      dob: '',
      gender: '',
      maritalStatus: '',
      hometown: '',
      nationality: '',
      ethnicity: '',
      idType: '',
      idNumber: '',
      fatherName: '',
      motherName: '',
      genderMinistry: '',
      phoneNumber: '',
      whatsapp: '',
      email: '',
      digitalAddress: '',
      residentialAddress: '',
      gpsLocation: '',
      membershipStatus: '',
      membershipDate: '',
      firstVisitDate: '',
      invitedBy: '',
      baptismStatus: '',
      baptismDate: '',
      membershipType: '',
      fellowshipGroup: '',
      educationLevel: '',
      courseOfStudy: '',
      institution: '',
      graduationYear: '',
      professionalQualification: '',
      occupation: '',
      employer: '',
      position: '',
      skills: '',
      talents: '',
      willingToServe: '',
      areaOfService: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      relationshipToEmergency: '',
      healthCondition: '',
      allergies: '',
      disabilityStatus: '',
      healthInsuranceProvider: '',
    });

    setStep(1);
  };

  return (
    <>
      <h1 className='text-3xl flex justify-center font-semibold mb-1'>Church Member Registration</h1>
 <p className='flex justify-center pb-6'>Please fill out all sections to complete your membership registration</p>

    <form onSubmit={handleFinalSubmit} className="max-w-5xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl  font-semibold mb-1">Personal & Identity Information <span className="text-gray-500 text-sm">• 7/7</span></h2>
      <p className="text-gray-600  mb-6">please crosscheck your informations and click to submit.

</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="bg-gray-50 p-3 rounded border">
            <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong>
            <div className="text-gray-700">{value || '—'}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button type="button" onClick={handleReset} className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-400">
          Start Over
        </button>
        <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500">
          Submit Registration
        </button>
      </div>
    </form>
    </>
  );
};

export default Step7ReviewSubmit;
