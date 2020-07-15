import React from "react";
import "components/InterviewerListItem.scss";
import "components/InterviewerList.js";

const classNames = require("classnames");

export default function InterviewerListItem(props) {
  const itemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  return (
    <li
      className={itemClass}
      onClick={props.setInterviewer}
      data-testid="interviewer"
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
