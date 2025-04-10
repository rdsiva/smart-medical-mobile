import { appointmentService } from '../../services/appointmentService';

// Action Types
export const FETCH_APPOINTMENTS_REQUEST = 'FETCH_APPOINTMENTS_REQUEST';
export const FETCH_APPOINTMENTS_SUCCESS = 'FETCH_APPOINTMENTS_SUCCESS';
export const FETCH_APPOINTMENTS_FAILURE = 'FETCH_APPOINTMENTS_FAILURE';

export const ADD_APPOINTMENT_REQUEST = 'ADD_APPOINTMENT_REQUEST';
export const ADD_APPOINTMENT_SUCCESS = 'ADD_APPOINTMENT_SUCCESS';
export const ADD_APPOINTMENT_FAILURE = 'ADD_APPOINTMENT_FAILURE';

export const UPDATE_APPOINTMENT_REQUEST = 'UPDATE_APPOINTMENT_REQUEST';
export const UPDATE_APPOINTMENT_SUCCESS = 'UPDATE_APPOINTMENT_SUCCESS';
export const UPDATE_APPOINTMENT_FAILURE = 'UPDATE_APPOINTMENT_FAILURE';

export const CANCEL_APPOINTMENT_REQUEST = 'CANCEL_APPOINTMENT_REQUEST';
export const CANCEL_APPOINTMENT_SUCCESS = 'CANCEL_APPOINTMENT_SUCCESS';
export const CANCEL_APPOINTMENT_FAILURE = 'CANCEL_APPOINTMENT_FAILURE';

// Action Creators
export const fetchAppointments = (fromDate, toDate) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_APPOINTMENTS_REQUEST });
    
    const appointments = await appointmentService.getAppointments(fromDate, toDate);
    
    dispatch({
      type: FETCH_APPOINTMENTS_SUCCESS,
      payload: appointments
    });
    
    return appointments;
  } catch (error) {
    dispatch({
      type: FETCH_APPOINTMENTS_FAILURE,
      payload: error.message
    });
    
    throw error;
  }
};

export const addAppointment = (appointmentData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_APPOINTMENT_REQUEST });
    
    const appointment = await appointmentService.scheduleAppointment(appointmentData);
    
    dispatch({
      type: ADD_APPOINTMENT_SUCCESS,
      payload: appointment
    });
    
    return appointment;
  } catch (error) {
    dispatch({
      type: ADD_APPOINTMENT_FAILURE,
      payload: error.message
    });
    
    throw error;
  }
};

export const updateAppointment = (id, appointmentData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_APPOINTMENT_REQUEST });
    
    const appointment = await appointmentService.updateAppointment(id, appointmentData);
    
    dispatch({
      type: UPDATE_APPOINTMENT_SUCCESS,
      payload: appointment
    });
    
    return appointment;
  } catch (error) {
    dispatch({
      type: UPDATE_APPOINTMENT_FAILURE,
      payload: error.message
    });
    
    throw error;
  }
};

export const cancelAppointment = (id) => async (dispatch) => {
  try {
    dispatch({ type: CANCEL_APPOINTMENT_REQUEST });
    
    await appointmentService.cancelAppointment(id);
    
    dispatch({
      type: CANCEL_APPOINTMENT_SUCCESS,
      payload: id
    });
    
    return id;
  } catch (error) {
    dispatch({
      type: CANCEL_APPOINTMENT_FAILURE,
      payload: error.message
    });
    
    throw error;
  }
};