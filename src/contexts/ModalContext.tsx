import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import Modal from '../components/shared/Modal'
import { createPortal } from 'react-dom'

type ModalProps = ComponentProps<typeof Modal>
// open({open: true}) -> open은 어차피 true인데 open을 받게 하는게 어색하므로 open 타입 제외
type ModalOptions = Omit<ModalProps, 'open'> // ModalProps에서 open이 제외된 타입

interface ModalContextValue {
  open: (options: ModalOptions) => void
  close: () => void
}

const Context = createContext<ModalContextValue | undefined>(undefined)

const defaultValues: ModalProps = {
  open: false,
  body: null,
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
}

const ModalContext = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState<ModalProps>(defaultValues)

  const $portalRoot = document.getElementById('root-portal')

  // 매번 새롭게 생기지 않도록 useCallback 사용
  const open = useCallback((options: ModalOptions) => {
    setModalState({ ...options, open: true })
  }, [])

  const close = useCallback(() => {
    setModalState(defaultValues)
  }, [])

  // values도 useMemo로 캐싱
  const values = useMemo(
    () => ({
      open,
      close,
    }),
    [open, close], // open, close함수를 의존성으로 갖고 있긴하지망 얘네는 useCallback로 캐싱되어있기 때문에 매번 새롭게 생기지 않음. 리렌더링이 발생하지 않음
  )

  // ContextAPI 같은 경우에는 계속 상태가 업데이트 되면서 하위 자식들을 다 렌더링 시켜버려 성능적으로 안 좋은 부분이 있음(그래서 나중에 useMemo, useCallback 사용)
  return (
    <Context.Provider value={values}>
      {children}
      {$portalRoot && createPortal(<Modal {...modalState} />, $portalRoot)}
    </Context.Provider>
  )
}

// Context를 사용하기 위해서는 항상 최상단에 감싸줘야함
// 예시) 이런식으로 감싸줘야하는데
// <ModalContext>
//   <App />
// </ModalContext>

// <App />
// 위 처럼 감싸주지 않고 App안에서 useModalContext를 사용하려 했을 때 그럴때는 이 박스의 값을 주입 받지 못해서 값이 없음
// 이럴 경우를 대비해서 감싸주지 않았을때 예외처리
export const useModalContext = () => {
  const values = useContext(Context)
  if (!values) {
    throw new Error('ModalContext안에서 사용해주세요')
  }
  return values // 조건을 타지 않으면 정상적으로 값을 반환
}

export default ModalContext
