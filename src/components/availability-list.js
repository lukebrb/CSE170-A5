import React from "react"
import { Link } from "gatsby"
import { useFirebase } from "gatsby-plugin-firebase"

const exampleJSON = [
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

const AvailabilityItem = ({ details, day, course }) => {
  // three states: Time w/ Question, Time w/ Available, Spacer (no time)
  var StatusItem
  const Unavailable = () => (
    <div>
      <div>...</div>
    </div>
  )

  const Available = () => (
    <Link
      to="/input-question"
      state={{ time: details.time, course: course, day: day }}
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
    <div className="panel-block">
      <StatusItem />
    </div>
  )
}

const daySymbolMapping = {
  Su: "sunday",
  M: "monday",
  Tu: "tuesday",
  W: "wednesday",
  Th: "thursday",
  F: "friday",
  Sa: "saturday"
}

const AvailabilityList = props => {
  const [avail, setAvail] = React.useState()
  const [firebase, setFirebase] = React.useState();

  useFirebase(firebase => {
    setFirebase(firebase);
  }, [])

  // firebase
  //     .firestore()
  //     .collection("courses")
  //     .doc("MMW 15")
  //     .get()
  //     .then(res => {
  //       console.log(res.data())
  //     })

  return (
    <React.Fragment>
      <p>{avail}</p>
      <nav className="panel">
        <p className="panel-heading">Today</p>
        {exampleJSON.map(arrayItem => (
          <AvailabilityItem 
            details={arrayItem} 
            day={daySymbolMapping[props.selectedDay]} 
            course={props.course}
            key={arrayItem.time} 
          />
        ))}
      </nav>
    </React.Fragment>
  )
}

export default AvailabilityList
