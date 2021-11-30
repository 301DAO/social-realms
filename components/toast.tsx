// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";
import { Button, useToasts } from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
// TODO: how dooo?
export const ToastPopup = ({
  message,
  type,
  ...rest
}: any) => {
  const [, setToast] = useToasts()
  const action = {
    name: "help",
    handler: () => alert("Help!"),
  }
  const onActionClick = () => setToast({text: message, actions: [action],})
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <Button message={message} type={type} {...rest} />;
};
