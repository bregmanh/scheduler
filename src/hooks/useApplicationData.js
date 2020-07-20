import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const updateDaySpots = function (day, newState) {
    let spots = 0;
    let appointment_arr = day.appointments;
    console.log("day",day)
    for (let app_id of appointment_arr) {
      if (newState.appointments[app_id].interview === null) {
        spots += 1;
      }
    }
    const newDay = { ...day, spots: spots };
    return newDay;
  };

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        const newStateAppointments = {...state, appointments}
        const newDays = [...state.days].map(day => updateDaySpots(day, newStateAppointments))
        const newState = { ...newStateAppointments, days: newDays }
        setState(newState)
    

      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`)

      .then(() => {
        const newStateAppointments = {...state, appointments}
        const newDays = [...state.days].map(day => updateDaySpots(day, newStateAppointments))
        const newState = { ...newStateAppointments, days: newDays }
        setState(newState)
      });
  }
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [daysResponse, appointmentsResponse, interviewersResponse] = all;
      setState((prev) => ({
        ...prev,
        days: daysResponse.data,
        appointments: appointmentsResponse.data,
        interviewers: interviewersResponse.data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
