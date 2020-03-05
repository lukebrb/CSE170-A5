import React, { useEffect, useState } from 'react';
import {
  range,
  lensProp,
  set,
  split,
  compose,
  head,
  partial,
  partialRight,
} from 'ramda';
import { getDate, addDays, format, formatRelative, getDay } from 'date-fns';

const DAYS_TO_VIEW = 7;

// The minicalendar itself.
export default ({ updateDay }) => {
  const [dates, setDates] = useState(getDays());
  const [currDateOffset, setCurrDateOffset] = useState(0);

  useEffect(() => {
    updateDay(dates[0].index);
  }, []);

  const DateButtons = () =>
    dates.map(({ number, symbol, isSelected, index }, idx) => (
      <li key={number}>
        <a
          onClick={e => {
            e.stopPropagation();
            updateDay(index); // Callback function to parent element
            setDates(asSelected(dates, idx));
            setCurrDateOffset(idx);
          }}
          className={`pagination-link content is-size-7 ${
            isSelected ? 'is-pressed' : ''
          }`}
        >
          {symbol} <br></br> {number}
        </a>
      </li>
    ));

  return (
    <>
      <br />
      <nav className="pagination" role="navigation" aria-label="pagination">
        <ul className="pagination-list date-tray">
          <DateButtons />
        </ul>
      </nav>{' '}
      <h1 className="content is-size-5 is-capitalized">
        {getRelativeDate(currDateOffset)}
      </h1>
    </>
  );
};

/**
 * Helper functions
 */

// Auto generate the days and new symbols
const getDays = () =>
  range(0, DAYS_TO_VIEW).map(offset => ({
    symbol: format(addDays(new Date(), offset), 'EEEEEE'),
    index: getDay(addDays(new Date(), offset)) - 1,
    number: getDate(addDays(new Date(), offset)),
    isSelected: offset === 0 ? true : false,
  }));

// Update state to reflect which item is selected
const asSelected = (currState, indexToChange) =>
  currState.map((date, idx) => {
    const slens = lensProp('isSelected');
    return set(slens, indexToChange === idx, date);
  });

// Gets the relative date by offset
const getRelativeDate = compose(
  head,
  partial(split, [' ']),
  partialRight(formatRelative, [new Date()]),
  partial(addDays, [new Date()])
);
