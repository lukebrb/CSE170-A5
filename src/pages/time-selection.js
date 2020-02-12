import React from "react"
import { Link } from "gatsby"

import NavigationBar from '../components/navigation-bar'

import Layout from "../components/layout"
import MiniCalendar from "../components/mini-calendar"
import AvailabilityList from "../components/availability-list"

const TimeSelection = () => (
  <Layout>
    <NavigationBar extend={false} parents={['Home', 'Time Selection']}/>
    <h1>Choose A Time</h1>
    <MiniCalendar />
    <AvailabilityList></AvailabilityList>
  </Layout>
)

export default TimeSelection
