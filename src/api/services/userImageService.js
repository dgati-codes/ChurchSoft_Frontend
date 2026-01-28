import axios from "axios";

const BASE_URL = "https://churchsoft-backend.onrender.com/church-soft/v1.0/images";

/* ================== GET IMAGE BY ID ================== */
export const getImageById = async (id) => {
  if (!id) return null;

  try {
    const res = await axios.get(`${BASE_URL}/${id}`, {
      responseType: "blob", // fetch binary
      headers: { Accept: "image/*" },
    });

    // Convert blob to object URL for preview
    return URL.createObjectURL(res.data);
  } catch (error) {
    console.error(`Failed to fetch image with id ${id}:`, error.response?.data || error.message);
    return null;
  }
};

/* ================== UPLOAD IMAGE ================== */
export const uploadImage = async (file) => {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("image", file); // ✅ Backend expects 'image'

  try {
    const response = await axios.post(BASE_URL, formData, {
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Image uploaded:", response.data);
    return response.data; // { id: imageId, ... }
  } catch (error) {
    console.error("Upload Image Error:", error.response?.data || error.message);
    throw error;
  }
};

/* ================== ASSIGN IMAGE TO USER ================== */
export const assignImageToUser = async (userId, imageId) => {
  if (!userId || !imageId) throw new Error("UserId and ImageId are required");

  try {
    const url = `${BASE_URL}/assign-image/USER/${userId}/${imageId}`;
    const response = await axios.post(url);
    console.log(`Image ${imageId} assigned to user ${userId}`, response.data);
    return response.data;
  } catch (error) {
    console.error("Assign Image Error:", error.response?.data || error.message);
    throw error;
  }
  
};
