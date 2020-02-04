import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    
    <h1>Login</h1>
    <form>
      <label>
        Username
        <input type="username" name="firstName" />
      </label>
      <label>
        Password
        <input type="password" name="lastName" />
      </label>
      <button type="submit">Submit</button>
    </form>

    <Link to="/page-2/">Go to page 2</Link>
    <Link to="/course-selection/">Course Selection Page</Link>
  </Layout>
)

export default IndexPage
