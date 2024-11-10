import classNames from 'classnames/bind'
import styles from './Calendar.module.scss'
import Section from '../shared/Section'
import { parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { memo } from 'react'

const cx = classNames.bind(styles)

const Calendar = ({ date }: { date: string }) => {
  const weddingDate = parseISO(date)
  // const formattedDate = format(weddingDate, 'yyyy.MM.dd')
  // const formattedTime = format(weddingDate, 'aaa h시 eeee', { locale: ko })

  return (
    <Section className={cx('container')}>
      <div className={cx('wrap-calendar')}>
        <style>{css}</style>
        <DayPicker
          mode="single"
          locale={ko}
          month={weddingDate}
          selected={weddingDate}
          formatters={{
            formatCaption: () => '',
          }}
        />
      </div>
    </Section>
  )
}

// const CalendarHeader = ({
//   formattedDate,
//   formattedTime,
// }: {
//   formattedDate: string
//   formattedTime: string
// }) => {
//   return (
//     <div className={cx('wrap-header')}>
//       <span className={cx('date')}>{formattedDate}</span>
//       <span className={cx('time')}>{formattedTime}</span>
//     </div>
//   )
// }

const css = `
  .rdp-root {
    --rdp-today-color: var(--red);
  }

  .rdp-nav,
  .rdp-month_caption {
    display: none;
  }

  .rdp-day_button {
    cursor: default;
  }

  .rdp-selected > .rdp-day_button {
    border-color: var(--red);
  }
`

export default memo(Calendar)
