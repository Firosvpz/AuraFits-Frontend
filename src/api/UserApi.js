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

export const userRegister = async (name, email, password) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/signup`,
      { name, email, password },
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
