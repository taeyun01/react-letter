import { useEffect, useRef } from 'react'
import { useModalContext } from '../../contexts/ModalContext'
import { Wedding } from '../../models/wedding'

// 단순히 모달을 띄어주는 역할만 해서 UI를 그리진 않음
const AttendCountModal = ({ wedding }: { wedding: Wedding }) => {
  const { open, close } = useModalContext()
  const inputRef = useRef<HTMLInputElement>(null)

  const haveSeenModal = localStorage.getItem('@haveSeenModal')

  useEffect(() => {
    open({
      title: `비 밀 번 호 는 ? ! ? !`,
      body: <AttendCountInput inputRef={inputRef} />,
      // onLeftButtonClick: () => {
      //   localStorage.setItem('@haveSeenModal', 'true')
      //   close()
      // },
      onRightButtonClick: async () => {
        // console.log(inputRef.current?.value)
        if (!inputRef.current?.value) {
          alert('비밀번호를 입력해주세요')
          return
        }
        if (
          inputRef.current?.value !== `${import.meta.env.VITE_APP_PASSWORD}`
        ) {
          alert('비밀번호가 틀렸습니다.')
          return
        }

        close()
      },
    })
  }, [open, close, wedding, haveSeenModal])
  // open, close를 의존성 배열에 넣으면 무한 렌더링 발생 (그 이유는 모달 컴포넌트가 렌더링될 때마다 open, close가 호출되기 때문)
  // ModalContext가 새로 그려지면서 open, close 함수도 새롭게 만들어지고 useEffect는 open, close도 새로운 애라고 판단을 하면서 계속 리렌더링. 즉 무한루프가 발생
  return null
}

const AttendCountInput = ({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement>
}) => {
  return (
    <input
      ref={inputRef}
      type="password"
      placeholder="비밀번호를 입력해주세요"
      style={{
        width: '100%',
        border: 'none',
        borderBottom: '0.6px solid var(--black)',
        paddingBottom: '8px',
        paddingLeft: '4px',
        outline: 'none',
      }}
    />
  )
}

export default AttendCountModal
