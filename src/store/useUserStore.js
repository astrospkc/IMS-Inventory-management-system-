import axios from "axios";
import { create } from "zustand";

// user store
const useUserStore = create((set) => ({
  isAuthenticate: false,
  setIsAuthenticate: (isAuthenticate) =>
    set({ isAuthenticate: isAuthenticate }),
  // fetch user
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/getuser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      set({ loading: false, isAuthenticate: true });
      return data;
    } catch (error) {
      console.log("some error occurred while fetching user");
      set({ loading: false, error: error });
    }
  },

  createUser: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/createuser`,
        data
      );

      const user_data = res.data;
      localStorage.setItem("token", user_data.authtoken);
      set({ loading: false, isAuthenticate: true });
      return user_data;
    } catch (error) {
      console.log("some error occurred while creating user");
      alert("User with this email already exists or check your credentials");
      set({ loading: false, error: error });
    }
  },

  loginUser: async (data) => {
    set({ loading: true, error: null });
    console.log("data: ", data);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res: ", res);

      const user_data = res.data;
      console.log(user_data);
      localStorage.setItem("token", user_data.authtoken);
      set({ loading: false, isAuthenticate: true });
      return user_data;
    } catch (error) {
      console.log("some error occurred while login user");
      alert("Invalid Credentials");
      set({ loading: false, error: error });
    }
  },
}));

export default useUserStore;
