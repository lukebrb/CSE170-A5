import React from 'react';
import { Link } from 'gatsby';
import { useFirebase } from 'gatsby-plugin-firebase';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

import Layout from '../components/layout';
import QuickBookings from '../components/quick-booking';
import Appointment from '../components/upcoming-appointment';
import { useState } from 'react';

import '../static/algolia.css';

// import Card from "../components/course-card"

// This page will need to dynamically update what courses are shown
// based on the user that is currently logged on
const CourseSelection = () => {
  const [courses, setCourses] = useState([]);
  const searchClient = algoliasearch('questions', 'SEARCHKEY');
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
      <InstantSearch indexName="lol" searchClient={searchClient}>
        <SearchBox />
      </InstantSearch>
      <Appointment />
      {courses ? <QuickBookings courses={courses} /> : <p>...</p>}

      <h3 className="is-size-4 has-text-weight-bold">Select Your Course</h3>
      {courses.length == 0 ? (
        <div className="box is-loading">
          <progress className="progress is-medium is-grey-lighter" max="100" />
        </div>
      ) : (
        courses.map(course => (
          <Link to={'/time-selection/?course=' + course[0]} key={course[1]}>
            <div className="card" style={{ marginBottom: 10 }}>
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img
                        src={`https://picsum.photos/100?random=${course[1]}`}
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4 is-family-sans-serif">
                      {course[1]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </Layout>
  );
};

export default CourseSelection;
