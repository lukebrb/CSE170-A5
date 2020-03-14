import React, { useState } from 'react';
import { Link } from 'gatsby';

import moment, { unix, calendar } from 'moment';
import { useFirebase } from 'gatsby-plugin-firebase';

import getNearest from '../helpers/nearest-times';

export default () => {
  const [quickbookItems, setQuickbookItems] = useState();
  useFirebase(async firebase => {
    const coll = await firebase
      .firestore()
      .collection('TAs')
      .get()
      .then(doc => doc.docs.map(ta => ta.data()));

    setQuickbookItems(getNearest(3, coll));
  });

  return (
    <>
      <h3 className="is-size-4 has-text-weight-bold">Quick Book</h3>
      <div
        className="container"
        style={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        {quickbookItems ? (
          quickbookItems.map(({ name, hour, course }) => (
            <MiniCard name={name} hour={hour} course={course} />
          ))
        ) : (
          <React.Fragment />
        )}
      </div>
    </>
  );
};

// Micro-components
const MiniCard = ({ name, hour, course }) => {
  return (
    <div
      className="box"
      style={{
        marginRight: '20px',
        height: '7rem',
      }}
    >
      <h5 class="is-size-7 is-marginless">
        {moment()
          .hour(hour)
          .calendar()}
      </h5>
      <h5 class="is-size-7 is-marginless is-uppercase"> {course}</h5>
      <article className="media" style={{ marginTop: 10 }}>
        <div className="media-content">
          <div className="content">
            <h5 className="is-family-sans-serif is-size-7 is-marginless">
              {name}
            </h5>
          </div>
        </div>{' '}
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
  );
};
