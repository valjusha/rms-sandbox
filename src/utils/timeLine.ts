export const minCellWidth = 17;

const iterateTimesAttrs = {
  end: 1656104400000,
  start: 1655586000000,
  timeSteps: {
    day: 1,
    hour: 1,
    hour3: 3,
    hour6: 6,
    hour12: 12,
    minute: 0,
    minute5: 5,
    minute15: 15,
    minute30: 30,
    month: 0,
    second: 0,
    year: 0
  },
  unit: "hour3",
  callback: (time, nextTime) => {}
}

export function iterateTimes(start, end, unit, timeSteps, callback) {
  let time

  const iterate = (measureName, amount) => {
    // if (['hour3', 'hour6', 'hour12', 'minute5', 'minute15', 'minute30'].includes(unit)) {
    //   time = moment(start).startOf(measureName).add(amount, `${measureName}s`)
    // } else {
    //   time = moment(start).startOf(measureName)
    // }
    time = moment(start).startOf(measureName)

    if (amount > 1) {
      let value = time.get(measureName)
      time.set(measureName, value - value % amount)
    }

    while (time.valueOf() < end) {
      let nextTime = moment(time).add(amount || 1, measureName)
      callback(time, nextTime)
      time = nextTime
    }
  }

  switch (unit) {
    case 'hour3':
      iterate('hour', timeSteps[unit])
      break
    case 'hour6':
      iterate('hour', timeSteps[unit])
      break
    case 'hour12':
      iterate('hour', timeSteps[unit])
      break
    case 'minute5':
      iterate('minute', timeSteps[unit])
      break
    case 'minute15':
      iterate('minute', timeSteps[unit])
      break
    case 'minute30':
      iterate('minute', timeSteps[unit])
      break
    default:
      iterate(unit, timeSteps[unit])
  }
}

// this function is VERY HOT as its used in Timeline.js render function
// TODO: check if there are performance implications here
// when "weeks" feature is implemented, this function will be modified heavily

/** determine the current rendered time unit based on timeline time span
 *
 * zoom: (in milliseconds) difference between time start and time end of timeline canvas
 * width: (in pixels) pixel width of timeline canvas
 * timeSteps: map of timeDividers with number to indicate step of each divider
 */

// the smallest cell we want to render is 17px
// this can be manipulated to make the breakpoints change more/less
// i.e. on zoom how often do we switch to the next unit of time
// i think this is the distance between cell lines
export const minCellWidth = 17;

export const getMinUnitAttrs = {
  width: 482.4000244140625,
  zoom: 172800000,
  timeSteps: {
    day: 1,
    hour: 1,
    hour3: 3,
    hour6: 6,
    hour12: 12,
    minute: 0,
    minute5: 5,
    minute15: 15,
    minute30: 30,
    month: 0,
    second: 0,
    year: 0
  },
}

export function getMinUnit(zoom, width, timeSteps) {
  // for supporting weeks, its important to remember that each of these
  // units has a natural progression to the other. i.e. a year is 12 months
  // a month is 24 days, a day is 24 hours.
  // with weeks this isn't the case so weeks needs to be handled specially
  let timeDividers = {
    second: 1000,
    minute: 60,
    minute5: 5,
    minute15: 3,
    minute30: 2,
    hour: 2,
    hour3: 3,
    hour6: 2,
    hour12: 2,
    day: 2,
    month: 12,
    year: 1
  }

  let minUnit = 'year'

  // this timespan is in ms initially
  let nextTimeSpanInUnitContext = zoom

  Object.keys(timeDividers).some(unit => {
    // converts previous time span to current unit
    // (e.g. milliseconds to seconds, seconds to minutes, etc)
    nextTimeSpanInUnitContext = nextTimeSpanInUnitContext / timeDividers[unit]

    // timeSteps is "
    // With what step to display different units. E.g. 15 for minute means only minutes 0, 15, 30 and 45 will be shown."
    // how many cells would be rendered given this time span, for this unit?
    // e.g. for time span of 60 minutes, and time step of 1, we would render 60 cells
    const cellsToBeRenderedForCurrentUnit = nextTimeSpanInUnitContext / timeSteps[unit]

    // what is happening here? why 3 if time steps are greater than 1??
    // const cellWidthToUse =
    //   timeSteps[unit] && timeSteps[unit] > 1 ? 3 * minCellWidth : minCellWidth

    // Избавился от magic number = 3 на 168 строчке
    const cellWidthToUse = timeSteps[unit] * minCellWidth

    // for the minWidth of a cell, how many cells would be rendered given
    // the current pixel width
    // i.e. f
    const minimumCellsToRenderUnit = width / cellWidthToUse

    if (cellsToBeRenderedForCurrentUnit < minimumCellsToRenderUnit) {
      // for the current zoom, the number of cells we'd need to render all parts of this unit
      // is less than the minimum number of cells needed at minimum cell width
      minUnit = unit
      return true
    }
  })

  return minUnit
}

// TODO: Вынесяти в пропс компонента DateHeader (Определеят как отображать верхнюю и нижнюю шапку)
// unit одно их значений minute minute5 minute15 minute30...
export function getNextUnit(unit) {
  let nextUnits = {
    second: 'minute',
    minute: 'minute5',
    minute5: 'minute15',
    minute15: 'minute30',
    minute30: 'hour',
    hour: 'hour3',
    hour3: 'hour6',
    hour6: 'hour12',
    hour12: 'day',
    day: 'month',
    month: 'year',
    year: 'year'
  }
  if (!nextUnits[unit]) {
    throw new Error(`unit ${unit} in not acceptable`)
  }
  return nextUnits[unit]
}