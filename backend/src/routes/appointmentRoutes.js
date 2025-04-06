import express from 'express';

import { addAppointment, getAppointmentsForPatient, getDoctorAppointments } from '../controllers/appointmentController.js';
import { protectroute } from '../middleware/auth.middleware.js';

const appointmentRoute = express.Router();

appointmentRoute.use(protectroute);
appointmentRoute.post('/add', addAppointment);
appointmentRoute.get('/patientappointments', getAppointmentsForPatient);
appointmentRoute.get('/doctorsappointments', getDoctorAppointments);

export default appointmentRoute;