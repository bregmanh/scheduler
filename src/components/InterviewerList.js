import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";



export default function InterviewerList(props) {
  const items = props.interviewers.map(item => (

    <InterviewerListItem
      id={item.id}
      name={item.name}
      avatar={item.avatar}
      setInterviewer={(event) => props.setInterviewer(item.id)}
      selected={props.interviewer === item.id}

    />
  ))

  return (
    
    <section className="interviewers__header" >
      <h4>Interviewers</h4>

      <ul className="interviewers__list">
        {items}
      </ul >
    </section>
    
  );
}