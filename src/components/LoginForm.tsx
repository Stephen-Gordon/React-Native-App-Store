import { H4, Input, YGroup, Button, YStack, Text } from "tamagui";

import { useState } from "react";
import axios from "axios";

import { useSession } from "../contexts/AuthContext";
// form
import { useForm, Controller } from "react-hook-form"
import { router } from "expo-router";

interface LoginForm {
  email?: string;
  password?: string;
}
export default function LoginForm({ setOpen }: any) {


  const { signIn } = useSession();


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "dev@dev.com",
      password: "devdev",
    },
  })

  const onSubmit = async (form: LoginForm) => {
    try {
      // register user
      const response = await axios.post("https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/users/login", form);

      const user = {
        _id: response.data.data.user._id,
        email: response.data.data.user.email,
        full_name: response.data.data.user.full_name,
        role: response.data.data.user.role
      };

      // convert user to json to be stored in local storage
      const jsonUser = JSON.stringify(user);

      // Sign the user in 
      signIn(response.data.data.token, jsonUser);

      router.push({ pathname: `/` });



    } catch (error) {

      console.error(error);

    }
  };
  return (
    <>


      <YStack space="$3" >
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              size="$6"
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && <Text color={"$red10Dark"}>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              size="$6"
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="password"
        />
        {errors.password && <Text color={"$red10Dark"}>This is required.</Text>}







        <Button
          bc={"$purple10"}
          onPress={handleSubmit(onSubmit)}
          size="$6"
          theme="active"
        >
          Sign in
        </Button>
      </YStack>
    </>
  );
}
