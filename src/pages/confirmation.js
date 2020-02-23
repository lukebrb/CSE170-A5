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
  var room = ''
  var TA = ''

  if (location !== undefined && location.state !== undefined && location.state.data !== undefined) {
    var { timeSlot, 
          questionText, 
          course, 
          day,
          room,
          TA } = location.state.data
  }

  useFirebase(fb => {
    setFirebase(fb);
  }, [])
  
  const saveQuestion = () => {
    let key = 'OH.' + day + '.' + timeSlot + '.questions'

    firebase.firestore()
      .collection("courses")
      .doc(course)
      .update({
        [key]: firebase.firestore.FieldValue.arrayRemove({
          TA: TA,
          answer: '',
          location: room,
          question: '',
        })
      }).then(() => {
        firebase.firestore()
          .collection("courses")
          .doc(course)
          .update({
            [key]: firebase.firestore.FieldValue.arrayUnion({
              TA: TA,
              answer: '',
              location: room,
              question: questionText
            })
          });

          // add code to save which student asked which question
      })
  }

  return (
    <Layout>
      <h1>Confirm Details</h1>
      <h3>Selected timeslot:</h3>
      <p>{day} - {timeSlot}</p>
      <p>{course}</p>
      <p>{room} - {TA}</p>

      <hr />      
      <h3>Your question</h3>
      <p>{questionText}</p>

      <button onClick={saveQuestion}>test</button>

      <Link to="/">
        <button 
          onClick={saveQuestion}
          className="button is-fullwidth is-primary"
        >
          Confirm  
        </button>
      </Link>
    </Layout>
  )
}
