import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import MiniCalendar from "../components/mini-calendar"
import AvailabilityList from "../components/availability-list"

const TimeSelection = () => (
  <Layout>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/course-selection">Courses</Link>
        </li>
        <li class="is-active">
          <a href="#" aria-current="page">
            Time Selection
          </a>
        </li>
      </ul>
    </nav>
    <h1>Choose A Time</h1>
    <MiniCalendar />
    <AvailabilityList></AvailabilityList>
  </Layout>
)

export default TimeSelection
