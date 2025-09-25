import React from 'react';
import { useRegistration } from "../context/RegistrationContext";

const steps = [
  'Personal Info',
  'Contact Info',
  'Membership Info',
  'Education Info',
  'Skills & Occupation',
  'Welfare & Health',
  'Review & Submit',
];

const RegistrationStepper = () => {
  const { step } = useRegistration();

  return (
    <div className="flex items-center justify-between max-w-4xl mx-auto mb-8 px-2 overflow-x-auto">
      {steps.map((label, index) => {
        const isActive = step === index + 1;
        const isCompleted = step > index + 1;

        return (
          <div key={label} className="flex-1 flex items-center">
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'bg-white border-gray-300 text-black'
                }`}
              >
                
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                     
                  </svg>
                ) : (
                   isActive ? '•' 
                  : index + 1
                )}
              </div>
              <span
                className={`text-xs mt-2 ${
                  isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                {label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-2 h-0.5 mb-6 bg-gray-300 mx-0.5" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RegistrationStepper;
