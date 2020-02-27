import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';

import Layout from '../components/layout';
import { useFirebase } from 'gatsby-plugin-firebase';

import withLocation from '../components/withLocation';
import AddToCalendar from 'react-add-to-calendar';

const ConfirmationPage = ({ search }) => {
  const [firebase, setFirebase] = React.useState();

  const { time, course, day, location, TA, question } = search;

  useFirebase(fb => {
    setFirebase(fb);
  }, []);

  const saveQuestion = () => {
    let key = 'OH.' + day + '.' + time + '.questions';

    firebase
      .firestore()
      .collection('courses')
      .doc(course)
      .update({
        [key]: firebase.firestore.FieldValue.arrayRemove({
          TA: TA,
          answer: '',
          location: location,
          question: '',
        }),
      })
      .then(() => {
        firebase
          .firestore()
          .collection('courses')
          .doc(course)
          .update({
            [key]: firebase.firestore.FieldValue.arrayUnion({
              TA: TA,
              answer: '',
              location: location,
              question: question,
            }),
          });

        // add code to save which student asked which question
      });
  };

  return (
    <Layout>
      <h1>Confirm Details</h1>
      <h3>Selected time:</h3>
      <p>
        {day} - {time}
      </p>
      <p>{course}</p>
      <p>
        {location} - {TA}
      </p>
      <hr />
      <h3>Your question</h3>
      <p>{question}</p>
      <br />{' '}
      <Link to="/">
        <button
          onClick={saveQuestion}
          className="button is-fullwidth is-primary"
        >
          Confirm
        </button>
      </Link>
      <br />
      <div className="has-text-centered">
        {time ? (
          <AddToCalendar
            displayItemIcons={true}
            event={{
              title: `Meeting with ${TA}`,
              description: 'Booked with OpenBook',
              location: `${location}`,
              startTime: `${moment()
                .day(day)
                .hour(time.split(':')[0])
                .minute(time.split(':')[1])
                .format()}`,
            }}
          />
        ) : (
          ''
        )}
      </div>
      <br />
    </Layout>
  );
};

export default withLocation(ConfirmationPage);
