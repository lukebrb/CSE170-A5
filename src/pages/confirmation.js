import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import { useFirebase } from "gatsby-plugin-firebase"

export default ({ location }) => {
  var timeSlot = ""
  var questionText = ""
  if (location.state !== undefined) {
    var { timeSlot, questionText } = location.state.data
  }

  useFirebase(fb => {
    if (timeSlot === "" || questionText === "") return
    fb.firestore()
      .collection("courses")
      .doc("MMW 15")
      .update({
        questions: fb.firestore.FieldValue.arrayUnion({
          timeSlot,
          questionText,
        }),
      })
  })

  return (
    <Layout>
      <h1>Confirm Details</h1>
      <h3>Selected timeslot:</h3>
      <p>{timeSlot}</p>

      <hr />

      <h3>Your question</h3>
      <p>{questionText}</p>

      <Link to="/" className="button is-fullwidth is-primary">
        Done
      </Link>
    </Layout>
  )
}
