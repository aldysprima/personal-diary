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
  total_data: 0,
  fetchNotes: async (keyword, page = 1) => {
    set({ isLoading: true });
    try {
      const response = await Axios.get(
        `/diary?search=${keyword}&page=${page}`,
        {
          headers: generateHeadersConfig(),
        }
      );
      set({
        notes: await response.data.data,
        total_data: await response.data.total_data,
        isLoading: false,
      });
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
  updateNotes: async (noteId, data, setEdit, fetchNotesById, setData) => {
    set({ isLoading: true });
    try {
      await Axios.put(`/diary/${noteId}`, data, {
        headers: generateHeadersConfig(),
      });
      set({ isLoading: false });
      toast.success("Successfully Updated");
      setEdit(false);
      fetchNotesById(noteId, setData);
    } catch (error) {
      set({ isLoading: false });
      toast.error(
        error?.response?.data?.message ||
          "Oops something wrong. Dont worry, we will fix it"
      );
    }
  },
  postNotes: async (data, setOpen, fetchNotes) => {
    set({ isLoading: true });
    try {
      await Axios.post("/diary", data, {
        headers: generateHeadersConfig(),
      });
      set({ isLoading: false });
      fetchNotes();
      setOpen(false);
      toast.success("Diary Note added successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Oops something wrong. Dont worry, we will fix it"
      );
      set({ isLoading: false });
    }
  },
  archieveNotes: async (id, setOpen, fetchNotes) => {
    set({ isLoading: true });
    try {
      await Axios.put(`/diary/${id}/archieve`, "", {
        headers: generateHeadersConfig(),
      });
      set({ isLoading: false });
      toast.success("Diary Notes Archieved Successfully");
      setOpen(false);
      fetchNotes();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Oops something wrong. Dont worry, we will fix it"
      );
      set({ isLoading: false });
    }
  },
  unarchieveNotes: async (id) => {
    set({ isLoading: true });
    try {
      await Axios.put(`/diary/${id}/unarchieve`, data, {
        headers: generateHeadersConfig(),
      });
      set({ isLoading: false });
      toast.success("Diary Notes unarchieved Successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Oops something wrong. Dont worry, we will fix it"
      );
      set({ isLoading: false });
    }
  },
}));
