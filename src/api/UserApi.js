import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const userLogin = async (email, password) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const userRegister = async (name, email, password, phoneNumber) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/signup`,
      { name, email, password, phoneNumber },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMembershipPlans = async () => {
  try {
    const result = await axios.get(`${BASE_URL}/getMemberships`);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const bookingPlan = async (planId, userId) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/bookingPlan`,
      { planId, userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // console.log('result', result);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBookings = async (userId) => {
  try {
    const result = await axios.get(`${BASE_URL}/getBookings/${userId}`);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const result = await axios.get(`${BASE_URL}/profile/${userId}`);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
