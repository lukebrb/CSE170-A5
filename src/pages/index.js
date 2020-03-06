import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import CourseSelection from './course-selection';
import LoginPage from './login';

import { isLoggedIn } from '../auth';

function HomePage({location}) {
  const [loggedIn, newLogin] = React.useState(false);
  

  React.useEffect(() => {
    newLogin(isLoggedIn);
  }, []);

  return loggedIn ? <CourseSelection alternate={location && location.search && location.search.indexOf('alternate') != -1 ? "alternate=true" : ""}/> 
    : <LoginPage login={newLogin} />;
}

export default HomePage;
