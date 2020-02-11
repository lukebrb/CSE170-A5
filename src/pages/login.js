import React, { useState } from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"

import { useFirebase } from 'gatsby-plugin-firebase'

function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [failedLogin, setFailedLogin] = useState(false);
  const [createAccErr, setCreateAccErr] = useState(false);

  // Gate keeper for hooks
  const [execute, shouldExecute] = useState(0);     

  // Email signup                                                      
  useFirebase(firebase => {
    if ( execute === 'emailSignup' ) {
      console.log("email signup")
      firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(this.props.logUser)
        .catch(err => {
          console.error("create acc error: \n", err.message);
          setCreateAccErr(err);
        })
    }
  });
  
  // Email login
  useFirebase(firebase => {
    if ( execute === 'emailLogin' ) {
      console.log("email login")
      firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(this.props.logUser)
        .catch( err => console.error("ERROR WITH EMAIL + PASSWORD LOGIN\n", err));
    }
  });

  // Google login
  useFirebase(firebase => {
    console.log("google login initial")
    if ( execute === 'googleLogin' ) {
      console.log("google login")
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(this.props.logUser)
        .catch(err => console.error("error with google sign in:\n", err));
    }
  });
  
  // Facebook login
  useFirebase(firebase => {
    console.log("fb login initial")
    if ( execute === 'facebookLogin' ) {
      console.log("fb login")
      firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(this.props.logUser)
        .catch(err => console.error("error with facebook sign in:\n", err));
    }
  });

  return (
    <Layout>
      <SEO title="Login" />

      <h1>Login</h1>
      <form>
        <p>{failedLogin ? "Incorrect username or password" : ''}</p>
        <p>{createAccErr ? createAccErr : ''}</p>
        <label>
          Username
          <input 
            onChange={ e => { setEmail(e.target.value) }}
          />
        </label>
        <label>
          Password
          <input 
            onChange={ e => { setPass(e.target.value) }}
            type="password"
          />
        </label>
        <button 
        onClick={ e => {
          e.preventDefault();

          shouldExecute('emailSignup');
        }}
        >
          Sign Up
        </button>
        <button
          onClick={ e => {
            e.preventDefault();

            // Show login error if incorrect email/pass
            // if (!this.emailLogin(email, pass)) {
            //   setFailedLogin(true);
            // }
            shouldExecute('emailLogin');
          }}
        >
          Login
        </button>
      </form>
      <button onClick={() => {shouldExecute('googleLogin')}}>Sign In With Google</button>
      <button onClick={() => {shouldExecute('facebookLogin')}}>Sign In With Facebook</button>
    </Layout>
  )
}

export default LoginPage;