import React from "react"
import { Link } from "gatsby"

import LoginPage from './login';
import CourseSelection from './course-selection';

class HomePage extends React.Component {

  // Access with firebase.auth().currentUser after --> will probably implement 
  // cookies to save user after refreshes
  state = {
    user: {
      name: null,
      uid: null
    },
    loggedIn: false
  }

  logUser = result => {
    this.setState({
      user: {
        name: result.user.displayName,
        uid: result.user.uid
      },
      loggedIn: true
    });

    return true;
  }

  render() {
    return (
      (this.state.loggedIn) ? 
        <CourseSelection /> : 
        <LoginPage logUser={this.logUser}/>
    
    )
  }
}
      
export default HomePage
