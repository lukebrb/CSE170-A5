import React from "react"

const exampleArray = [
  { time: "1:00", question: "Why do my feet hurt?" },
  { time: "1:15", question: "How do I get on..." },
  { time: "1:30", question: "How do I..." },
  { time: "1:45", question: null },
  { time: null, question: null },
  { time: "3:00", question: null },
  { time: "3:15", question: "Is there a better..." },
  { time: "3:30", question: "Is there a better..." },
  { time: "3:45", question: "Is there a better..." },
  { time: "4:00", question: null },
  { time: "4:15", question: "Is there a better..." },
  { time: "4:30", question: "Is there a better..." },
]

const AvailabilityItem = ({ details }) => {
  // three states: Time w/ Question, Time w/ Available, Spacer (no time)
  var StatusItem
  const Unavailable = () => (
    <div>
      <h1>BLANK</h1>
    </div>
  )

  const Available = () => (
    <div>
      <div>{details.time}</div>
      <div>AVAILABLE</div>
    </div>
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
