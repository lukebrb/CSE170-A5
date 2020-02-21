import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { useFirebase } from "gatsby-plugin-firebase"

import { logout, isLoggedIn } from "../auth"

const Header = ({ siteTitle }) => {
  const [firebase, setFirebase] = useState()
  const triggerLogout = () => {
    logout(firebase).then(() => navigate("/"))
  }

  useFirebase(firebase => {
    setFirebase(firebase)
  }, [])

  return (
    <header
      className="navbar"
      style={{
        background: `#24323f`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        className="container is-flex"
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        {isLoggedIn(firebase) ? (
          <button
            className="button is-outlined is-pulled-right"
            onClick={triggerLogout}
            style={{ alignItems: "right" }}
          >
            Log out
          </button>
        ) : (
          <p></p>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
