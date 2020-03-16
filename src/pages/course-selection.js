import React, { useState } from 'react';
import { Link } from 'gatsby';
import { useFirebase } from 'gatsby-plugin-firebase';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';

import Layout from '../components/layout';
import QuickBookings from '../components/quick-booking';
import Appointment from '../components/upcoming-appointment';

/**
 * Algolia-related things
 */

import '../static/algolia.css';

const Hits = ({ hits }) => (
  <ul>
    {hits.map(hit =>
      hit.question === '' ? null : (
        <li key={hit.objectID}>
          <Link
            to={`/view-question?question=${hit.question}&answer=${hit.answer}&TA=${hit.TA}&location=${hit.location}`}
          >
            <div className="card" style={{ marginBottom: 10 }}>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4 is-family-sans-serif">
                      {hit.question}
                    </p>
                    <p>
                      With {hit.TA} at {hit.location}
                    </p>
                  </div>
                  <div className="media-right">
                    <Link
                      to={`/view-question?question=${hit.question}&answer=${hit.answer}&TA=${hit.TA}&location=${hit.location}`}
                    >
                      <button className="button is-primary">
                        View question
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>
      )
    )}
  </ul>
);

const CustomHits = connectHits(Hits);
const algoliaClient = algoliasearch(
  'YOO25R596Q', // pls dont steal our api key thx
  '0360826a23c01595951395b93a51a253' // environment variables are annoying
);

const searchClient = {
  search(requests) {
    if (requests[0].params.query === '') {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      });
    }
    return algoliaClient.search(requests);
  },
};

/**
 * END Algolia stuff
 */

// This page will need to dynamically update what courses are shown
// based on the user that is currently logged on
const CourseSelection = ({ alternate }) => {
  const [courses, setCourses] = useState([]);

  useFirebase(firebase => {
    firebase
      .firestore()
      .collection('courses')
      .onSnapshot(querySnapshot => {
        let courseList = [];
        querySnapshot.forEach(doc => {
          courseList.push([doc.id, doc.data()['name']]);
        });
        setCourses(courseList);
      });
  });

  return (
    <Layout>
      <InstantSearch
        indexName="office_hours_questions"
        searchClient={searchClient}
      >
        <SearchBox showLoadingIndicator />
        <CustomHits />
      </InstantSearch>
      <Appointment />

      <h3 className="is-size-4 has-text-weight-bold">Select Your Course</h3>
      {courses.length == 0 ? (
        <div className="box is-loading">
          <progress className="progress is-medium is-grey-lighter" max="100" />
        </div>
      ) : (
        courses.map(course => (
          <Link
            to={'/time-selection/?course=' + course[0] + '&' + alternate}
            key={course[1]}
          >
            <CourseCard>{course[1]}</CourseCard>
          </Link>
        ))
      )}
    </Layout>
  );
};

const CourseCard = ({ children }) => (
  <div className="card" style={{ marginBottom: 10 }}>
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img
              src={`https://picsum.photos/100?random=${children}`}
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className="media-content">
          <p className="title is-4 is-family-sans-serif">{children}</p>
        </div>
      </div>
    </div>
  </div>
);

export default CourseSelection;
