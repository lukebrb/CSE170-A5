import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import { useFirebase } from "gatsby-plugin-firebase"

export default ({ location }) => {
  const [firebase, setFirebase] = React.useState();

  var timeSlot = ""
  var questionText = ""
  var course = ""
  var day = ''

  if (isNaN(location.state)) {
    var { timeSlot, questionText, course, day } = location.state.data
  }

  useFirebase(fb => {
    setFirebase(fb);
  }, [])
  
  const saveQuestion = () => {
    let key = timeSlot + '.selectedQuestion';
    firebase.firestore()
      .collection("courses")
      .doc(course)
      .collection('questions')
      .doc(day)
      .update({
        [key]: questionText
      })     
  }

  return (
    <Layout>
      <h1>Confirm Details</h1>
      <h3>Selected timeslot:</h3>
      <p>{timeSlot}</p>

      <hr />      
      <h3>Your question</h3>
      <p>{questionText}</p>

      <button onClick={saveQuestion}>test</button>

      <Link to="/">
        <button 
          onClick={saveQuestion}
          className="button is-fullwidth is-primary"
        >
          Done  
        </button>
      </Link>
    </Layout>
  )
}
