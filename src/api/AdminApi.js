import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const adminLogin = async (email, password) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/admin/adminLogin`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("ressss", result);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addPlan = async (planData) => {
  try {
    const result = await axios.post(`${BASE_URL}/admin/addPlan`, planData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result;
  } catch (error) {
    console.error("Error adding plan:", error);
    throw error;
  }
};

export const getPlans = async () => {
  try {
    const result = axios.get(`${BASE_URL}/admin/getPlans`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const result = await axios.get(`${BASE_URL}/admin/getUsers`);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBookings = async () => {
  try {
    const result = await axios.get(`${BASE_URL}/admin/getBookings`);
    console.log("result", result);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/admin/updateBookingStatus`,
      { bookingId, status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

export const dashboardStats = async () => {
  try {
    const result = await axios.get(`${BASE_URL}/admin/dashboard`);
    return result;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
}

export const editPlan = async(planId,updatedData)=> {
  try {
    // console.log('Updating plan with ID:', planId, 'and data:', updatedData);
    
    const result = await axios.patch(`${BASE_URL}/admin/editPlan/${planId}`,updatedData)
    return result
  } catch (error) {
    console.error('Error while updating plan',error);
    throw error
  }
}

export const deletePlan = async (planId) => {
  try {
    const result = await axios.delete(`${BASE_URL}/admin/deletePlan/${planId}`);
    return result;
  } catch (error) {
    console.error("Error deleting plan:", error);
    throw error;
  }
};