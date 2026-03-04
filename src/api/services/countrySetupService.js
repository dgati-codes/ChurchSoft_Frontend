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
  return await axiosInstance.get("/country-setup/hierarchy");
};

// ===============================
// FETCH BY COUNTRY NAME
// ===============================
export const fetchHierarchyByCountry = async (countryName) => {
  return await axiosInstance.get(
    `/country-setup/hierarchy/${countryName}`
  );
};

// ===============================
// FETCH COUNTRIES
// ===============================
export const fetchCountries = async () => {
  return await axiosInstance.get("/country-setup/countries");
};

// ===============================
// FETCH PARENTS BY COUNTRY
// ===============================
export const fetchParentsByCountry = async (countryName) => {
  return await axiosInstance.get(
    `/country-setup/countries/parents/${countryName}`
  );
};

// ===============================
// FETCH CHILDREN BY PARENT
// ===============================
export const fetchChildrenByParent = async (parentName) => {
  return await axiosInstance.get(
    `/country-setup/children/${parentName}`
  );
};

// ===============================
// FETCH GRANDCHILDREN BY CHILD
// ===============================
export const fetchGrandChildrenByChild = async (childName) => {
  return await axiosInstance.get(
    `/country-setup/grandchildren/${childName}`
  );
};


// ===============================
// DELETE COUNTRY
// ===============================
export const deleteCountry = async (countryName) => {
  return await axiosInstance.delete(`/country-setup/${countryName}`);
};