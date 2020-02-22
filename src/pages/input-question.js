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
  if (location.state) {
    timeFromPrevious = location.state.time
    course = location.state.course
    day = location.state.day
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
              day: day 
            } 
          }
        }
        className="button is-fullwidth is-primary"
      >
        Submit
      </Link>
    </Layout>
  )
}
