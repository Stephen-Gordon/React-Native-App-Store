import { Sheet, SheetProps, useSheet } from "@tamagui/sheet";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import {
  Button,
  H1,
  H3,
  Input,
  Paragraph,
  XStack,
  YStack,
  Separator,
  AnimatePresence,
  Text,
  Stack,
} from "tamagui";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import { useSession } from "../../contexts/AuthContext";
import { SafeAreaView } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function Modal() {
  const [position, setPosition] = useState(0);

  const [open, setOpen] = useState(true);

  const [modal, setModal] = useState(true);

  const { session, signOut } = useSession();

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    if (session) {
      setOpen(false);
    }
  }, []);

  const isPresented = router.canGoBack();
  return (
    <>
      <SafeAreaView>
        <Stack padding="$4">
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
                  <YStack padding="$4">
                    <AntDesign

                      onPress={() => {
                        setShowLoginForm(false);
                      }} name="back" size={24} color="grey" />
                    <H3 mt="$4">Login</H3>

                  </YStack>
                  <LoginForm setOpen={setOpen} />
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
                  <YStack padding="$4">
                    <AntDesign

                      onPress={() => {
                        setShowRegisterForm(false);
                      }} name="back" size={24} color="grey" />
                    <H3 mt="$4">Register</H3>

                  </YStack>
                  <RegisterForm />
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
                  <YStack alignItems="center">
                    <H3>Welcome to the</H3>
                    <H1 color={"$purple10"}>App Store</H1>
                  </YStack>
                  <Button
                    bc={"$purple10"}
                    onPress={() => {
                      setShowRegisterForm(true);
                    }}
                    size="$6"
                    theme="active"
                  >
                    Create a new account
                  </Button>
                  <Button
                    borderColor={"$purple10"}
                    onPress={() => {
                      setShowLoginForm(true);
                    }}
                    size="$6"
                    variant="outlined"
                  >
                    Sign in
                  </Button>
                </YStack>
              </>
            )}
          </AnimatePresence>
        </Stack>
      </SafeAreaView>
    </>
  );
}
