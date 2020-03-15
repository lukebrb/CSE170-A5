import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import algoliasearch from 'algoliasearch';

import Layout from '../components/layout';
import { useFirebase } from 'gatsby-plugin-firebase';

import withLocation from '../components/withLocation';
import AddToCalendar from 'react-add-to-calendar';

const algolia = algoliasearch('YOO25R596Q', '527e21ccf63d7664fe1a99aa349e2a3f');
const index = algolia.initIndex('office_hours_questions');

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
      .collection('questions')
      .add({
        TA: TA,
        answer: '',
        location: location,
        question: question,
      })
      .then(ref => {
        // handles algolia
        var qData = {
          TA: TA,
          answer: '',
          location: location,
          question: question,
          objectID: ref.id,
        };

        index.saveObject(qData);

        firebase.functions().httpsCallable('newQuestion')({
          TA: TA,
          answer: '',
          location: location,
          question: question,
          time: time,
          day: day,
          course: course,
          path: 'questions/' + ref.id,
        });
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
        {location === 'Zoom' ? (
          <p>Your TA will follow up with their Zoom URL shortly. </p>
        ) : null}
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
