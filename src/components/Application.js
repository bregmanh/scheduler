import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "./Application.scss";

const {getAppointmentsForDay} = require('../helpers/selectors')
const axios = require('axios');


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const appointments = getAppointmentsForDay(state, state.day)
  useEffect(() => {
    
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments')
    ]).then((all) => {
      const [daysResponse, appointmentsResponse] = all;

      setState(prev => ({ days: daysResponse.data, appointments: appointmentsResponse.data }));
      
    
    
      console.log(daysResponse, appointmentsResponse);
    });


      
    
    

    
  }, [])


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
        {appointments.map(appointment => (

          <Appointment
            id={appointment.id}
            time={appointment.time}
            interview={appointment.interview}

          />
        ))}
      </section>
    </main>
  );
}
