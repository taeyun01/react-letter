import classNames from 'classnames/bind'
import styles from './Share.module.scss'
import Section from '../shared/Section'
import { useEffect } from 'react'
import { parseISO, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Wedding } from '../../models/wedding'

const cx = classNames.bind(styles)

declare global {
  interface Window {
    Kakao: any
  }
}

interface ShareProps {
  groomName: string
  brideName: string
  date: string
  wedding: Wedding
}

// 카카오맵은 소문자 kakao 객체고, 카카오톡공유는 대문자 Kakao 이므로 주의
const Share = ({ date, wedding }: ShareProps) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.3/kakao.min.js'
    script.async = true

    document.head.appendChild(script)

    script.onload = () => {
      // console.log(window)
      // isInitialized 메서드는 카카오 SDK가 초기화되었는지 확인하는 메서드 (boolean을 반환) (즉 SDK를 사용할 준비가 됐는지 확인)
      // 초기화가 되었는지 판단. 안되었으면 init메서드를 이용해 초기화 해준다.
      if (!window.Kakao.isInitialized()) {
        // init 메서드는 카카오 객체를 사용할 준비를 해주는 메서드
        window.Kakao.init(import.meta.env.VITE_APP_KAKAO_API_KEY)
      }
    }
  }, [])
  //* console.log(window) // 카카오 SDK가 초기화되면 window에 Kakao라는 객체가 다른 프로퍼티들이 추가로 생긴다.

  const handleShareCount = async () => {
    try {
      await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/wedding`, {
        method: 'PUT',
        body: JSON.stringify({
          ...wedding,
          shareCount: wedding.shareCount + 1,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleShareKakao = async () => {
    await handleShareCount()

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `사랑하는 횰랭이에게 ❤️`,
        description: `${format(parseISO(date), 'M월 d일 eeee', {
          locale: ko,
        })}`,
        imageUrl:
          'https://res.cloudinary.com/dxq8lly54/image/upload/v1731201338/picture_u78r2x.jpg',
        link: {
          // 이미지를 클릭했을때 이동할 링크 ([내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함)
          mobileWebUrl: window.location.origin, // origin => http://localhost:5173/
          webUrl: window.location.origin,
        },
      },
      buttons: [
        {
          title: '편지 보기',
          link: {
            mobileWebUrl: window.location.origin,
            webUrl: window.location.origin,
          },
        },
      ],
    })
  }

  return (
    <Section title="공유하기" className={cx('container')}>
      <div className={cx('wrap-share')}>
        <button onClick={handleShareKakao}>
          <KakaoIcon className={cx('kakao-share')} />
          <p>
            카카오톡 <br />
            공유
          </p>
        </button>

        <CopyToClipboard
          text={window.location.origin}
          onCopy={() => {
            alert('복사가 완료되었습니다.')
          }}
        >
          <button>
            <ClipboardIcon className={cx('link-share')} />
            <p>
              링크 <br />
              복사
            </p>
          </button>
        </CopyToClipboard>
      </div>
    </Section>
  )
}

const KakaoIcon = ({ className }: { className: string }) => {
  return (
    <svg className={className} viewBox="0 0 135.46666 135.46667">
      <g id="layer1">
        <circle
          cx="67.73333"
          cy="67.73333"
          id="path850"
          r="67.73333"
          style={{ fill: '#ffe227', strokeWidth: '0.132292' }}
        />
        <g
          id="g1000"
          style={{ strokeWidth: '0.938309' }}
          transform="matrix(1.0657475,0,0,1.0657475,-4.4532963,-4.4532983)"
        >
          <path
            d="M 67.594373,28.816763 A 42.191248,33.485241 0 0 0 25.542208,62.301837 42.191248,33.485241 0 0 0 44.655432,90.333198 c -1.925815,6.013156 -4.736875,15.417782 -3.717475,16.247782 1.083839,0.88245 12.715951,-6.914279 19.147596,-11.348434 a 42.191248,33.485241 0 0 0 7.647776,0.555096 42.191248,33.485241 0 0 0 42.191121,-33.485805 42.191248,33.485241 0 0 0 -42.191121,-33.485074 42.191248,33.485241 0 0 0 -0.13895,0 z"
            id="path900"
            style={{ fill: '#1a1a1a', stroke: 'none', strokeWidth: '0.124131' }}
          />
          <g
            id="g962"
            style={{ strokeWidth: '0.615119' }}
            transform="matrix(1.5254102,0,0,1.5254102,-37.735311,-33.441939)"
          >
            <path
              d="m 182.63281,207.49609 c -3.60965,0 -6.51562,2.90598 -6.51562,6.51563 v 0.0254 c 0,3.60965 2.90597,6.51562 6.51562,6.51562 h 10.18164 v 39.1836 c 0,3.61653 2.91276,6.52734 6.5293,6.52734 3.61654,0 6.52734,-2.91081 6.52734,-6.52734 v -39.1836 h 10.4668 c 3.60965,0 6.51563,-2.90597 6.51563,-6.51562 v -0.0254 c 0,-3.60965 -2.90598,-6.51563 -6.51563,-6.51563 h -16.99414 z"
              id="rect910"
              style={{
                fill: '#ffe227',
                fillOpacity: '1',
                stroke: 'none',
                strokeWidth: '0.307561',
              }}
              transform="scale(0.26458333)"
            />
            <path
              d="m 237.28906,207.47461 a 7.6489301,7.6489301 0 0 0 -2.01367,0.26953 c -2.32898,0.27299 -4.42527,1.79364 -5.32812,4.14258 l -17.51954,45.57617 c -1.29753,3.37576 0.37621,7.13802 3.75196,8.43555 3.37575,1.29752 7.13801,-0.37424 8.43554,-3.75 l 2.6543,-6.90821 h 20.32227 l 2.65625,6.90821 c 1.29753,3.37576 5.0598,5.04752 8.43554,3.75 3.37576,-1.29753 5.04753,-5.05979 3.75,-8.43555 l -17.51757,-45.57617 c -0.95632,-2.48803 -3.25162,-4.04521 -5.74414,-4.17578 a 7.6489301,7.6489301 0 0 0 -1.88282,-0.23633 z m 0.14258,21.33008 5.14258,13.3789 h -10.28516 z"
              id="rect923"
              style={{
                fill: '#ffe227',
                fillOpacity: '1',
                stroke: 'none',
                strokeWidth: '0.307561',
              }}
              transform="scale(0.26458333)"
            />
            <path
              d="m 273.00391,207.49609 c -3.68524,0 -6.65039,2.96711 -6.65039,6.65235 v 45.46289 c 0,3.68524 2.96515,6.65234 6.65039,6.65234 h 20.15234 c 3.68524,0 6.65234,-2.9671 6.65234,-6.65234 0,-3.68524 -2.9671,-6.65235 -6.65234,-6.65235 h -13.5 v -38.81054 c 0,-3.68524 -2.96711,-6.65235 -6.65234,-6.65235 z"
              id="rect941"
              style={{
                fill: '#ffe227',
                fillOpacity: '1',
                stroke: 'none',
                strokeWidth: '0.307561',
              }}
              transform="scale(0.26458333)"
            />
            <path
              d="m 308.91602,207.49609 c -3.68524,0 -6.65235,2.96711 -6.65235,6.65235 v 45.46289 c 0,3.68524 2.96711,6.65234 6.65235,6.65234 3.68523,0 6.65039,-2.9671 6.65039,-6.65234 v -13.96485 c 0.0686,-0.0646 0.14056,-0.12337 0.20703,-0.1914 l 2.32031,-2.375 15.47461,20.5625 c 2.21592,2.94463 6.36984,3.53231 9.31445,1.3164 2.94461,-2.2159 3.53038,-6.37177 1.31446,-9.3164 l -16.69922,-22.18946 14.0625,-14.39453 c 2.57528,-2.63607 2.52695,-6.83308 -0.10743,-9.41015 -2.63434,-2.57704 -6.82901,-2.52866 -9.40429,0.10742 l -16.48242,16.87109 v -12.47851 c 0,-3.68524 -2.96516,-6.65235 -6.65039,-6.65235 z"
              id="rect945"
              style={{
                fill: '#ffe227',
                fillOpacity: '1',
                stroke: 'none',
                strokeWidth: '0.307561',
              }}
              transform="scale(0.26458333)"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

const ClipboardIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title />
      <g data-name="1" id="_1">
        <path d="M149.67,393A95.49,95.49,0,0,1,82.11,230l64.7-64.7a95.65,95.65,0,0,1,135.1,0h0a95.65,95.65,0,0,1,0,135.11l-64.69,64.69A95.23,95.23,0,0,1,149.67,393Zm64.69-225.69A65.29,65.29,0,0,0,168,186.49l-64.7,64.7A65.53,65.53,0,0,0,196,343.86l64.7-64.7a65.51,65.51,0,0,0-46.34-111.84Z" />
        <path d="M295.9,360.71a95,95,0,0,1-24.13-3.1,15,15,0,0,1,7.6-29,65.52,65.52,0,0,0,62.87-17.08l64.7-64.69a65.53,65.53,0,0,0-92.68-92.68l-64.69,64.7a65.84,65.84,0,0,0-17.08,62.89,15,15,0,0,1-29,7.55,95.92,95.92,0,0,1,24.9-91.65l64.69-64.7A95.53,95.53,0,1,1,428.15,268l-64.69,64.69A94.92,94.92,0,0,1,295.9,360.71Z" />
      </g>
    </svg>
  )
}

export default Share
