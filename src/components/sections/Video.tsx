import classNames from 'classnames/bind'
import styles from './Video.module.scss'
import Section from '../shared/Section'

const cx = classNames.bind(styles)

const Video = () => {
  return (
    <Section className={cx('container')}>
      {/* video 태그에 src속성을 주어 파일을 지정해주면 source 태그는 안써도됨. 비디오 여러개 써야할 때는 source 태그 써야함. */}
      <video
        // autoPlay={true}
        muted={true}
        // loop={true}
        // controls={true} // 컨트롤 표시 후 autoplay를 끄면 poster 확인가능
        poster="/assets/poster.jpg" // 비디오가 로드되기 전에 보여줄 이미지
      >
        {/* webm을 지원하지 않는 브라우저는 mp4를 보여줌, webm으로 변환하다 끊김현상이 있어 mp4 표시 */}
        <source src="/assets/main.mp4" type="video/mp4" />
        <source src="/assets/main.webm" type="video/webm" />
      </video>
    </Section>
  )
}

export default Video
