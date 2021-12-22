import styled from '@emotion/styled'
import { Button, Grid } from '@geist-ui/react'
import Router from 'next/router'
import * as React from 'react'

const Container = styled.div`
  height: 35px;
  display: flex;
  flex-direction: column;
  width: 15%;
`

type RoutingButtonProps = {
  text: string
  pathname: string
}

// TODO: styling for the button
export const RoutingButton = ({ text, pathname }: RoutingButtonProps) => {
  const onButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    Router.push(pathname)
  }
  return (
    <Container>
      <Grid.Container direction="row" gap={1} justify="center">
        <Grid>
          <Button
            auto
            type="secondary"
            //loading={loading}
            onClick={onButtonClick}
          >
            {text}
          </Button>
        </Grid>
      </Grid.Container>
    </Container>
  )
}
