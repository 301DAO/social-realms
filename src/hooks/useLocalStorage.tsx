import * as React from 'react';

export function useLocalStorage(key: string, initialState: any) {
  const [ value, setValue ] = React.useState(
    localStorage.getItem(key) ?? initialState
  )
  const updatedSetValue = React.useCallback(
    newValue => {
      if (newValue === initialState || typeof newValue === 'undefined') {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, newValue)
      }
      setValue(newValue ?? initialState)
    },
    [ initialState, key ]
  )
  return [ value, updatedSetValue ]
}