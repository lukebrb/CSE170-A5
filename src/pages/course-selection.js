import React from "react"
import { Link } from "gatsby"
import { useFirebase } from "gatsby-plugin-firebase"

import Layout from "../components/layout"
import NavigationBar from "../components/navigation-bar"

import QuickBookings from "../components/quick-booking"
import { useState } from "react"

// import Card from "../components/course-card"

// This page will need to dynamically update what courses are shown
// based on the user that is currently logged on
const CourseSelection = () => {
  const [courses, setCourses] = useState([])
  useFirebase(firebase => {
    firebase
      .firestore()
      .collection("courses")
      .get()
      .then(doc => {
        setCourses(doc.docs.map(document => document.data()["name"]))
      })
  })

  return (
    <Layout>
      <h1>Home</h1>
      <h3>Quick Book</h3>
      <QuickBookings courses={courses} />
      <h2>Select Your Course</h2>
      {courses.map(course => (
        <Link to="time-selection" state={{ courseName: course }} key={course}>
          <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img
                      src={`https://picsum.photos/100?random=${course}`}
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4 is-family-sans-serif">{course}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Layout>
  )
}

export default CourseSelection
