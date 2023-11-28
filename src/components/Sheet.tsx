

import { Sheet, SheetProps, useSheet } from '@tamagui/sheet'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Link } from 'expo-router'
import { Button, H1, H3, Input, Paragraph, XStack, YStack, Separator, AnimatePresence, Text } from 'tamagui'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useSession } from '../contexts/AuthContext'
import SwipeableTabs from "react-native-swipe-tabs"
export const SheetDemo = () => {

  const [position, setPosition] = useState(0)

  const [open, setOpen] = useState(true)

  const [modal, setModal] = useState(true)

  const { session, signOut } = useSession();

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);


  

  return (

    <>

      <Sheet
        forceRemoveScrollEnabled={open}
        modal={modal}
        open={open}
        onOpenChange={setOpen}
        dismissOnSnapToBottom
        position={position}
        snapPoints={[90]}
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
        <Sheet.Frame padding="$4" space="$5"
        
        
        >
          <AnimatePresence>

            {showLoginForm ? (
              <>
                <YStack
                  animation="medium"
                  enterStyle={{
                    opacity: 0,
                    y: 10,
                    scale: 0.9,
                  }}
                  exitStyle={{
                    opacity: 0,
                    y: -10,
                    scale: 0.9,
                  }}
                  key="login"
                >
                  <XStack space="$3">
                    <Button width={'$10'} mb={'$5'} onPress={() => {setShowLoginForm(false)}}>Back</Button>
                    <H3 textAlign='right'>Login</H3>
                  </XStack>
                  <LoginForm/>
                </YStack>
              </>
            ) : showRegisterForm ? (
              <>
                <YStack
                  animation="medium"
                  enterStyle={{
                    opacity: 0,
                    y: 10,
                    scale: 0.9,
                  }}
                  exitStyle={{
                    opacity: 0,
                    y: -10,
                    scale: 0.9,
                  }}
                  key="register"
                >
                  <XStack space="$3">
                    <Button width={'$10'} mb={'$5'} onPress={() => {setShowRegisterForm(false)}}>Back</Button>
                    <H3 textAlign='right'>Register</H3>
                  </XStack>
                  <RegisterForm setOpen={setOpen}/>
                </YStack>
              </>
            ) : (
              <>
                <YStack
                  space="$5"
                  key="home-login"
                  animation="medium"
                  enterStyle={{
                    opacity: 0,
                    y: 10,
                    scale: 0.9,
                  }}
                  exitStyle={{
                    opacity: 0,
                    y: -10,
                    scale: 0.9,
                  }}
                >
                  <H3>Welcome to the</H3>
                  <H1 color={'$purple10'}>App Store</H1>
                  <Button bc={'$purple10'} onPress={() => {setShowRegisterForm(true)}} size="$6" theme="active">
                    Create a new account
                  </Button>
                  <Button borderColor={'$purple10'} onPress={() => {setShowLoginForm(true)}} size="$6" variant="outlined">
                    Sign in
                  </Button>
                </YStack>
              </>
            )}
        
            
            
         
          </AnimatePresence>
           
        
        

        </Sheet.Frame>

      </Sheet>

    </>

  )

}