import React, { useState } from "react"
import moment, { unix, calendar } from "moment"
import { useFirebase } from "gatsby-plugin-firebase"

export default () => {
  const [quickbookItems, setQuickbookItems] = useState()
  useFirebase(firebase => {
    const coll = []
    firebase
      .firestore()
      .collection("TAs")
      .get()
      .then(doc => doc.docs.map(ta => coll.push(ta.data())))

    const res = coll.map(ta => {
      if (ta["hours"][moment().day() - 1].length > 0) {
        const res = ta["hours"][moment().day() - 1].map(hour => {
          if (hour > moment().hour()) {
            return { name: ta["name"], time: hour }
          }
        })
      }
    })
    setQuickbookItems(res)
  })

  return (
    <div
      className="container"
      style={{
        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      {quickbookItems ? (
        quickbookItems.map(quickbookItem => (
          <MiniCard time={quickbookItem["time"]} />
        ))
      ) : (
        <React.Fragment />
      )}
    </div>
  )
}

// Micro-components
const MiniCard = ({ time }) => {
  return (
    <div
      className="box"
      style={{
        marginRight: "20px",
        height: "7rem",
      }}
    >
      <h5 class="is-size-7 is-marginless">
        {moment()
          .hour(time)
          .calendar()}
      </h5>
      <h5 class="is-size-7 is-marginless is-uppercase"> COGS 100</h5>
      <article className="media" style={{ marginTop: 10 }}>
        <div className="media-content">
          <div className="content">
            <h5 className="is-family-sans-serif is-size-7 is-marginless">
              John Smith
            </h5>
          </div>
        </div>{" "}
        <div className="media-right">
          <figure className="image is-32x32">
            <img
              src="https://corgi.photos/64/64"
              alt="Image"
              className="is-rounded"
            />
          </figure>
        </div>
      </article>
    </div>
  )
}
