import { H4, Input, YGroup, Button, YStack } from "tamagui";

import { useState } from "react";
import axios from "axios";

import { useSession } from "../contexts/AuthContext";

interface LoginForm {
  email?: string;
  password?: string;
}
export default function LoginForm({ setOpen }: any) {
  const { signIn } = useSession();

  const [form, setForm] = useState<LoginForm>();
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = () => {
    axios
      .post(
        "https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/users/login",
        form,
      )
      .then((response: any) => {
        let user = response.data.data.user;
        let userString = JSON.stringify(user);
        signIn(response.data.data.token, userString);
        setOpen(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };
  return (
    <>
      <H4>Login</H4>

      <YStack space="$3">
        <YGroup>
          <YGroup.Item>
            <Input
              size="$6"
              onChange={handleChange}
              placeholder="email"
              value={form?.email}
              id="email"
            />
          </YGroup.Item>
  {/*         <YGroup.Item>
            <Input
              size="$6"
              onChange={handleChange}
              placeholder="full name"
              value={form?.full_name}
              id="full_name"
            />
          </YGroup.Item> */}
          <YGroup.Item>
            <Input
              size="$6"
              onChange={handleChange}
              placeholder="password"
              value={form?.password}
              id="password"
            />
          </YGroup.Item>
        </YGroup>
        <Button onPress={handleSubmit}>Go</Button>
      </YStack>
    </>
  );
}
