import axiosInstance from "./axiosInstance";

export const attendanceService = {
  // Create new attendance record
  createAttendance: async (attendanceData) => {
    try {
      const response = await axiosInstance.post('/attendance', attendanceData);
      return response.data;
    } catch (error) {
      console.error('Error creating attendance record:', error);
      throw error;
    }
  },

  // Update attendance record (for edit)
  updateAttendance: async (id, attendanceData) => {
    try {
      const response = await axiosInstance.put(`/attendance/${id}`, attendanceData);
      return response.data;
    } catch (error) {
      console.error('Error updating attendance record:', error);
      throw error;
    }
  },

  // Get attendance record by ID
  getAttendanceById: async (id) => {
    try {
      const response = await axiosInstance.get(`/attendance/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance record:', error);
      throw error;
    }
  },

  // Delete attendance record
  deleteAttendance: async (id) => {
    try {
      const response = await axiosInstance.delete(`/attendance/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting attendance record:', error);
      throw error;
    }
  },

  // Get attendance metrics with filters and pagination (new integrated method)
  getAttendanceMetrics: async (region = 'ALL', serviceType = 'ALL', assembly = 'ALL', district = 'ALL', page = 0, size = 10) => {
    try {
      const params = new URLSearchParams({
        region,
        serviceType,
        assembly,
        district,
        page: page.toString(),
        size: size.toString(),
      });
      const response = await axiosInstance.get(`/attendance/metrics?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance metrics:', error);
      throw error;
    }
  },

  // Legacy paginated (without metrics; keep for compatibility)
  getPaginatedAttendance: async (page = 0, size = 10, sortBy = 'serviceDate', direction = 'des') => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sortBy,
        direction,
      });
      const response = await axiosInstance.get(`/attendance?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching paginated attendance records:', error);
      throw error;
    }
  },

  // Get all attendance records (legacy, non-paginated)
  getAllAttendance: async () => {
    try {
      const response = await axiosInstance.get('/attendance');
      return response.data;
    } catch (error) {
      console.error('Error fetching all attendance records:', error);
      throw error;
    }
  }
};