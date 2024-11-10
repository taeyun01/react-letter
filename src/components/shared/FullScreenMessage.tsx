import styles from './FullScreenMessage.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface FullScreenMessageProps {
  type: 'loading' | 'error' // loading과 error 타입을 받음 (이 값에 따라서 컴포넌트를 다르게 표시)
}

const FullScreenMessage = ({ type }: FullScreenMessageProps) => {
  return (
    <div className={cx('container')}>
      {type === 'loading' ? (
        <HeartIcon />
      ) : (
        <>
          <ErrorIcon />
          <p>에러가 발생했어요. 잠시후 다시 시도해주세요.</p>
        </>
      )}
    </div>
  )
}

const HeartIcon = () => {
  return (
    <svg
      className={cx('heart-icon')}
      version="1.1"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(0 -1028.4)">
        <path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" />
      </g>
    </svg>
  )
}

const ErrorIcon = () => {
  return (
    <svg
      className={cx('error-icon')}
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
      <path d="M4 16v2a2 2 0 0 0 2 2h2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v2" />
      <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <path d="M9.5 15.05a3.5 3.5 0 0 1 5 0" />
    </svg>
  )
}

export default FullScreenMessage
