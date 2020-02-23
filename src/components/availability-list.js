import React, { useEffect } from "react"
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
  // console.log("details: ", details)
  // console.log("day: ", day);
  // console.log("couse: ", course)

  var result = []

  for ( let detail of details ) {
    if (detail.question) {
      result.push(
        <div className="panel-block">
        
          <div>{detail.time}</div>
          <div>{detail.question}</div>
          <div>{detail.location}</div>
          <div>{detail.TA}</div>
        </div>
      )
    }
    else {
      result.push(
        <div className="panel-block">
          <Link
            to="/input-question"
            state={{ time: detail.time, course:course, day: day }}
            style={{ width: '100%' }}
          >
            <div>{detail.time}</div>
            <div>AVAILABLE</div>
          </Link>
        </div>
      )
     }
  }

  const Unavailable = () => (
    <div>
      <div>...</div>
    </div>
  )

  // const Available = () => (
  //   <Link
  //     to="/input-question"
  //     state={{ time: details.time, course: course, day: day }}
  //     style={{ width: "100%" }}
  //   >
  //     <div>{details.time}</div>
  //     <div>AVAILABLE</div>
  //   </Link>
  // )

  // const Question = () => (
  //   <div>
  //     <div>{details.time}</div>
  //     <div>{details.question}</div>
  //   </div>
  // )

  // if (details.time && details.question) {
  //   StatusItem = Question
  // } else if (details.time) {
  //   StatusItem = Available
  // } else {
  //   StatusItem = Unavailable
  // }

  return result
}

const dayMap = {
  Su: "sunday",
  M: "monday",
  Tu: "tuesday",
  W: "wednesday",
  Th: "thursday",
  F: "friday",
  Sa: "saturday"
}

var rawData = {}

const AvailabilityList = props => {
  const [avail, setAvail] = React.useState()
  const [day, setDay] = React.useState(props.selectedDay);
  const [courseData, setCourseData] = React.useState();

  useEffect(() => {
    setDay(props.selectedDay)

    const currDay = dayMap[props.selectedDay]
    var courses = [];
    var questions = []
    var curr;

    for (let time in rawData[currDay]) {
      questions = []
      for ( let question in rawData[currDay][time].questions ) {
        curr = rawData[currDay][time].questions[question];
        questions.push({
          TA: curr.TA,
          answer: curr.answer,
          location: curr.location,
          question: curr.question
        })
      }
      courses.push(questions) 
    }
    setCourseData(courses);
  }, [props.selectedDay, rawData])

  useFirebase(firebase => {
    firebase.firestore()
      .collection("courses")
      .doc(props.course)
      .get()
      .then(doc => {
        rawData = doc.data().OH;
      })
  }, [])

  return (
    <React.Fragment>
      <p>{avail}</p>
      <nav className="panel">
        <p className="panel-heading">Today</p>
        {courseData ? courseData.map(arrayItem => (
          <AvailabilityItem 
            details={arrayItem} 
            day={dayMap[props.selectedDay]}
            course={props.course}
            key={arrayItem.time} 
          />)) : ''
        }
      </nav>
    </React.Fragment>
  )
}

export default AvailabilityList
