import { createContext, useContext, useState,useEffect } from "react";

const RegistrationContext = createContext();

export const useRegistration = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children, prefill }) => {
  const [step, setStep] = useState(1);


  const [formData, setFormData] = useState({
    // Step 1 - Personal & Identity Info
    userId: "",
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
    physicalAddress: "",

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
    createdBy: "",
    createdDate: "",
    updatedAt: "",
  });


  useEffect(() => {
    if (prefill) {
      setFormData((prev) => ({
        ...prev,
        fullName: prefill.fullName || prev.fullName,
        email: prefill.email || prev.email,
        phoneNumber: prefill.phoneNumber || prev.phoneNumber,
        assembly: prefill.assembly || prev.assembly,
        userId: prefill.userId || prev.userId,
      }));
      setStep(1); // always start at Step 1 for new registration
    }
  }, [prefill]);
  // Navigate steps
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));


  const loadMemberData = (memberData) => {
  setFormData((prev) => ({
    ...prev,
    ...memberData,
  }));
};
  // Update form data
  const updateForm = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      userId: "",
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
      physicalAddress: "",

      nextOfKin: {
        name: formData.nextOfKin.name,
        relationship: formData.nextOfKin.relationship,
        contactInformation: formData.nextOfKin.contact,
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
      createdBy: "",
      updatedBy: "",
      createdAt: "",
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
        loadMemberData,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
