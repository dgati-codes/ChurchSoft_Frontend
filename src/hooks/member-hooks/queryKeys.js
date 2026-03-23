// /queryKeys.js
export const queryKeys = {
  countries: ["countries"],
  jurisdictions: (countryId) => ["jurisdictions", countryId],
  districts: (jurisdictionId) => ["districts", jurisdictionId],
  assemblies: (districtId) => ["assemblies", districtId],
};