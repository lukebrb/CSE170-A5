import React from "react"
import moment from "moment"

const dates = [
  {
    symbol: "M",
    number: moment()
      .day(1)
      .date(),
  },
  {
    symbol: "Tu",
    number: moment()
      .day(2)
      .date(),
  },
  { symbol: "W", number: 19 },
  { symbol: "Th", number: 20 },
  { symbol: "F", number: 21 },
  { symbol: "Sa", number: 22 },
  { symbol: "Su", number: 23 },
]

const MiniCalendar = () => (
  <nav className="pagination" role="navigation" aria-label="pagination">
    <ul className="pagination-list">
      {dates.map(date => (
        <li key={date.number}>
          <a className="pagination-link content is-size-7">
            {date.symbol} <br></br> {date.number}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

export default MiniCalendar
