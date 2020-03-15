import React, { useState } from 'react';

import Layout from '../components/layout';
import withLocation from '../components/withLocation';

export const ViewQuestion = ({ search }) => {
  const { question, answer, TA, location } = search;
  const [isAnswered, setIsAnswered] = useState(true);
  return (
    <Layout>
      <Question>{question}</Question>
      <br></br>
      <hr></hr>
      {isAnswered ? (
        <>
          <h3 className="is-size-4 has-text-primary">Answered ✓</h3>
          <div className="card" style={{ padding: '20px' }}>
            <h5 className="is-size-5">Tutoring Session Podcast</h5>
            <h5 className="is-size-5">Held at {location}</h5>
            <PodcastDescription>{TA}</PodcastDescription>
            <YoutubeVideo urlSlug={'CYI0Mc4cDDU'} />
          </div>
        </>
      ) : (
        <p>Not Answered Yet</p>
      )}
    </Layout>
  );
};

// Sub-components are alphabetized

const PodcastDescription = ({ children }) => (
  <div className="media is-marginless">
    <figure className="media-left image is-48x48">
      <img src="http://placecorgi.com/250" className="is-rounded"></img>
    </figure>
    <div className="media-content ">
      <div className="content">
        <h5 className="is-size-5 is-marginless">TA: {children}</h5>
      </div>
    </div>
  </div>
);

const Question = ({ children }) => (
  <>
    <h3 className="is-size-4">Question</h3>
    <div className="card" style={{ padding: '20px' }}>
      <p className="is-size-5 is-marginless">{children}</p>
    </div>
  </>
);

const YoutubeVideo = ({ urlSlug }) => (
  <iframe
    width="1920"
    height="1080"
    style={{
      height: '300px',
      width: '100%',
      margin: '0px',
    }}
    src={`https://www.youtube.com/embed/${urlSlug}`}
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
);

export default withLocation(ViewQuestion);
