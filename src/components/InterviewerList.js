import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    // You can declare that a prop is a specific JS type. By default, these
    // are all optional.
    selected: PropTypes.number,
    setInterviewer: PropTypes.func.isRequired,
  };
  const items = props.interviewers.map((item) => (
    <InterviewerListItem
      id={item.id}
      name={item.name}
      avatar={item.avatar}
      setInterviewer={(event) => props.setInterviewer(item.id)}
      selected={props.interviewer === item.id}
      key={item.id}
    />
  ));

  return (
    <section className="interviewers__header">
      <h4>Interviewers</h4>
      <ul className="interviewers__list">{items}</ul>
    </section>
  );
}
