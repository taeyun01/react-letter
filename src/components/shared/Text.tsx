import React from 'react'
// <Text>{'안녕하세요\n줄바꿈이되나요'}</Text>
// 안녕하세요
// 줄바꿈이되나요

// 줄바꿈을 지원해주는 텍스트 컴포넌트 구현
const Text = ({ children }: { children: string }) => {
  const message = children.split('\n').map((str, idx, array) => {
    return (
      <React.Fragment key={idx}>
        {str}
        {idx === array.length - 1 ? null : <br />}
      </React.Fragment>
    )
  })

  return <div style={{ letterSpacing: '0.8px' }}>{message}</div>
}

export default Text
