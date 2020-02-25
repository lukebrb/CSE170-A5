import React, { useEffect } from "react"
import { Link } from "gatsby"
import { useFirebase } from "gatsby-plugin-firebase"

const AvailabilityItem = ({ time, details, day, course }) => {
  // three states: Time w/ Question, Time w/ Available, Spacer (no time)

  var result = []
  
  for ( let detail of details ) {
    if (detail.question) {
      result.push(
        <div className="panel-block">
        
          <div>{time}</div>
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
            to={"/input-question/?course=" + course
                                + '&time=' + time
                                + '&day=' + day
                                + '&location=' + detail.location
                                + '&TA=' + detail.TA}
            style={{ width: '100%' }}
          >
            <div>{time}</div>
            <div>AVAILABLE</div>
          </Link>
        </div>
      )
     }
  }

  // idk how to handle this case O.O
  const Unavailable = () => (
    <div>
      <div>...</div>
    </div>
  )

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
  const [courseData, setCourseData] = React.useState();
  const [timeSlots, setTimeSlots] = React.useState();

  const updateCourseData = () => {
    const currDay = dayMap[props.selectedDay]
    var courses = [];
    var times = []
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
      times.push(time)
      courses.push(questions) 
    }
    setTimeSlots(times)
    setCourseData(courses);
  }

  useFirebase(firebase => {
    firebase.firestore()
      .collection("courses")
      .doc(props.course)
      .get()
      .then(doc => {
        rawData = doc.data().OH;

        updateCourseData();
      })
  }, [])

  useEffect(() => {
    updateCourseData();
  }, [props.selectedDay, rawData])

  return (
    <React.Fragment>
      <nav className="panel">
        <p className="panel-heading">Today</p>
        {courseData ? courseData.map((arrayItem, idx) => (
          <AvailabilityItem 
            time={timeSlots[idx]}
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
