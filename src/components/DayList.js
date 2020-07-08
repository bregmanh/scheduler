import React from "react";
import DayListItem from "components/DayListItem";

//const classNames = require('classnames');


export default function DayList(props) {

  const items = props.days.map((day, index) => 
    <DayListItem key={index} name={day.name} spots={day.spots} selected={day.name === props.day} setDay={props.setDay} /> 
);

  return (
    <ul>
      {items}
    </ul>
  );
}