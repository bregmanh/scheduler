import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "./Application.scss";

const { getAppointmentsForDay, getInterview, getInterviewersForDay } = require('../helpers/selectors')
const axios = require('axios');


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  //console.log("appoint", appointments)
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')

    ]).then((all) => {
      const [daysResponse, appointmentsResponse, interviewersResponse] = all;
      setState(prev => ({ ...prev, days: daysResponse.data, appointments: appointmentsResponse.data, interviewers: interviewersResponse.data }));
    });
  }, [])

  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers =getInterviewersForDay(state, state.day)
  return (
    <main className="layout">
      <section className="sidebar">

        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"><DayList days={state.days} day={state.day} setDay={setDay} /></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview)
          return <Appointment
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            key={appointment.id}
            interviewers = {interviewers}
          />
        })}
        <Appointment key="last" time="5pm"  />
      </section>
    </main>
  );
}
