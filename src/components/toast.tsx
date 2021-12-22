import { Button, useToasts } from '@geist-ui/react'
import * as React from 'react'
// TODO: how dooo?
export const ToastPopup = ({ message, type, ...rest }: any) => {
  const [ , setToast ] = useToasts()
  const action = {
    name: 'help',
    handler: () => alert('Help!'),
  }
  const onActionClick = () => setToast({ text: message, actions: [ action ] })

  return <Button message={message} type={type} {...rest} />
}
