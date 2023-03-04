import create from "zustand";
// import ApiRepository from "../repository/api";
import { toast } from "react-toastify";
import { generateHeadersConfig } from "../utils/headerConfig";

// const apiRepository = new ApiRepository();

import Axios from "axios";

export const authStore = create((set) => ({
  isLoading: false,
  user: {},
  login: async (data, navigate, toast) => {
    set({ isLoading: true });
    try {
      const response = await apiRepository.login(data);
      console.log(response);
      set({ user: await response.data.user, isLoading: false });
      const token = await response.data.access_token;
      localStorage.setItem("userToken", token);
      navigate("/note-list");
      toast.success("Login Succeed");
    } catch (error) {
      toast.error(error?.response?.data?.message);
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

export const noteStore = create((set) => ({
  isLoading: false,
  notes: [],
  note: {},
  fetchNotes: async (keyword) => {
    set({ isLoading: true });
    try {
      const response = await Axios.get(`/diary?search=${keyword}`, {
        headers: generateHeadersConfig(),
      });
      set({ notes: await response.data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error(
        error?.response?.data?.message ||
          "Oops something wrong. Dont worry, we will fix it"
      );
    }
  },
  fetchNotesById: async (id, setData) => {
    set({ isLoading: true });
    try {
      const response = await Axios.get(`/diary/${id}`, {
        headers: generateHeadersConfig(),
      });
      set({ isLoading: false });
      setData(await response.data);
    } catch (error) {
      set({ isLoading: false });
      toast.error(
        error?.response?.data?.message ||
          "Oops something wrong. Dont worry, we will fix it"
      );
    }
  },
  updateNotes: async (noteId, data, setEdit) => {
    set({ isLoading: true });
    try {
      await Axios.put(`/diary/${noteId}`, data, {
        headers: generateHeadersConfig(),
      });
      set({ isLoading: false });
      toast.success("Successfully Updated");
      setEdit(false);
    } catch (error) {
      set({ isLoading: false });
      toast.error(
        error?.response?.data?.message ||
          "Oops something wrong. Dont worry, we will fix it"
      );
    }
  },
  postNotes: async (data) => {
    set({ isLoading: true });
    try {
      await Axios.post("/diary", data, {
        headers: generateHeadersConfig(),
      });
      set({ isLoading: false });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Oops something wrong. Dont worry, we will fix it"
      );
      set({ isLoading: false });
    }
  },
}));
