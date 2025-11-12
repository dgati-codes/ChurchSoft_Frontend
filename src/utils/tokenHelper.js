

export const getAccessToken = () => localStorage.getItem("accessToken");

export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const clearAccessToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};
