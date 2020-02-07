import React from "react"

const dates = [
  { symbol: "M", number: 17 },
  { symbol: "Tu", number: 18 },
  { symbol: "W", number: 19 },
  { symbol: "Th", number: 20 },
  { symbol: "F", number: 21 },
  { symbol: "Sa", number: 22 },
  { symbol: "Su", number: 23 },
]

const MiniCalendar = () => (
  <nav class="pagination" role="navigation" aria-label="pagination">
    <ul class="pagination-list">
      {dates.map(date => (
        <li>
          <a className="pagination-link">
            {date.symbol} <br></br> {date.number}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

export default MiniCalendar
