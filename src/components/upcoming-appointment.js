import React from "react"
import { useFirebase } from "gatsby-plugin-firebase"

export default () => {
  var i = 0 // no-op
  if (i == 0) {
    return ""
  }
  return (
    <>
      <h3>Upcoming Appointment</h3>
      <div className="box">I'm an appointment!</div>
    </>
  )
}
