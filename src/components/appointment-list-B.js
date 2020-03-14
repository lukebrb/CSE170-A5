import React, { useState } from 'react';
import * as R from 'ramda';
import { parse, format } from 'date-fns/esm/fp';
// Components
import Collapsible from 'react-collapsible';
import { Link } from 'gatsby';
import { useEffect } from 'react';

/**
 * The dict given from the Firebase cloud function looks something like this:
 * {"monday": {1:00: {questions: [], timeVal}}}
 */
export default ({ dayItems, metadata }) => {
  const isShowingAll = true; // this never changes for the b-edition

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
      trigger={`${getHour(data)} | ${getNumAvailable(data)} / ${getTotalSlots(
        data
      )} available`}
      transitionTime={200}
      triggerTagName="div"
      key={getHour(data)}
      onOpen={() => {
        if (typeof window !== undefined && typeof window.gtag !== undefined) {
          window.gtag('event', 'open-timeslot-dropdown-B', {
            event_category: 'timeslot-dropdown',
            event_label: 'user opened timeslot dropdown',
          });
        }
      }}
      onClose={() => {
        if (typeof window !== undefined && typeof window.gtag !== undefined) {
          window.gtag('event', 'close-timeslot-dropdown-B', {
            event_category: 'timeslot-dropdown',
            event_label: 'user closed timeslot dropdown',
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
  if (
    R.isEmpty(questions.filter(q => R.isEmpty(q.question))) &&
    !isShowingAll
  ) {
    return null;
  }
  return (
    <>
      {time}
      <br />
      {questions.map(({ answer, location, question, TA }, idx) => {
        if (!isShowingAll && !R.isEmpty(question)) {
          return null;
        }
        return (
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
              {R.isEmpty(question) ? (
                <BookButton
                  time={time}
                  course={metadata.course}
                  day={metadata.selectedDay}
                  location={location}
                  TA={TA}
                />
              ) : null}
            </div>
          </div>
        );
      })}
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
  status => (status === undefined ? new Date() : status),
  R.tap(console.log),
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

function dropdownIsEmpty(data) {
  for (let qHour of data) {
    const [time, { questions }] = R.head(qHour);
    if (!R.isEmpty(questions.filter(q => R.isEmpty(q.question)))) {
      return false;
    }
  }
  return true;
}

function getNumAvailable(data) {
  let count = 0;
  for (let qHour of data) {
    const [time, { questions }] = R.head(qHour);
    if (!R.isEmpty(questions.filter(q => R.isEmpty(q.question)))) {
      count++;
    }
  }
  return count;
}

function getTotalSlots(data) {
  let count = 0;
  for (let qHour of data) {
    const [time, { questions }] = R.head(qHour);
    questions.map(q => count++);
  }
  return count;
}
