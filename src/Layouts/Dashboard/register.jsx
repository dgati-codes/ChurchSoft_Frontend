
import React from 'react';
import { RegistrationProvider } from '../../features/auth/Components/context/RegistrationContext';
import RegistrationFormWrapper from '../../features/auth/Components/registration/wrapper';

function Register() {
  return (
    <>
    <RegistrationProvider>
      <RegistrationFormWrapper />
    </RegistrationProvider>
    </>
  );
}

export default Register;
