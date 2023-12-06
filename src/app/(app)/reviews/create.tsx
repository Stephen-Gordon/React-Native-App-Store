import { Text, Stack } from "tamagui";
import { useRouter } from "expo-router";
import { Pressable } from "react-native"
import {TextArea, Button} from 'tamagui';

import { BlurView } from 'expo-blur';
// router
import { useLocalSearchParams } from "expo-router";
//form
import { useForm, Controller } from "react-hook-form"
// contexts
import { useSession } from '../../../contexts/AuthContext'
import axios from "axios";

export default function Page() {

	const router = useRouter();
	const { id } = useLocalSearchParams();
	const { session, user } = useSession();


	const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      	app: id,
		content: "",
    },
  })

const onSubmit = async (form: any) => {
	try {
		const response = await axios.post("your-api-endpoint", form);
		// Handle the response here
	} catch (error) {
		// Handle the error here
	}
};
  
	return (
		<>
			
	<BlurView tint="dark" intensity={40}>
			<Stack style={{height: '100%', backgroundColor: ''}} >
			<Controller
			control={control}
			rules={{
			required: true,
			}}
			render={({ field: { onChange, onBlur, value } }) => (
			<TextArea
				size="$4" borderWidth={2} placeholder="Start writing your reStack..." 
				onBlur={onBlur}
				onChangeText={onChange}
				value={value}
			/>
			)}
			name="content"
			/>
			<Button
			bc={"$purple10"}
			onPress={handleSubmit(onSubmit)} 
			size="$6"
			theme="active"
			>
			Post your reStack
			</Button>
		</Stack>
	</BlurView>
			
		</>
	);
}
