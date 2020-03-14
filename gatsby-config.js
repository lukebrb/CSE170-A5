require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `OpenBook`,
    description: `A booking service for the modern classroom.`,
    author: `Anson, Sean, Luke`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "UA-159843874-1"
        ],
        gtagConfig: {
          optimize_id: "GTM-KSW6CFD"
        },
        pluginConfig: {
          head: true
        },
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          auth: true,
          firestore: true,
          storage: true,
          functions: true,
          analytics: true
        },
        credentials: {
          // THIS IS THE PRODUCTION PROJECT
          apiKey: "AIzaSyDrMQJASkZxLYg8QhUSo-5ahAMYBOIzJYM",
          authDomain: "cse170-openbook.firebaseapp.com",
          databaseURL: "https://cse170-openbook.firebaseio.com",
          projectId: "cse170-openbook",
          storageBucket: "cse170-openbook.appspot.com",
          messagingSenderId: "6697865 81098",
          appId: "1:669786581098:web:865af162877b94c1a8c213",
          measurementId: "G-V1E8KXRJY5"

          // THIS IS THE TEST PROJECT
          // apiKey: "AIzaSyC7DsiZYWBJet7DGr4jgge7yZwfLktAIjE",
          // authDomain: "cse170-openbook-testing.firebaseapp.com",
          // databaseURL: "https://cse170-openbook-testing.firebaseio.com",
          // projectId: "cse170-openbook-testing",
          // storageBucket: "cse170-openbook-testing.appspot.com",
          // messagingSenderId: "395170657181",
          // appId: "1:395170657181:web:af335ab36985245668b574",
          // measurementId: "G-KWK6TQJMTV"
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
