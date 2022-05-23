export const getUUID = () => {
  const uuid = 'xxxxxxxx-xxxx-4xxx-Zxxx-xxxxxxxxxxxx'.split('')
  const len = uuid.length
  for (let i = 0; i < len; i += 1) {
    switch (uuid[i]) {
      case '4':
        break
      case '-':
        break
      case 'x':
        uuid[i] = Math.floor(Math.random() * 16).toString(16)
        break
      case 'Z':
        uuid[i] = (Math.floor(Math.random() * 4) + 8).toString(16)
        break
      default:
        break
    }
  }
  return uuid.join('')
}

export const addTime = ({
  date,
  day,
  hour,
  minutes
}: {
  date: Date
  day?: number
  hour?: number
  minutes?: number
}): Date => {
  let ts = date.getTime()
  if (minutes !== undefined) {
    ts += 1000 * 60 * minutes
  }
  if (hour !== undefined) {
    ts += 1000 * 60 * 60 * hour
  }
  if (day !== undefined) {
    ts += 1000 * 60 * 60 * 24 * day
  }
  return new Date(ts)
}
