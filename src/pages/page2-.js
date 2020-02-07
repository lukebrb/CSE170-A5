import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import AvailabilityList from "../components/availability-list"

const SecondPage = () => (
  <Layout>
    <h1>Choose A Time</h1>
    <AvailabilityList></AvailabilityList>
  </Layout>
)

export default SecondPage
