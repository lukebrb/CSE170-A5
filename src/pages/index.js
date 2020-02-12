import React from "react"

import LoginPage from './login';
import CourseSelection from './course-selection';

import { isLoggedIn } from '../auth'

function HomePage () {
  const [loggedIn, newLogin] = React.useState(false);

  React.useEffect(() => {
    newLogin(isLoggedIn)
  }, [])

  return (
    (loggedIn) ? 
      <CourseSelection /> : 
      <LoginPage login={newLogin}/>
  )
}
      
export default HomePage
