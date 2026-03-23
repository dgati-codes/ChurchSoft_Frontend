// hooks/useStep1PersonalInfo.js
import { useState, useEffect } from "react";
import { useRegistration } from "../registration-context/RegistrationContext";
import {
  useCountries,
  useJurisdictions,
  useDistricts,
  useAssemblies,
} from "./useRegistrationHooks.js"; // adjust path

// ENUM maps
const genderMap = {
  Male: "MALE",
  Female: "FEMALE",
  Other: "OTHER",
};

const maritalStatusMap = {
  Single: "SINGLE",
  Married: "MARRIED",
  Divorced: "DIVORCED",
  Widowed: "WIDOWED",
};

const idTypeMap = {
  PASSPORT: "PASSPORT",
  NATIONAL_ID: "NATIONAL_ID",
  DRIVERS_LICENSE: "DRIVERS_LICENSE",
  VOTERS_ID: "VOTERS_ID",
  OTHER: "OTHER",
};

export const useStep1PersonalInfo = () => {
  const { formData, updateForm, nextStep } = useRegistration();

  const [languagesInput, setLanguagesInput] = useState("");

  // 🌍 Hierarchy hooks (progressive loading)
  const { data: countries = [] } = useCountries();

  const selectedCountry = countries.find(
    (c) => c.countryName === formData.nationality
  );

  const { data: jurisdictions = [] } = useJurisdictions(
    selectedCountry?.id
  );

  const selectedJurisdiction = jurisdictions.find(
    (j) => j.name === formData.jurisdiction
  );

  const { data: districts = [] } = useDistricts(
    selectedJurisdiction?.id
  );

  const selectedDistrict = districts.find(
    (d) => d.name === formData.district
  );

  const { data: assemblies = [] } = useAssemblies(
    selectedDistrict?.id
  );

  // 🔹 Sync languages (array → string)
  useEffect(() => {
    if (formData.preferredLanguages) {
      setLanguagesInput(formData.preferredLanguages.join(", "));
    }
  }, [formData.preferredLanguages]);

  // 🔹 Generic change
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateForm({ [name]: value });
  };

  // 🔹 Enum handlers
  const handleGenderChange = (e) =>
    updateForm({ gender: genderMap[e.target.value] || "" });

  const handleMaritalStatusChange = (e) =>
    updateForm({
      maritalStatus: maritalStatusMap[e.target.value] || "",
    });

  const handleIdTypeChange = (e) =>
    updateForm({
      identificationType: idTypeMap[e.target.value] || "",
    });

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const languagesArray = languagesInput
      .split(",")
      .map((l) => l.trim().toUpperCase())
      .filter(Boolean);

    updateForm({
      ...formData,
      preferredLanguages: languagesArray,
    });

    nextStep();
  };

  return {
    formData,
    languagesInput,
    setLanguagesInput,

    // handlers
    handleChange,
    handleGenderChange,
    handleMaritalStatusChange,
    handleIdTypeChange,
    handleSubmit,

    // hierarchy data
    countries,
    jurisdictions,
    districts,
    assemblies,
  };
};