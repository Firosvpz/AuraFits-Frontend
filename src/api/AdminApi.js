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
    const result = await axios.post(
      `${BASE_URL}/admin/addPlan`,
      planData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result;
  } catch (error) {
    console.error("Error adding plan:", error);
    throw error;
  }
}

export const getPlans = async () => { 
  try {
    const result = axios.get(`${BASE_URL}/admin/getPlans`)
    return result;
  } catch (error) {
    console.log(error);
  }
}

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
    console.log('result', result);
    
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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
}