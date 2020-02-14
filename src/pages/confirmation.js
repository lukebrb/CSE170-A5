import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

export default ({ location }) => {
  return (
    <Layout>
      <h1>Confirm Details</h1>
      <h3>Selected timeslot:</h3>
      <p>{location.state.timeSlot}</p>

      <hr></hr>

      <h3>Your question</h3>
      <p>{location.state.questionText}</p>

      <Link to="/" className="button is-fullwidth is-primary">
        Done
      </Link>
    </Layout>
  )
}
