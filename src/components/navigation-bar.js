import React, { useState } from "react"

import { Link, navigate } from "gatsby"

import { useFirebase } from "gatsby-plugin-firebase"
import { logout } from "../auth"

import withLocation from '../components/withLocation'

function NavigationBar(props) {
  const [firebase, setFirebase] = useState()

  useFirebase(firebase => {
    setFirebase(firebase)
    
  }, [])

  const mappings = {
    Home: "/course-selection",
    "Time Selection": "/time-selection/?course=" + props.search.course,
    "Input Question": '/input-question/?course=' + props.search.course
                                      + '&time=' + props.search.time
                                      + '&day=' + props.search.day
                                      + '&location=' + props.search.location
                                      + '&TA=' + props.search.TA
  }

  const getNavBar = () => {
    var history = []
    if (props.parents != undefined) {
      for (let p of props.parents) {
        history.push(
          <li key={p}>
            <Link to={`${mappings[p]}`}>{p}</Link>
          </li>
        )
      }
    }

    return history
  }

  const triggerLogout = () => {
    logout(firebase).then(() => navigate("/"))
  }

  return (
    <>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>{getNavBar()}</ul>
      </nav>
    </>
  )
}

export default withLocation(NavigationBar)