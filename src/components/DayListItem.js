import React from "react";
import "components/DayListItem.scss";

const classNames = require("classnames");

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  const spotsRemaining = props.spots;
  return (
    <li
      data-testid="day"
      onClick={() => props.setDay(props.name)}
      className={dayClass}
    >
      <h2 className="text--regular">{props.name}</h2>
      {spotsRemaining === 0 ? (
        <h3 className="text--light">no spots remaining</h3>
      ) : spotsRemaining === 1 ? (
        <h3 className="text--light">{spotsRemaining} spot remaining</h3>
      ) : (
        <h3 className="text--light">{spotsRemaining} spots remaining</h3>
      )}
    </li>
  );
}
