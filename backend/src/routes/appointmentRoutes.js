import express from 'express';

import { addAppointment, getPatientAppointments, getDoctorAppointments } from '../controllers/apointmentController.js';
import { protectroute } from '../middleware/auth.middleware.js';

const appointmentRoute = express.Router();

appointmentRoute.use(protectroute);
appointmentRoute.post('/add', addAppointment);
appointmentRoute.get('/patientappointments', getPatientAppointments);
appointmentRoute.get('/doctorsappointments', getDoctorAppointments);

export default appointmentRoute;