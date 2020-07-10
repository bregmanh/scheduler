import React, { useEffect } from 'react';

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";

import useVisualMode from '../../hooks/useVisualMode.js'


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // useEffect(() => {
  //   if (props.interview) {
  //     transition(SHOW, true)
  //   } else {
  //     transition(EMPTY)
  //   }
  // }, [props.interview, transition])

  return (<article className="appointment"><Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        id={props.id}
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel ={()=> back()}/>}
    </article>)
}