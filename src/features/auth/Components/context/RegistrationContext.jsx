import React, { createContext, useContext, useState } from "react";

const RegistrationContext = createContext();

export const useRegistration = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1 - Personal & Identity Info
      fullName: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
      hometown: "",
      nationality: "",
      jurisdiction: "",
      district: "",
      assembly: "",
      ethnicity: "",
      identificationType: "",
      identificationNumber: "",
      fathersName: "",
      mothersName: "",
      preferredLanguages: [],
      ministryAffiliation: "",
      consentForCommunication: false,

      phoneNumber: "",
      whatsappAvailable: false,
      email: "",
      residentialAddress: "",

     nextOfKin: {
      name: "",
      relationship: "",
      contactInformation: "",
    },

      status: "",
      baptismStatus: "",
      baptismLocation: "",
      dateJoinedChurch: "",
      firstVisitDate: "",
      invitedBy: "",
      baptismType: "",
      salvationStatus: "",
      baptismDate: "",
      fellowshipGroup: "",
      churchExperienceRating: "",
      educationalLevel: "",
      occupation: "",
      employmentSector: "",
      employmentType: "",

      ministries: [],
      reason: "",
      
      healthCondition: false, 
      specialNeeds: "",
      reasonForNonParticipation: "",
      leadershipRole: "",
      skillsTalents: [],
      spiritualGifts: [],
      hasHealthIssues: false,
      specialNeedsOrMedicalConditions: "",
  });

  // Navigate steps
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Update form data
  const updateForm = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      fullName: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
      hometown: "",
      nationality: "",
      jurisdiction: "",
      district: "",
      assembly: "",
      ethnicity: "",
      identificationType: "",
      identificationNumber: "",
      fathersName: "",
      mothersName: "",
      preferredLanguages: [],
      ministryAffiliation: "",
      consentForCommunication: false,

      phoneNumber: "",
      whatsappAvailable: false,
      email: "",
      residentialAddress: "",

      nextOfKin: {
        name: formData.nextOfKinName,
        relationship: formData.nextOfKinRelationship,
        contactInformation: formData.nextOfKinContact,
      },

      status: "",
      baptismStatus: "",
      baptismLocation: "",
      baptismDate: "",
      dateJoinedChurch: "",
      firstVisitDate: "",
      invitedBy: "",
      baptismType: "",
      salvationStatus: "",
      fellowshipGroup: "",
      churchExperienceRating: "",
      educationalLevel: "",
      occupation: "",
      employmentSector: "",
      employmentType: "",

      ministries: [],
      reason: "",
      
      healthCondition: false, 
      specialNeeds: "",
      reasonForNonParticipation: "",
      leadershipRole: "",
      skillsTalents: [],
      spiritualGifts: [],
      hasHealthIssues: false,
      specialNeedsOrMedicalConditions: "",
        });
    setStep(1);
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
        resetForm,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
