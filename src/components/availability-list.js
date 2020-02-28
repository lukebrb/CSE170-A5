import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import { useFirebase } from 'gatsby-plugin-firebase';
import Collapsible from 'react-collapsible';

import '../static/dropdown.css';
import downSVG from '../images/chevron-down.svg';
import bundleCourses, {
  getQuestionFromReference,
} from '../helpers/bundle-courses';

const Item = ({ time, questions, course, day }) => {
  if (questions === undefined) {
    return null;
  }

  return (
    <div className="question-time">
      {time}
      {questions.map(({ TA, question, location, answer }) => (
        <div
          className={`question-slot ${
            question === '' ? 'question-available' : ''
          }`}
          key={time + location + TA}
        >
          <h1>{question}</h1>
          <h3>On Duty: {TA}</h3>
          <p>{location}</p>
          <p>{answer}</p>

          {question === '' ? (
            <Link
              to={`/input-question?course=${course}&time=${time}&day=${day}&location=${location}&TA=${TA}`}
              className="button"
            >
              Book this timeslot >
            </Link>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
};
// Bundles all sub-times of an hour (i.e. :00, :15, :30...) into a single
// dropdown element.
const AvailabilityDropdown = ({ hour, courses, course, times, day }) => {
  if (hour === undefined || courses === undefined) return null;
  var hourString = times[hour[0]].split(':')[0];
  if (hourString === '12' || hourString.length === 1) {
    hourString += 'pm';
  } else {
    hourString += 'am';
  }

  hourString += ` (${hour.length})`;

  return (
    <>
      <Collapsible
        trigger={hourString}
        transitionTime={200}
        triggerTagName="div"
        key={hour}
      >
        {hour.map(idx => (
          <Item
            time={times[idx]}
            questions={courses[idx]}
            course={course}
            day={day}
            key={idx}
          ></Item>
        ))}
      </Collapsible>
    </>
  );
};

const dayMap = {
  Su: 'sunday',
  M: 'monday',
  Tu: 'tuesday',
  W: 'wednesday',
  Th: 'thursday',
  F: 'friday',
  Sa: 'saturday',
};

var rawData = {};

const AvailabilityList = props => {
  const [courseData, setCourseData] = React.useState();
  const [timeSlots, setTimeSlots] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const updateCourseData = async firebase => {
    setIsLoading(true);
    if (rawData === undefined) return null;
    const currDay = dayMap[props.selectedDay];
    if (rawData[currDay] === undefined) return null;
    var courses = [];
    var times = [];
    var questions = [];
    var curr;
    for (let time in rawData[currDay]) {
      questions = [];
      for (let question in rawData[currDay][time].questions) {
        if (rawData[currDay][time] === undefined) {
          break;
        }
        curr = rawData[currDay][time].questions[question];
        curr = await getQuestionFromReference(curr, firebase);
        questions.push({
          TA: curr.TA,
          answer: curr.answer,
          location: curr.location,
          question: curr.question,
        });
      }
      times.push(time);
      courses.push(questions);
    }
    setTimeSlots(times);
    setCourseData(courses);
    setIsLoading(false);
  };

  useFirebase(firebase => {
    setIsLoading(true);
    firebase
      .firestore()
      .collection('courses')
      .doc(props.course)
      .get()
      .then(doc => {
        rawData = doc.data().OH;
        updateCourseData(firebase);
      });
  }, []);

  useFirebase(
    firebase => {
      setIsLoading(true);
      updateCourseData(firebase);
    },
    [props.selectedDay, rawData]
  );

  return (
    <div className="container">
      {!isLoading ? (
        timeSlots.length > 0 ? (
          bundleCourses(timeSlots).map((hour, idx) => (
            <AvailabilityDropdown
              hour={hour}
              key={idx}
              courses={courseData}
              course={props.course}
              day={dayMap[props.selectedDay]}
              times={timeSlots}
            />
          ))
        ) : (
          <p>No TAs are scheduled for today.</p>
        )
      ) : (
        <div className="box is-loading">
          <progress className="progress is-medium is-grey-lighter" max="100" />
        </div>
      )}
    </div>
  );
};

export default AvailabilityList;
