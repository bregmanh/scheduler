export function getAppointmentsForDay(state, day) {
  const passedDay = day;
  const filteredDay = state.days.filter((day) => day.name === passedDay);
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

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: { ...state.interviewers[interview.interviewer] },
  };
}

export function getInterviewersForDay(state, day) {
  const passedDay = day;
  const filteredDay = state.days.filter((day) => day.name === passedDay);
  const interviewerArr = [];
  if (filteredDay && filteredDay.length > 0) {
    filteredDay[0].interviewers.map((interviewer) => {
      return interviewerArr.push(state.interviewers[Number(interviewer)]);
    });

    return interviewerArr;
  } else {
    return [];
  }
}
