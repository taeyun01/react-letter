import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallbackUI?: React.ReactNode
}

// 현재 에러가 발생했는지 여부
interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  // 하위 자식 컴포넌트에서 에러가 발생했을 때 호출되는 메서드
  static getDerivedStateFromError() {
    return { hasError: true } // hasError 상태 true로 업데이트 (폴백 UI가 보이도록 상태를 업데이트)
  }

  // 에러를 감지해 캐치함
  // 이 에러 메시지는 센트리 같은 로그 시스템에 쌓아 주면 됨
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('error: ', error)
    console.log('errorInfo: ', errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackUI ?? <h1>에러가 발생했습니다.</h1> // fallbackUI가 없다면 공통 ui 표출
    }
    return this.props.children // 에러가 발생하지 않았다면 children 반환
  }
}

export default ErrorBoundary
