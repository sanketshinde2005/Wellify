import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance'; // adjust path if needed

const useDoctorsStore = create((set) => ({
    doctors: [],
    loading: false,
    error: null,

    fetchAllDoctors: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.post('/alldoctors');
            set({ doctors: response.data, loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message || 'Failed to fetch doctors', loading: false });
        }
    },
}));

export default useDoctorsStore;
