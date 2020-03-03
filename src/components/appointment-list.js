import React from 'react';
import * as R from 'ramda';
import { getTime } from 'date-fns';

/**
 * The dict given from the Firebase cloud function looks something like this:
 * {"monday": {1:00: {questions: [], timeVal}}}
 */
export default ({ dayItems }) => {
  const Dropdowns = () => {
    if (dayItems == undefined) return null;
    const items = splitByHour(dayItems);
    return items.map(slotData => <TimeDropdown data={slotData}></TimeDropdown>);
  };
  return (
    <div className="container">
      <Dropdowns />
    </div>
  );
};

/**
 * Sub-Components
 */

// Contains up to 4 15-min marks
const TimeDropdown = ({ data }) =>
  data.map(quarterHour => <Slot quarterHour={quarterHour} />);

// Each individual 15-min mark is encapsulated here.
const Slot = ({ quarterHour }) => {
  const [time, { questions }] = R.head(quarterHour);

  return (
    <>
      {time}
      <br />
      {questions.map(({ answer, location, question, TA }) => (
        <div class="container">
          <div class="notification">
            <ul>
              <li>{answer}</li>
              <li>{location}</li>
              <li>{question}</li>
              <li>{TA}</li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

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
