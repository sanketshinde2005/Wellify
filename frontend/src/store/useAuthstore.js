import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthstore = create((set, get) => ({
    authUser: null,
    allUsers: [],
    isregistering: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    isloadingUsers: false,

    checkAuth: async () => {
        try {
            const result = await axiosInstance.get("/auth/check");
            set({ authUser: result.data });
        } catch (error) {
            console.log("Error in checkAuth: ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isregistering: true });
        try {
            const result = await axiosInstance.post("/auth/register", data);
            set({ authUser: result.data });
            toast.success("Account Created Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            set({ isregistering: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const result = await axiosInstance.post("/auth/login", data);
            set({ authUser: result.data });
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    update: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const result = await axiosInstance.put("/auth/update", data);
            set({ authUser: result.data });
            toast.success("Profile Updated Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    deleteUser: async () => {
        try {
            await axiosInstance.delete("/auth/delete");
            set({ authUser: null });
            toast.success("Account Deleted Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Account deletion failed");
        }
    },
    getallusers: async () => {
        set({ isloadingUsers: true });
        try {
            const result = await axiosInstance.get("/allusers");
            set({ allUsers: result.data });
            console.log(result.data);
        } catch (error) {
            console.log("Error in getAllUsers: ", error.message);
            toast.error(error.response?.data?.message || "alluser fetch failed");
        }
        finally {
            set({ isloadingUsers: false })
        }
    }
}));
