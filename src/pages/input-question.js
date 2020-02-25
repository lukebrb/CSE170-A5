import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import NavigationBar from "../components/navigation-bar"
import withLocation from '../components/withLocation';

const QuestionInputController = ({ children }) => (
  <div className="field">
    <div className="control">{children}</div>
  </div>
)

const InputQuestionPage = ({ search }) => {

  const {time, course, day, location, TA} = search;

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
      <div>Timeslot: {day} - {time}</div>
      <div>Location: {location}</div>
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
        to={"/confirmation/?course=" + course
                          + '&time=' + time
                          + '&day=' + day
                          + '&location=' + location
                          + '&TA=' + TA
                          + '&question=' + question}

        className="button is-fullwidth is-primary"
      >
        Continue
      </Link>
    </Layout>
  )
}

export default withLocation(InputQuestionPage)