import React, { createContext, useContext, useState } from 'react';

const RegistrationContext = createContext();

export const useRegistration = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
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

    // Step 2 - Contact Info
    phoneNumber: '',
    whatsapp: '',
    email: '',
    digitalAddress: '',
    residentialAddress: '',
    gpsLocation: '',

    // Step 3 - Membership Info
    membershipStatus: '',
    membershipDate: '',
    firstVisitDate: '',
    invitedBy: '',
    baptismStatus: '',
    baptismDate: '',
    membershipType: '',
    fellowshipGroup: '',

    // Step 4 - Education Info
    educationLevel: '',
    courseOfStudy: '',
    institution: '',
    graduationYear: '',
    professionalQualification: '',

    // Step 5 - Skills & Occupation
    occupation: '',
    employer: '',
    position: '',
    skills: '',
    talents: '',
    willingToServe: '',
    areaOfService: '',

    // Step 6 - Welfare & Health
    emergencyContactName: '',
    emergencyContactPhone: '',
    relationshipToEmergency: '',
    healthCondition: '',
    allergies: '',
    disabilityStatus: '',
    healthInsuranceProvider: '',
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const updateForm = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <RegistrationContext.Provider
      value={{
        step,
        setStep,
        formData,
        updateForm,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
