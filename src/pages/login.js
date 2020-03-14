import React, { useState } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { useFirebase } from 'gatsby-plugin-firebase';
import { setUser } from '../auth';

function LoginPage(props) {
  const [firebase, setFirebase] = useState();

  useFirebase(firebase => {
    setFirebase(firebase);
  }, []);

  const getUiConfig = auth => {
    return {
      signInFlow: 'popup',
      signInSuccessUrl: '/course-selection',
      signInOptions: [
        auth.EmailAuthProvider.PROVIDER_ID,
        auth.GoogleAuthProvider.PROVIDER_ID,
        auth.FacebookAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: result => {
          setUser(result.user);
          props.login(true);
        },
      },
    };
  };

  return (
    <Layout>
      <SEO title="Login" />

      {firebase && (
        <StyledFirebaseAuth
          uiConfig={getUiConfig(firebase.auth)}
          firebaseAuth={firebase.auth()}
        />
      )}
    </Layout>
  );
}

export default LoginPage;
