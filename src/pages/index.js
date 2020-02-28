import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import CourseSelection from './course-selection';
import LoginPage from './login';

import { isLoggedIn } from '../auth';

function HomePage() {
  const [loggedIn, newLogin] = React.useState(false);

  React.useEffect(() => {
    newLogin(isLoggedIn);
  }, []);

  return loggedIn ? <CourseSelection /> : <LoginPage login={newLogin} />;
}

export default HomePage;
