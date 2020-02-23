import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import NavigationBar from "../components/navigation-bar"

const QuestionInputController = ({ children }) => (
  <div className="field">
    <div className="control">{children}</div>
  </div>
)

export default ({ location }) => {
  let timeFromPrevious = ""
  let course = ''
  let day = ''
  let room = ''
  let TA = ''

  if (location.state) {
    timeFromPrevious = location.state.time
    course = location.state.course
    day = location.state.day
    room = location.state.location
    TA = location.state.TA
  }
  const [question, setQuestion] = useState("")
  const questionUpdateHandler = event => {
    setQuestion(event.target.value)
  }

  return (
    <Layout>
      <NavigationBar
        extend={false}
        parents={["Home", "Time Selection", "Input Question"]}
      />
      <div>Timeslot: {day} - {timeFromPrevious}</div>
      <div>Location: {room}</div>
      <div>TA: {TA}</div>
      <QuestionInputController>
        <textarea
          className="textarea is-large"
          value={question}
          placeholder="Ask a question..."
          onChange={questionUpdateHandler}
        ></textarea>
      </QuestionInputController>
      <Link
        to="/confirmation"
        state={
          { data: { 
              questionText: question, 
              timeSlot: timeFromPrevious, 
              course: course, 
              day: day,
              room: room,
              TA: TA,
            } 
          }
        }
        className="button is-fullwidth is-primary"
      >
        Continue
      </Link>
    </Layout>
  )
}
