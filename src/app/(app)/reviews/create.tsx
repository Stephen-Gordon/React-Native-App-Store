import { Text, Stack, ScrollView } from "tamagui";
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
//axios
import axios from "axios";

//Rating
import {  AirbnbRating } from "react-native-ratings";
import { useEffect, useState } from "react";


export default function Page() {

	const router = useRouter();
	const { appId } = useLocalSearchParams();
	const { session, user } = useSession();
	
	// form data
	const { control, handleSubmit, formState: { errors }} = useForm({
		defaultValues: {
			app: appId,
			content: "",
			rating: null,
			
		},
  	})

  const onSubmit = (form: any) => {
	axios.post("https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/reviews", form, {
		headers: {
			Authorization: `Bearer ${session}`,
		}
	})
		.then((response: any) => {

			let review = response.data;
			router.push({ pathname: `/id`, params: { id: appId, reviewToAdd: review } });
		})
		.catch((err) => {
			console.error(err);
		})
  }




  
	return (
		<>
			
	
			<ScrollView>
				<Stack padding="$2" space="$4" >

				{/* Rating */}
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
					
						
						<AirbnbRating
							count={5}
							reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
							defaultRating={0}
							size={35}
							onFinishRating={(rating) => onChange(rating)}
							isDisabled={false}
						/>
				
					)}
					name="rating"
					defaultValue={null}
				/>
				{/* Content */}
				<Controller
					control={control}
					rules={{
					required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextArea
							rows={10}
							size="$4" borderWidth={2} placeholder="Start writing your review..." 
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
				Post
				</Button>
			</Stack>
			</ScrollView>

			
		</>
	);
}
