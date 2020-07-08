export function getAppointmentsForDay(state, day) {
  const passedDay = day;
  const filteredDay = state.days.filter(day => day.name === passedDay);
  const appointmentArr = [];
  if (filteredDay && filteredDay.length > 0) {
    for (let appointment in state.appointments) {

      if (filteredDay[0].appointments.includes(Number(appointment))) {
        appointmentArr.push(state.appointments[appointment]);
      }
    }

    return appointmentArr;
  } else {
    return [];
  }
}