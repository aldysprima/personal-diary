import create from "zustand";
import ApiRepository from "../repository/api";

const apiRepository = new ApiRepository();

export const authStore = create((set) => ({
  isLoading: false,
  user: {},
  login: async (data, navigate, toast) => {
    set({ isLoading: true });
    try {
      const response = await ApiRepository.login(data);
      set({ user: await response.data });
      const token = await response.headers.authorization.split(" ")[1];
      localStorage.setItem("userToken", token);
      set({ isLoading: false });
      navigate("/job-list");
      toast.success("Login Succed");
    } catch (error) {
      toast.error(error?.response?.data);
      set({ isLoading: false });
    }
  },
  register: async (data, toast, navigate) => {
    set({ isLoading: true });
    try {
      await apiRepository.register(data);
      set({ isLoading: false });
      toast.success("Register Successful");
      navigate("/");
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  },
}));
