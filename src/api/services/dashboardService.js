import axiosInstance from "../axiosInstance";
export const getAssembliesByCountry = (country) => {
  return axiosInstance.get(
    `/country-setup/local-assemblies-by/${country}`
  );
};
export const getMinistryLeadersByAssembly = (assembly) => {
  return axiosInstance.get(
    `/members/ministry-leaders/${assembly}`
  );
};
export const getNewMembers = async () => {
  const response = await axiosInstance.get("/members/new-members");
  return response.data;
};
export const getBirthdaysThisWeek = async () => {
  const response = await axiosInstance.get("/members/birthdays-this-week");
  return response.data;
};
export const getTotalMembers = async () => {
  const response = await axiosInstance.get("/members/total-members");
  return response.data;
}; 