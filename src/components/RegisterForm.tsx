import { H4, Input, YGroup, Button, YStack, Text } from "tamagui";
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
export default function RegisterForm() {

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


  const onSubmit = async (form: RegisterForm) => {
    try {
      // register user
      const response = await axios.post("https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/users/register", form);
      console.log(response.data.data.email);

      const user = {
        _id: response.data.data._id,
        email: response.data.data.email,
        full_name: response.data.data.full_name,
        role: response.data.data.role
      };

      // convert user to json to be stored in local storage
      const jsonUser = JSON.stringify(user);

      // Sign the user in 
      signIn(response.data.token, jsonUser);


      router.push({ pathname: `/` });



    } catch (error) {

      console.error(error);

    }
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
        {errors.email && <Text color={"$red10Dark"}>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
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
        {errors.full_name && <Text color={"$red10Dark"}>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
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
          Create
        </Button>
      </YStack>
    </>
  );
}
