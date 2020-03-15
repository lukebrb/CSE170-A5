import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import { parse, format } from 'date-fns/esm/fp';
// Components
import Collapsible from 'react-collapsible';
import { Link } from 'gatsby';

window.gtag = () => {};
/**
 * The dict given from the Firebase cloud function looks something like this:
 * {"monday": {1:00: {questions: [], timeVal}}}
 */
export default ({ isShowingAll, dayItems, metadata }) => {
  const Loading = () => (
    <div className="box is-loading">
      <progress className="progress is-medium is-grey-lighter" max="100" />
    </div>
  );

  const Dropdowns = () => {
    if (R.isEmpty(dayItems))
      return <h3>There are no available appointments today.</h3>;
    let items = splitByHour(dayItems);

    return items.map((slotData, idx) => (
      <TimeDropdown
        data={slotData}
        key={idx}
        metadata={metadata}
        isShowingAll={isShowingAll}
      />
    ));
  };
  return (
    <div className="container">
      {dayItems != undefined ? <Dropdowns /> : <Loading />}
    </div>
  );
};

/**
 * Sub-Components
 */

// Contains up to 4 15-min marks
const TimeDropdown = ({ data, metadata, isShowingAll }) => {
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    if (!isShowingAll) {
      setIsHidden(dropdownIsEmpty(data));
    }
  }, [isShowingAll]);
  return isHidden ? null : (
    <Collapsible
      trigger={getHour(data)}
      transitionTime={200}
      triggerTagName="div"
      key={getHour(data)}
      onOpen={() => {
        if (typeof window !== undefined) {
          window.gtag('event', 'open-timeslot-dropdown-A', {
            event_category: 'timeslot-dropdown',
            event_label: 'user opened timeslot dropdown',
          });
        }
      }}
      onClose={() => {
        if (typeof window !== undefined) {
          window.gtag('event', 'close-timeslot-dropdown-A', {
            event_category: 'timeslot-dropdown',
            event_label: 'user closed timeslot dropdown-A',
          });
        }
      }}
    >
      {data.map(quarterHour => (
        <Slot
          quarterHour={quarterHour}
          key={getMinute(quarterHour)}
          metadata={metadata}
          isShowingAll={isShowingAll}
        />
      ))}
    </Collapsible>
  );
};

// Each individual 15-min mark is encapsulated here.
const Slot = ({ quarterHour, metadata, isShowingAll }) => {
  const [time, { questions }] = R.head(quarterHour);
  if (R.isEmpty(questions.filter(q => q.question === '')) && !isShowingAll) {
    return null;
  }
  return (
    <>
      {time}
      <br />
      {questions.map(({ answer, location, question, TA }, idx) =>
        !isShowingAll && question !== '' ? null : (
          <div
            className="container"
            key={answer + location + question + TA + idx}
          >
            <div className="notification">
              <ul>
                <li>{location}</li>
                <li>{question}</li>
                <li>{answer}</li>
                <li>{TA}</li>
              </ul>
              {question === '' ? (
                <BookButton
                  time={time}
                  course={metadata.course}
                  day={metadata.selectedDay}
                  location={location}
                  TA={TA}
                />
              ) : (
                <Link
                  to={`/view-question?question=${question}&location=${location}&answer=${answer}&TA=${TA}`}
                >
                  View question
                </Link>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
};

const BookButton = ({ time, course, day, location, TA }) => (
  <Link
    to={`/input-question?course=${course}&time=${time}&day=${day}&location=${location}&TA=${TA}`}
    className="button"
  >
    Book
  </Link>
);
/**
 * Functions
 */
const groupByTimeVal = R.groupWith((a, b) => R.eqProps('timeVal', a[1], b[1]));
// Don't judge, but it looks like we need this one too:
const groupByTimeValAgain = R.groupWith((a, b) =>
  R.equals(getTimeVal(a), getTimeVal(b))
);
// Self-explanatory
const getTimeVal = R.path([0, 1, 'timeVal']);
const getHour = R.pipe(
  R.tap(console.log),
  R.path([0, 0, 1, 'timeVal']),
  R.tap(console.log),
  status => (status === undefined ? 0 : status),
  parse(new Date(), 'H'),
  R.tap(console.log),
  format('h b')
);
const getMinute = R.pipe(R.path([0, 0]), R.split(':', R.__), R.last, parseInt);

// Compares two timeslot items, and sorts them based on two separate properties
const diffTimes = (a, b) => {
  const timeVals = R.map(getTimeVal, [a, b]);
  if (R.equals(timeVals[0], timeVals[1])) {
    return getMinute(a) - getMinute(b);
  }
  return timeVals[0] - timeVals[1];
};

const splitByHour = R.pipe(
  R.toPairs,
  groupByTimeVal,
  R.sort(diffTimes, R.__),
  groupByTimeValAgain // Messy, but it works.
);

// const filterAvailable = R.pipe(
//   R.map,
//   R.map,
//   R.map,
//   R.path([1, 'questions']),
//   R.filter(R.isEmpty(R.prop('question')))
// );

// Sloppy, but if there's a better way using FP lmk
const filterAvailable = finalData =>
  finalData.map(i =>
    i.map(j =>
      j.map(k => k[1]['questions'].filter(({ question }) => question === ''))
    )
  );

function dropdownIsEmpty(data) {
  for (let qHour of data) {
    const [time, { questions }] = R.head(qHour);
    if (!R.isEmpty(questions.filter(q => R.isEmpty(q.question)))) {
      return false;
    }
  }
  return true;
}
