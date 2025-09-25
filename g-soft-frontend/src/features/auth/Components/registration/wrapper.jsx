// components/registration/RegistrationFormWrapper.jsx
import React from 'react';
import { useRegistration } from "../context/RegistrationContext";
import Step1PersonalInfo from './Step1';
import Step2ContactInfo from './Step2';
import Step3MembershipInfo from './Step3';
import Step4EducationInfo from './Step4';
import Step5SkillsInfo from './Step5';
import Step6HealthWelfareInfo from './Step6';
import Step7ReviewSubmit from './Step7';
import RegistrationStepper from './RegistrationStepper';

const RegistrationFormWrapper = () => {
  const { step } = useRegistration();

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1PersonalInfo />;
      case 2: return <Step2ContactInfo />;
      case 3: return <Step3MembershipInfo />;
      case 4: return <Step4EducationInfo />;
      case 5: return <Step5SkillsInfo />;
      case 6: return <Step6HealthWelfareInfo />;
      case 7: return <Step7ReviewSubmit />;
      default: return <div>Unknown step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-10">
      <RegistrationStepper />
      {renderStep()}
    </div>
  );
};

// const Step7ReviewSubmit = () => {
//   return <div className='flex justify-center text-5xl text-green-600'>You have successfully register</div>;
// };

export default RegistrationFormWrapper;
