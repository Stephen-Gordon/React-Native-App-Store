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
    TextArea,
    Image,
    Label
} from "tamagui";
// form
import { useForm, Controller, set } from "react-hook-form"
import { useSession } from "../../contexts/AuthContext";
//axios
import axios from "axios";

//react native
import { SafeAreaView, ImageBackground } from "react-native";

//react
import { useState, useMemo, useEffect } from "react";

//types
import { AppInterface } from "../../types";

// expo router
import { useLocalSearchParams, router, useNavigation } from "expo-router";

//expo blur
import { BlurView } from "expo-blur";

//image picker
import * as ImagePicker from 'expo-image-picker';

export default function Page() {

    // state
    const [val, setVal] = useState("genre");
    const [app, setApp] = useState<AppInterface | null>(null);
    const [image, setImage] = useState<string | null>(null);

    //hooks
    const { id } = useLocalSearchParams();
    const { session } = useSession();
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({

    });


    useEffect(() => {
        const getApp = async () => {
            try {
                const response = await axios.get(`https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/apps/${id}`);
                setApp(response.data);

                const { name, size_bytes, price, genre, ver, description, cont_rating, image_path } = response.data;
                setValue('name', name);
                setValue('size_bytes', size_bytes);
                setValue('price', price);
                setValue('genre', genre);
                setValue('ver', ver);
                setValue('description', description);
                setValue('cont_rating', cont_rating);
                setValue('image', image_path);
                console.log(app?.cont_rating)
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getApp();


        // Set default values for each field


    }, [setValue])

    useEffect(() => {
        setImage(`https://ste-appstore.s3.eu-west-1.amazonaws.com/${app?.image_path}`);
    }, [app])


    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            let uri = result.assets[0].uri;
            uri = uri.replace('file://', '');
            const parts = uri.split('/');
            const fileName = parts[parts.length - 1];

            setImage(uri);
            console.log("image", image);

        }
    };

    const onSubmit = async (form: any) => {
        //console.log(form)
        try {
            const formData: any = new FormData();
            // Append other form data
            formData.append('name', form.name);
            formData.append('size_bytes', form.size_bytes);
            formData.append('price', form.price);
            formData.append('genre', form.genre);
            formData.append('ver', form.ver);
            formData.append('description', form.description);
            formData.append('cont_rating', form.cont_rating);
            formData.append("image", {
                uri: image,
                type: "image/jpeg",
                name: "image.jpg",
            });

            const response = await axios.put(
                `https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/apps/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${session}`,
                        'Content-Type': 'multipart/form-data',
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
				<SafeAreaView style={{ width: "100%" }}>
					<ScrollView style={{ width: "100%" }}>
						<ImageBackground
							style={{ width: "100%" }}
							style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)" }}
							source={{
								width: 1000,
								height: 1000,
								uri: image,
							}}
							blurRadius={0}
						>
							<BlurView intensity={100} tint="dark">
								<YStack space="$3" padding="$2" style={{ flex: 1 }}>
									<Image
										onLongPress={pickImage}
										resizeMode="contain"
										alignSelf="center"
										source={{
											width: 300,
											height: 300,
											uri: image,
										}}
									/>
									<YStack>
										<Label htmlFor="name">Name</Label>
										<Controller
											control={control}
											rules={{
												required: true,
											}}
											render={({ field: { onChange, onBlur, value } }) => (
												<Input
													size="$6"
													onBlur={onBlur}
													onChangeText={(text) => {
														onChange(text);
														setValue("name", text); // Manually update the value for React Hook Form
													}}
													value={value}
												/>
											)}
											name="name"
											defaultValue={""}
										/>
									</YStack>

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
												onChangeText={(text) => {
													onChange(text);
													setValue("size_bytes", text); // Manually update the value for React Hook Form
												}}
												value={value}
											/>
										)}
										name="size_bytes"
										defaultValue={""}
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
												onChangeText={(text) => {
													onChange(text);
													setValue("price", text); // Manually update the value for React Hook Form
												}}
												value={value}
											/>
										)}
										name="price"
										defaultValue={""}
									/>
									<Controller
										control={control}
										rules={{
											maxLength: 100,
										}}
										render={({ field: { onChange, onBlur, value } }) => (
											<Select
												id="genre"
												value={value}
												onValueChange={(text) => {
													onChange(text);
													setValue("genre", text); // Manually update the value for React Hook Form
												}}
												disablePreventBodyScroll
												size="$6"
											>
												<Select.Trigger>
													<Select.Value />
												</Select.Trigger>

												<Adapt when="sm" platform="touch">
													<Sheet
														snapPointsMode="fit"
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
															<Adapt.Contents />
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
																				value={value}
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
										defaultValue={""}
									/>
									<Controller
										control={control}
										rules={{
											maxLength: 100,
										}}
										render={({ field: { onChange, onBlur, value } }) => (
											<Select
												id="cont_rating"
												value={value}
												onValueChange={(text) => {
													onChange(text);
													setValue("cont_rating", text); // Manually update the value for React Hook Form
												}}
												disablePreventBodyScroll
												size="$6"
											>
												<Select.Trigger>
													<Select.Value placeholder="Content Rating" />
												</Select.Trigger>

												<Adapt when="sm" platform="touch">
													<Sheet
														modal
														snapPointsMode="fit"
														dismissOnSnapToBottom
														animationConfig={{
															type: "spring",
															mass: 1,
															stiffness: 100,
															damping: 200,
														}}
													>
														<Sheet.Frame>
															<Adapt.Contents />
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
															<Select.Label>Content Rating</Select.Label>
															<Select.Item index={0} key={"+4"} value={"+4"}>
																<Select.ItemText>"+4"</Select.ItemText>
																<Select.ItemIndicator marginLeft="auto"></Select.ItemIndicator>
															</Select.Item>
															<Select.Item index={1} key={"+18"} value={"+18"}>
																<Select.ItemText>"+18"</Select.ItemText>
																<Select.ItemIndicator marginLeft="auto"></Select.ItemIndicator>
															</Select.Item>
														</Select.Group>
													</Select.Viewport>
												</Select.Content>
											</Select>
										)}
										name="cont_rating"
										defaultValue={""}
									/>

									<Controller
										control={control}
										rules={{
											maxLength: 100,
										}}
										render={({ field: { onChange, onBlur, value } }) => (
											<Input
												size="$6"
												onBlur={onBlur}
												onChangeText={(text) => {
													onChange(text);
													setValue("ver", text); // Manually update the value for React Hook Form
												}}
												value={value}
											/>
										)}
										name="ver"
										defaultValue={""}
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
												onBlur={onBlur}
												onChangeText={(text) => {
													onChange(text);
													setValue("description", text); // Manually update the value for React Hook Form
												}}
												value={value}
											/>
										)}
										name="description"
										defaultValue={""}
									/>

									<Button
										bc={"$purple10"}
										onPress={handleSubmit(onSubmit)}
										size="$6"
										theme="active"
									>
										Update
									</Button>
								</YStack>
							</BlurView>
						</ImageBackground>
					</ScrollView>
				</SafeAreaView>
			</>
		);
}