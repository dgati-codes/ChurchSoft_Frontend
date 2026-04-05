import axiosInstance from "../axiosInstance";

// ===============================
// CREATE OR UPDATE COUNTRY SETUP
// ===============================
export const createOrUpdateCountry = async (payload) => {
  return await axiosInstance.post("/country-setup", payload);
};

// ===============================
// IMPORT CSV (MULTIPART)
// ===============================
export const importCountryCsv = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return await axiosInstance.post("/country-setup/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ===============================
// FETCH ALL HIERARCHIES
// ===============================
export const fetchAllHierarchies = async () => {
  const res = await axiosInstance.get("/country-setup/hierarchy");
  return res.data;
};

// ===============================
// FETCH BY COUNTRY NAME
// ===============================
export const fetchHierarchyByCountry = async (countryName) => {
  const res = await axiosInstance.get(
    `/country-setup/hierarchy/${countryName}`,
  );
  return res.data;
};

// ===============================
// FETCH COUNTRIES
// ===============================
export const fetchCountries = async () => {
  const res = await axiosInstance.get("/country-setup/countries");
  return res.data;
};

// ===============================
// FETCH PARENTS BY COUNTRY
// ===============================
export const fetchParentsByCountry = async (countryName) => {
  const res = await axiosInstance.get(
    `/country-setup/countries/parents/${countryName}`,
  );
  return res.data;
};

// ===============================
// FETCH CHILDREN BY PARENT
// ===============================
export const fetchChildrenByParent = async (parentName) => {
  const res = await axiosInstance.get(`/country-setup/children/${parentName}`);
  return res.data;
};

// ===============================
// FETCH GRANDCHILDREN BY CHILD
// ===============================
export const fetchGrandChildrenByChild = async (childName) => {
  const res = await axiosInstance.get(
    `/country-setup/grandchildren/${childName}`,
  );
  return res.data;
};

// ===============================
// DELETE COUNTRY
// ===============================
export const deleteCountry = async (countryName) => {
  return await axiosInstance.delete(`/country-setup/name/${countryName}`);
};

// Delete a country
export const deleteCountryBYId = async (id) => {
  const res = await axiosInstance.delete(`country-setup/${id}`);
  return res.data;
};
