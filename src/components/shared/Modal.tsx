import Dimmed from './Dimmed'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface ModalProps {
  open: boolean
  title?: string
  body: React.ReactNode
  rightButtonLabel?: string
  onRightButtonClick?: () => void
  leftButtonLabel?: string
  onLeftButtonClick?: () => void
}

const Modal = ({
  open,
  title,
  body,
  // leftButtonLabel = '닫기',
  rightButtonLabel = '확인',
  // onLeftButtonClick,
  onRightButtonClick,
}: ModalProps) => {
  if (!open) return null
  return (
    <Dimmed>
      <div className={cx('wrap-modal')}>
        <div className={cx('wrap-body')}>
          <div className={cx('wrap-content')}>
            {title && <div className={cx('title')}>{title}</div>}
            {body}
          </div>
          <div className={cx('wrap-buttons')}>
            {/* <button onClick={onLeftButtonClick}>{leftButtonLabel}</button> */}
            <button onClick={onRightButtonClick}>{rightButtonLabel}</button>
          </div>
        </div>
      </div>
    </Dimmed>
  )
}

export default Modal
