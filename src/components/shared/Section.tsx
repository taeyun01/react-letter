import classNames from 'classnames/bind'
import styles from './Section.module.scss'

const cx = classNames.bind(styles)

const Section = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode
  className?: string
  title?: React.ReactNode // title을 컴포넌트 레벨로 받을 수 있게 수정(ReactNode안에 string이 기본적으로 포함돼 있음)
}) => {
  return (
    <section className={cx(['container', className])}>
      {title && <div className={cx('title')}>{title}</div>}
      {children}
    </section>
  )
}

export default Section
