import { create } from 'zustand';
// import axiosInstance from '../utils/axiosInstance'; // adjust path if needed
import { axiosInstance } from '../lib/axios';

const useDoctorsStore = create((set) => ({
    doctors: [],
    loading: false,
    error: null,

    fetchAllDoctors: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.get('/users/doctors');
            // console.log('Fetched doctors:', response.data); // Debugging line
            set({ doctors: response.data, loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message || 'Failed to fetch doctors', loading: false });
        }
    },
}));

export default useDoctorsStore;
