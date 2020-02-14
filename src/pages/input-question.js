import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import NavigationBar from "../components/navigation-bar"

const QuestionInputController = ({ children }) => (
  <div class="field">
    <div class="control">{children}</div>
  </div>
)

export default ({ location }) => {
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
          class="textarea is-large"
          value={question}
          placeholder="Ask a question..."
          onChange={questionUpdateHandler}
        ></textarea>
      </QuestionInputController>
      <Link
        to="/confirmation"
        state={{ questionText: question, timeSlot: location.state.time }}
        className="button is-fullwidth is-primary"
      >
        Submit
      </Link>
    </Layout>
  )
}
