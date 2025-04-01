import api from "./services";

export const login = async (phone, password) => {
  try {
    const response = await api.post("/user/login", { phone, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Đăng nhập thất bại");
    }
  }
};
export const Register = async (phone, password, email, full_name) => {
  try { 
    const response = await api.post("/user", { phone, password, email, full_name });
    return response.data;
  }
  catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Đăng ký thất bại");
    }
  }
  
};

export const getProfile = async () => {
  try {
    const response = await api.get("/user/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile", error);
    throw error;
  }
}

export const getUsersById = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID", error);
    throw error;
  }
}

export default {
  login,
  Register,
  getProfile,
  getUsersById
};
