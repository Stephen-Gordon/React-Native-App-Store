import { H4, Input, YGroup, Button, YStack } from "tamagui";
import { TextInput } from "react-native";
import { useState } from "react";
import axios from "axios";
import { useSession } from "../contexts/AuthContext";
// form
import { useForm, Controller } from "react-hook-form"
import { router } from "expo-router";

interface RegisterForm {
  email?: string;
  password?: string;
  full_name?: string;
}
export default function RegisterForm({ setOpen }: any) {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
    },
  })
  

  const [error, setError] = useState("");
  

  const { signIn } = useSession();

  
  const onSubmit = (form: RegisterForm) => {
    console.log(form);
    axios
      .post("https://festivals-api.vercel.app/api/users/register", form)
      .then((response: any) => {
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          axios
            .post("https://festivals-api.vercel.app/api/users/login", form)
            .then((response: any) => {
              signIn(
                response.data.token,
                JSON.stringify({
                  _id: response.data._id,
                  email: response.data.email,
                /*   full_name: response.data.full_name, */
                }),
              );
              
            })
            .then(() => {
              /* router.push({ pathname: `/` }); */
            })
            .catch((err) => {
              console.error(err);
              setError(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }; 

  return (
    <>
      <YStack space="$3" padding="$2">
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

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
          size="$6"
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="full_name"
      />
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
          />
        )}
        name="password"
      />
   





        <Button
          bc={"$purple10"}
          onPress={handleSubmit(onSubmit)} 
          size="$6"
          theme="active"
        >
          Create a new account
        </Button>
      </YStack>
    </>
  );
}
