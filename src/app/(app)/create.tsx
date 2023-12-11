import {
	Text,
	YStack,
	Input,
	Button,
	Select,
	Adapt,
	SelectProps,
	Sheet,
    ScrollView,
    TextArea
} from "tamagui";
// form
import { useForm, Controller } from "react-hook-form"
import { router } from "expo-router";
import { useSession } from "../../contexts/AuthContext";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useMemo } from "react";

export default function Page () {

    const [val, setVal] = useState("genre");
    
    const {
			control,
			handleSubmit,
			formState: { errors },
		} = useForm({
			defaultValues: {
				name: "",
				size_bytes: "",
				price: "",
				genre: "",
				ver: "",
                description: "",
                cont_rating: "",
			},
		});

    
    const { session } = useSession();

	const onSubmit = async (form: any) => {
        console.log(form)
		try {
			// register user
			const response = await axios.post(
				"https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/apps",
				form, 
                {
                    headers: {
                        Authorization: `Bearer ${session}`,
                    }
                }
			);

			router.push({ pathname: `/id`, params: { id: response.data._id } });
		} catch (error) {
			console.error(error);
		} 
	};

     const items = [
				{ name: "Games" },
				{ name: "Other" },
				{ name: "Entertainment" },
				{ name: "Photo & Video" },
				{ name: "Utilities" },
			];
 

    return (
			<>
				<SafeAreaView>
					<ScrollView>
						<YStack space="$3" padding="$2">
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										size="$6"
										placeholder="Name..."
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name="name"
							/>

							<Controller
								control={control}
								rules={{
									maxLength: 100,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										size="$6"
										placeholder="App Size in Bytes..."
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name="size_bytes"
							/>
							<Controller
								control={control}
								rules={{
									maxLength: 100,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										size="$6"
										placeholder="Price..."
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name="price"
							/>
							<Controller
								control={control}
								rules={{
									maxLength: 100,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Select
										id="genre"
										value={val}
										onValueChange={(val) => {
											setVal(val);
											onChange(val);
										}}
										disablePreventBodyScroll
										size="$6"
									>
										<Select.Trigger>
											<Select.Value placeholder="Something" />
										</Select.Trigger>

										<Adapt when="sm" platform="touch">
											<Sheet
												modal
												dismissOnSnapToBottom
												animationConfig={{
													type: "spring",
													mass: 1,
													stiffness: 100,
													damping: 200,
												}}
											>
												<Sheet.Frame>
													<Sheet.ScrollView>
														<Adapt.Contents />
													</Sheet.ScrollView>
												</Sheet.Frame>
												<Sheet.Overlay
													animation="lazy"
													enterStyle={{ opacity: 0 }}
													exitStyle={{ opacity: 0 }}
												/>
											</Sheet>
										</Adapt>

										<Select.Content zIndex={200000}>
											<Select.Viewport minWidth={200}>
												<Select.Group>
													<Select.Label>Genre</Select.Label>
													{useMemo(
														() =>
															items.map((item, i) => {
																return (
																	<Select.Item
																		index={i}
																		key={item.name}
																		value={item.name}
																	>
																		<Select.ItemText>
																			{item.name}
																		</Select.ItemText>
																		<Select.ItemIndicator marginLeft="auto"></Select.ItemIndicator>
																	</Select.Item>
																);
															}),
														[items]
													)}
												</Select.Group>
											</Select.Viewport>
										</Select.Content>
									</Select>
								)}
								name="genre"
							/>
                            <Controller
								control={control}
								rules={{
									maxLength: 100,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Select
										id="cont_rating"
										value={"+4"}
										onValueChange={(val) => {
											setVal(val);
											onChange(val);
										}}
										disablePreventBodyScroll
										size="$6"
									>
										<Select.Trigger>
											<Select.Value placeholder="Something" />
										</Select.Trigger>

										<Adapt when="sm" platform="touch">
											<Sheet
												modal
												dismissOnSnapToBottom
												animationConfig={{
													type: "spring",
													mass: 1,
													stiffness: 100,
													damping: 200,
												}}
											>
												<Sheet.Frame>
													<Sheet.ScrollView>
														<Adapt.Contents />
													</Sheet.ScrollView>
												</Sheet.Frame>
												<Sheet.Overlay
													animation="lazy"
													enterStyle={{ opacity: 0 }}
													exitStyle={{ opacity: 0 }}
												/>
											</Sheet>
										</Adapt>

										<Select.Content zIndex={200000}>
											<Select.Viewport minWidth={200}>
												<Select.Group>
													<Select.Label>Genre</Select.Label>
                                                    <Select.Item
                                                        index={0}
                                                        key={"+4"}
                                                        value={"+4"}
                                                    >
                                                        <Select.ItemText>
                                                            {"+4"}
                                                        </Select.ItemText>
                                                        <Select.ItemIndicator marginLeft="auto"></Select.ItemIndicator>
                                                    </Select.Item>
                                                    <Select.Item
                                                        index={1}
                                                        key={"+18"}
                                                        value={"+18"}
                                                    >
                                                        <Select.ItemText>
                                                            {"+18"}
                                                        </Select.ItemText>
                                                        <Select.ItemIndicator marginLeft="auto"></Select.ItemIndicator>
                                                    </Select.Item>
												</Select.Group>
											</Select.Viewport>
										</Select.Content>
									</Select>
								)}
								name="cont_rating"
							/>

							<Controller
								control={control}
								rules={{
									maxLength: 100,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										size="$6"
										placeholder="Version..."
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name="ver"
							/>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextArea
										rows={10}
										size="$4"
										borderWidth={2}
										placeholder="What does your app do..."
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
									/>
								)}
								name="description"
							/>

							<Button
								bc={"$purple10"}
								onPress={handleSubmit(onSubmit)}
								size="$6"
								theme="active"
							>
								Publish your App
							</Button>
						</YStack>
					</ScrollView>
				</SafeAreaView>
			</>
		);
}