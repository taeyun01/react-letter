import classNames from 'classnames/bind'
import styles from './ImageGallery.module.scss'
import Section from '../shared/Section'
import ImageViewer from '../imageViewer'
import { useState } from 'react'
import generateImageUrl from '../../utils/generateImageUrl'

const cx = classNames.bind(styles)

const ImageGallery = ({ images }: { images: string[] }) => {
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const open = selectedIdx !== -1

  const handleSelectImage = (idx: number) => {
    setSelectedIdx(idx)
  }

  const handleCloseImageViewer = () => {
    setSelectedIdx(-1)
  }

  return (
    <>
      <Section title="사진도 많이 찍어야겠다~~~">
        <ul className={cx('wrap-images')}>
          {images.map((image, idx) => (
            <li
              key={`photo-${idx}`}
              className={cx('wrap-image')}
              onClick={() => handleSelectImage(idx)}
            >
              {/* picture태그: 브라우저가 이미지 포맷을 지원하는지 확인 후 지원하는 포맷으로 이미지 표시 */}
              {/* <img src={image} alt="사진첩 이미지" /> */}
              <picture>
                {/* <source srcSet={`${image}.webp`} type="image/webp" /> */}
                <source
                  srcSet={generateImageUrl({
                    fileName: image,
                    format: 'webp',
                    option: 'w_240,h_240,q_auto,c_fill',
                  })}
                  type="image/webp"
                />
                {/* <img src={`${image}.jpg`} alt="사진첩 이미지" /> */}
                <img
                  srcSet={generateImageUrl({
                    fileName: image,
                    format: 'jpg',
                    option: 'w_240,h_240,q_auto,c_fill',
                  })}
                  alt="사진첩 이미지"
                />
              </picture>
            </li>
          ))}
        </ul>
      </Section>
      <ImageViewer
        images={images}
        open={open}
        selectedIdx={selectedIdx}
        onClose={handleCloseImageViewer}
      />
    </>
  )
}

export default ImageGallery
