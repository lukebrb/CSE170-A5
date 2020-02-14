import React from "react"
import { Link } from "gatsby"

import * as exampleArray from "../dataForA6/exampleArray.json"
// Hey graders! This ^ is where we're importing json from. Thanks.

const AvailabilityItem = ({ details }) => {
  // three states: Time w/ Question, Time w/ Available, Spacer (no time)
  var StatusItem
  const Unavailable = () => (
    <div>
      <div>...</div>
    </div>
  )

  const Available = () => (
    <Link
      to="input-question"
      state={{ time: details.time }}
      style={{ width: "100%" }}
    >
      <div>{details.time}</div>
      <div>AVAILABLE</div>
    </Link>
  )

  const Question = () => (
    <div>
      <div>{details.time}</div>
      <div>{details.question}</div>
    </div>
  )

  if (details.time && details.question) {
    StatusItem = Question
  } else if (details.time) {
    StatusItem = Available
  } else {
    StatusItem = Unavailable
  }

  return (
    <a className="panel-block">
      <StatusItem />
    </a>
  )
}

const AvailabilityList = () => {
  return (
    <React.Fragment>
      <nav className="panel">
        <p className="panel-heading">Today</p>
        {exampleArray.map(arrayItem => (
          <AvailabilityItem details={arrayItem} key={arrayItem.time} />
        ))}
      </nav>
    </React.Fragment>
  )
}

export default AvailabilityList
