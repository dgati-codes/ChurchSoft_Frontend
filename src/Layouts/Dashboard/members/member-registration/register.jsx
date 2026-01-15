import { RegistrationProvider } from "../registration-context/RegistrationContext";
import RegistrationFormWrapper from "./registration-steps/wrapper";
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
