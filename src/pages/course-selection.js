import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import NavigationBar from '../components/navigation-bar'

import Card from "../components/course-card"

// This page will need to dynamically update what courses are shown
// based on the user that is currently logged on
const CourseSelection = () => (
  <Layout>
    <NavigationBar extend={false} parents={['Home']}/>
    <div
      style={{
        margin: "0 auto",
        padding: "7% 2%",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        height: "100%",
        width: "100%",
      }}
    >
      <h2
        style={{
          margin: "0 auto",
        }}
      >
        Select Your Course
      </h2>
      <Link to="/time-selection">
        <Card id="Dance 420" color="#c7fcd1" totalSlots="15" availSlots="2" />
        <Card
          id="CSE 170/COGS 120"
          color="#fcd0c7"
          totalSlots="10"
          availSlots="4"
        />
      </Link>
    </div>
  </Layout>
)

export default CourseSelection
