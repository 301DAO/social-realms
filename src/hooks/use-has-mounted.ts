import * as React from 'react'

export const useHasMounted = () => {
  const hasMounted = React.useRef(false)
  React.useEffect(() => {
    if (typeof window !== 'undefined') hasMounted.current = true
    return () => {
      hasMounted.current = false
    }
  }, [])
  return hasMounted.current
}
