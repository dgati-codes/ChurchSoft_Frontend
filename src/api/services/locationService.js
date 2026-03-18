import axiosInstance from "../axiosInstance";

const API = "https://churchsoft-backend.onrender.com/church-soft/v1.0";

export const getCountries = async () => {
  const { data } = await axiosInstance.get("/country-setup/countries");
  console.log(data);
  return data;
};

export const getJurisdictions = async (countryId) => {
  const { data } = await axiosInstance.get(
    `/jurisdictions?countryId=${countryId}`,
  );
  console.log(data);

  return data;
};

export const getDistricts = async (jurisdictionId) => {
  const { data } = await axiosInstance.get(
    `/districts?jurisdictionId=${jurisdictionId}`,
  );
  console.log(data);

  return data;
};

export const getAssemblies = async (districtId) => {
  const { data } = await axiosInstance.get(
    `/assemblies?districtId=${districtId}`,
  );
  console.log(data);

  return data;
};
