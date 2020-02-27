import React, { useState } from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { useFirebase } from 'gatsby-plugin-firebase'
import { setUser } from '../auth'

function LoginPage(props) {
  const [firebase, setFirebase] = useState();

  const [TA, setTA] = useState();
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [timeVal, setTimeVal] = useState();
  const [room, setRoom] = useState();

  useFirebase(firebase => {
    setFirebase(firebase);
  }, [])

  const getUiConfig = auth => {
    return {
      signInFlow: 'popup',
      signInSuccessUrl: '/course-selection',
      signInOptions: [
        auth.EmailAuthProvider.PROVIDER_ID,
        auth.GoogleAuthProvider.PROVIDER_ID,
        auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: result => {
          setUser(result.user);
          props.login(true);
        }
      }
    }
  }

  return (
    <Layout>
      <SEO title="Login" />

      <h1>Login</h1>

      day
      <input onChange={(e) => {
        setDay(e.target.value)}}/>
      <hr/>
      TA
      <input onChange={(e) => {
        setTA(e.target.value)}}/>
      <hr/>
      location
      <input onChange={(e) => {
        setRoom(e.target.value)}}/>
      <hr/>
      question
      <input onChange={(e) => {
        setQuestion(e.target.value)}}/>
      <hr/>
      time
      <input onChange={(e) => {
        setTime(e.target.value)}}/>
      <hr/>
      timeVal 
      <input onChange={(e) => {
        setTimeVal(e.target.value)}}/>
      <hr/>
      answer
      <input onChange={(e) => {
        setAnswer(e.target.value)}}/>
      <hr/>
      <button onClick={() => {
        let key = 'OH.' + day + '.' + time + '.timeVal';
        let fullKey = 'OH.' + day + '.' + time + '.questions';
        let data = {
          TA: TA,
          answer: answer ? answer : '',
          location: room,
          question: question ? question : '',
          
        }
        console.log(key);
        console.log(day)
        console.log(time)
        firebase.firestore()
          .collection("courses")
          .doc('HIST 45')
          .update({
            [key]: parseInt(timeVal),
            [fullKey]: firebase.firestore.FieldValue.arrayUnion(data)
          })
          
      }}>push</button>
      
      {firebase && 
        <StyledFirebaseAuth 
          uiConfig={getUiConfig(firebase.auth)} 
          firebaseAuth={firebase.auth()}
        />
      }
    </Layout>
  )
}

export default LoginPage;