import moment from "moment"
import { take, sort, sortBy, prop } from "ramda"

// Takes in an array of promises, outputs an array of the
// 3 TAs with the closest times
export default (num, taArr) => {
  if (typeof taArr === undefined) return
  const now = moment()
  const candidates = []

  taArr.map(ta => {
    const dayIndex = now.day() - 1
    const todaysHours = ta["hours"][dayIndex]
    if (todaysHours == undefined) {
      return
    }
    const validHours = todaysHours.filter(taHour => {
      return taHour >= now.hour()
    })
    validHours.map(validHour => {
      candidates.push({
        name: ta["name"],
        course: ta["course"],
        hour: validHour,
      })
    })
  })

  const sortByHour = sortBy(prop("hour"))
  return take(num, sortByHour(candidates))
}
