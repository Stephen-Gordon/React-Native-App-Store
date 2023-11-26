

import { Sheet, SheetProps, useSheet } from '@tamagui/sheet'

import { useState } from 'react'

import { Button, H1, H2, Input, Paragraph, XStack, YStack, Separator } from 'tamagui'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export const SheetDemo = () => {

  const [position, setPosition] = useState(0)

  const [open, setOpen] = useState(true)

  const [modal, setModal] = useState(true)

  

  return (

    <>

      <Sheet
        forceRemoveScrollEnabled={open}
        modal={modal}
        open={open}
        onOpenChange={setOpen}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="medium"
      >

        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Sheet.Handle />

        <Sheet.Frame padding="$4" space="$5">

        <LoginForm/>
        <Separator marginVertical={15} />
        <RegisterForm/>

        </Sheet.Frame>

      </Sheet>

    </>

  )

}