import { RegistrationProvider } from "../registration-context/RegistrationContext";
import RegistrationFormWrapper from "./registration-steps/wrapper";

function Register({ prefill }) {
  return (
    <RegistrationProvider prefill={prefill}>
      <RegistrationFormWrapper />
    </RegistrationProvider>
  );
}

export default Register;