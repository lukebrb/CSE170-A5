import React from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"

import { fb } from '../firebase';
import firebase from 'firebase';

class LoginPage extends React.Component{
  constructor(props) {
    super(props);
    
    this.login = {
      email: "",
      google: new firebase.auth.GoogleAuthProvider(),
      facebook: new firebase.auth.FacebookAuthProvider()
    }

    this.state = {
      email: '',
      pass: '',
      failedLogin: false,
      createAccErr: false
    }
  }

  emailSignup = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.props.logUser)
      .catch(err => {
        console.error("creat acc error: \n", err.message);
        this.setState({ createAccErr: err.message })
      })
  }

  emailLogin = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.props.logUser)
      .catch( err => console.error("ERROR WITH EMAIL + PASSWORD LOGIN\n", err));
  }

  googleLogin = () => {
    firebase.auth().signInWithPopup(this.login.google)
      .then(this.props.logUser)
      .catch(err => console.error("error with google sign in:\n", err));
  }
  
  facebookLogin = () => {
    firebase.auth().signInWithPopup(this.login.facebook)
      .then(this.props.logUser)
      .catch(err => console.error("error with facebook sign in:\n", err));
  }


  render = () => {
    return (
      <Layout>
        <SEO title="Login" />

        <h1>Login</h1>
        <form>
          <p>{this.state.failedLogin ? "Incorrect username or password" : ''}</p>
          <p>{this.state.createAccErr ? this.state.createAccErr : ''}</p>
          <label>
            Username
            <input 
              onChange={ e => { this.setState({ email: e.target.value }) }}
            />
          </label>
          <label>
            Password
            <input 
              onChange={ e => { this.setState({ pass: e.target.value }) }}
              type="password"
            />
          </label>
          <button 
          onClick={ e => {
            e.preventDefault();

            this.emailSignup(this.state.email, this.state.pass);
          }}
          >
            Sign Up
          </button>
          <button
            onClick={ e => {
              e.preventDefault();

              // Show login error if incorrect email/pass
              if (!this.emailLogin(this.state.email, this.state.pass)) {
                this.setState({ failedLogin: true });
              }
            }}
          >
            Login
          </button>
        </form>
        <button onClick={this.googleLogin}>Sign In With Google</button>
        <button onClick={this.facebookLogin}>Sign In With Facebook</button>
      </Layout>
    )
  }

  
}

export default LoginPage;