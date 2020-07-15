import { useState, useEffect } from "react";
import { configureActions } from "@storybook/addon-actions/dist/preview";
import axios from "axios";
axios.defaults.baseURL = `http://localhost:8001`;

export default function useVisualMode(initial, replace = false) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const numberSpots = function (currentDay) {
    for (let d of state.days) {
      if (d.name === currentDay) {
        return d.spots;
      }
    }
  };

  const getDayId = (appointmentId) => {
    if (appointmentId / 5 <= 1) {
      return 0;
    } else if (appointmentId / 5 <= 2) {
      return 1;
    } else if (appointmentId / 5 <= 3) {
      return 2;
    } else if (appointmentId / 5 <= 4) {
      return 3;
    } else {
      return 4;
    }
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
        let spotCounter = numberSpots(state.day) - 1;

        const dayChange = {
          ...state.days[getDayId(id)],
          spots: spotCounter,
        };
        state.days[getDayId(id)] = dayChange;

        setState({
          ...state,
          appointments,
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...null },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`)

      .then(() => {
        let spotCounter = numberSpots(state.day) + 1;

        const dayChange = {
          ...state.days[getDayId(id)],
          spots: spotCounter,
        };
        state.days[getDayId(id)] = dayChange;
        setState({
          ...state,
          appointments,
        });
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
