// components/registration/RegistrationFormWrapper.jsx
import React, { useState } from "react";
import { useRegistration } from "../context/RegistrationContext";
import Step1PersonalInfo from "./Step1";
import Step2ContactInfo from "./Step2";
import Step3MembershipInfo from "./Step3";
import Step4EducationInfo from "./Step4";
import Step5SkillsInfo from "./Step5";
import Step6HealthWelfareInfo from "./Step6";
import Step7ReviewSubmit from "./Step7";
import RegistrationStepper from "./RegistrationStepper";

const RegistrationFormWrapper = () => {
  const { step } = useRegistration();
  const [submitted, setSubmitted] = useState(false);

  // ✅ Step renderer
  const renderStep = () => {
    if (submitted) {
      return (
        <div className="flex flex-col justify-center items-center mt-16 text-center">
          <h2 className="text-4xl font-semibold text-green-600 mb-4">
            🎉 Registration Successful!
          </h2>
          <p className="text-gray-700 text-lg max-w-xl">
            Thank you for completing your church membership registration.
            Your details have been successfully submitted and will be reviewed shortly.
          </p>
        </div>
      );
    }

    switch (step) {
      case 1:
        return <Step1PersonalInfo />;
      case 2:
        return <Step2ContactInfo />;
      case 3:
        return <Step3MembershipInfo />;
      case 4:
        return <Step4EducationInfo />;
      case 5:
        return <Step5SkillsInfo />;
      case 6:
        return <Step6HealthWelfareInfo />;
      case 7:
        return <Step7ReviewSubmit onSuccess={() => setSubmitted(true)} />; // 👈 pass success handler
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-10">
      {/* Stepper */}
      {!submitted && (
        <div className="max-w-5xl mx-auto mb-10">
          <RegistrationStepper />
        </div>
      )}

      {/* Step Content */}
      <div className="max-w-6xl mx-auto">{renderStep()}</div>
    </div>
  );
};

export default RegistrationFormWrapper;
