import React, {useState} from "react"

import { Link, navigate } from 'gatsby'

import { useFirebase } from 'gatsby-plugin-firebase'
import { isLoggedIn, logout } from '../auth'

function NavigationBar(props) {
  const [firebase, setFirebase] = useState();

  useFirebase(firebase => {
    setFirebase(firebase);
  }, [])

  const getNavBar = () => {
    var history = [];    

    for ( let p of props.parents ) {
      history.push(
        <li>
          <Link to={mappings[p]}>{p}</Link>
        </li>
      )
    }
    
    return history;
  }

  const triggerLogout = () => {
    logout(firebase).then(() => navigate('/'));
  }

  return (
    <>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          {getNavBar()}
        </ul>
      </nav>
      <button onClick={triggerLogout}>
        Log out
      </button>
    </>
  )
}

// I think it would be a good idea to add functionality for "..."
// so that the navigation bar does not get extremely long
const mappings = {
  'Home': '/course-selection',
  'Time Selection': '/time-selection'
}

export default NavigationBar;