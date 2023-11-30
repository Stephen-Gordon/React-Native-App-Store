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
} from "tamagui";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useSession } from "../contexts/AuthContext";

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
                <Button
                  width={"$10"}
                  mb={"$5"}
                  onPress={() => {
                    setShowLoginForm(false);
                  }}
                >
                  Back
                </Button>
                <H3 textAlign="right">Login</H3>
              </XStack>
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
              <XStack space="$3">
                <Button
                  width={"$10"}
                  mb={"$5"}
                  onPress={() => {
                    setShowRegisterForm(false);
                  }}
                >
                  Back
                </Button>
                <H3 textAlign="right">Register</H3>
              </XStack>
              <RegisterForm setOpen={setOpen} />
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
    </>
  );
}
