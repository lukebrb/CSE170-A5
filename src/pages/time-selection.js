import React from "react"

import NavigationBar from '../components/navigation-bar'

import Layout from "../components/layout"
import MiniCalendar from "../components/mini-calendar"
import AvailabilityList from "../components/availability-list"

import withLocation from '../components/withLocation';

function TimeSelectionPage ({search}) {
  var [selectedDay, updateDay] = React.useState();

  const {course} = search;

  return (
    <Layout>
      <NavigationBar extend={false} parents={['Home', 'Time Selection']}/>
      <h1>Choose A Time</h1>
      <MiniCalendar updateDay={updateDay} />

      <AvailabilityList selectedDay={selectedDay} course={course} />
    </Layout>
  )
}

export default withLocation(TimeSelectionPage);