import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(utc)
dayjs.extend(duration)
dayjs.utc().local()
dayjs.extend(isBetween)
