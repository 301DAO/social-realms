import * as React from 'react'

export function useIsFirstRender(): boolean {
  const isFirst = React.useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}

