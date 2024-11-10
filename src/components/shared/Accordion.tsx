import classNames from 'classnames/bind'
import styles from './Accordion.module.scss'
import { PropsWithChildren, useState } from 'react' // children은 알아서 타입 추론

const cx = classNames.bind(styles)

interface AccordionProps {
  label: string
}

const Accordion = ({ label, children }: PropsWithChildren<AccordionProps>) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className={cx(['wrap-accordion', isOpen && 'open'])}>
      <div className={cx('wrap-header')} onClick={handleClick}>
        <span>{label}</span>
        <ArrowDownIcon className={cx('arrow-down-icon')} />
      </div>

      <div className={cx('wrap-content')}>{children}</div>
    </div>
  )
}

const ArrowDownIcon = ({ className }: { className: string }) => {
  return (
    <svg className={className} viewBox="0 0 512 512">
      <polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 " />
    </svg>
  )
}

export default Accordion
