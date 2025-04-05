import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorProfile from "../components/DoctorProfile";
import PatientProfile from "../components/PatientProfile";
import { useAuthstore } from "../store/useAuthstore";

export default function ProfilePage() {
    const { authUser } = useAuthstore();
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!authUser) {
            navigate('/');
        }
    }, [authUser, navigate]);

    // If not logged in and still on this page, show loading or redirect message
    if (!authUser) {
        return <div>Redirecting to login...</div>;
    }

    return (
        <div>
            {authUser.proffession == "doctor" && <DoctorProfile />}
            {authUser.proffession == "patient" && <PatientProfile />}
        </div>
    );
}