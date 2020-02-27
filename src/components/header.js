import { Link, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useFirebase } from 'gatsby-plugin-firebase';

import { logout, isLoggedIn } from '../auth';

const Header = ({ siteTitle }) => {
  const [firebase, setFirebase] = useState();
  const triggerLogout = () => {
    logout(firebase).then(() => navigate('/'));
  };

  useFirebase(firebase => {
    setFirebase(firebase);
  }, []);

  return (
    <header className="navbar">
      <div
        className="container is-flex"
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
          justifyContent: 'space-between',
        }}
      >
        <h1 className="title is-4 has-text-weight-bold is-marginless">
          <Link to="/" style={{}}>
            {siteTitle}{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-book-open"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </Link>
        </h1>
        {isLoggedIn(firebase) ? (
          <button
            className="button is-pulled-right"
            onClick={triggerLogout}
            style={{ alignItems: 'right' }}
          >
            Log out
          </button>
        ) : (
          <p></p>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
