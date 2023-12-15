import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

//axios
import axios from "axios";

// animation
import Animated from "react-native-reanimated";

// types
import { AppInterface, ReviewInterface } from "../../types";

// animation
import { sharedElementTransition } from "../../utils/SharedElementTransition";
// react native
import { ScrollView, ImageBackground, Touchable, useWindowDimensions } from "react-native";

// tamagui
import {
	YStack,
	Text,
	Card,
	H2,
	Paragraph,
	XStack,
	Separator,
	H4,
	Button,
	H6,
	Stack,
	View,
	H3
} from "tamagui";

// blur
import { BlurView } from "expo-blur";

//icon
import { FontAwesome } from "@expo/vector-icons";

import ReviewsPreview from "../../components/reviews/ReviewsPreview";
import { Pressable, SafeAreaView } from "react-native";
import { useRouter, Link } from "expo-router";

// Contexts
import { useSession } from "../../contexts/AuthContext";
// html viewer
import RenderHtml from 'react-native-render-html';
export default function Modal() {

	const { id, message, reviewToAdd, image } = useLocalSearchParams();
	const { width } = useWindowDimensions();
	const { session } = useSession();


	const [app, setApp] = useState<AppInterface | null>(null);
	const [reviews, setReviews] = useState<ReviewInterface | null>(null);
	const router = useRouter();

	useEffect(() => {
		const getApp = async () => {
			try {
				const response = await axios.get(`https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/apps/${id}`);
				setApp(response.data);
				console.log(app?._id)

			} catch (error) {
				console.error('Error:', error);
			}
		};


		getApp();

	}, [])

	useEffect(() => {
		const getReviews = async () => {
			try {
				const response = await axios.get(
					`https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/reviews/${id}`
				);
				setReviews(response.data.reverse());
			} catch (error) {
				console.error("Error:", error);
			}
		}
		getReviews();
	}, [reviewToAdd])


	const handleReviewsPage = () => {

		if (!session) {
			router.push("/login");
		} else {
			console.log("handleReviewsPage");
			router.push({
				pathname: `/reviews/all`,
				params: { id: id },
			});
		}

	}

	const colors: any = {
		Games: "$pink8Dark",
		Other: "#green8Dark",
		Utilities: "#yellow8Dark",
		Entertainment: "#orange8Dark",
		"Photo & Video": "$blue8Dark",
	};

	return (
		<View>
			<ScrollView>
				<ImageBackground
					style={{ flex: 1, backgroundColor: "#00000" }}
					source={{
						width: 1000,
						height: 2000,
						uri: image,
					}}
				>
					<BlurView intensity={100} tint="dark">
						<Stack style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
							<Animated.Image
								sharedTransitionStyle={sharedElementTransition}
								sharedTransitionTag={`${id}`}
								resizeMode="cover"
								alignSelf="center"
								style={{ width: "100%", height: 300 }}
								source={{
									uri: image,
								}}
							/>

							<YStack padding="$4">
								<View
									borderRadius={"$10"}
									mb="$2"
									py="$2"
									px="$4"
									bg={colors[app?.genre]}
									style={{ width: "auto", alignSelf: "flex-start" }}
								>
									<Text>{app?.genre}</Text>
								</View>
								<H2>{app?.name}</H2>
								<Separator marginVertical={30} />
								<YStack mb="$4">
									<H3>Reviews</H3>
									<XStack justifyContent="space-between" alignItems="center">
										<XStack justifyContent="space-between" alignItems="center">
											<FontAwesome name="star" size={24} color="white" />
											<H3 ml="$2" theme="alt1">
												{app?.averageRating}
											</H3>
										</XStack>
										<Pressable
											onPress={() => {
												session
													? router.push({
														pathname: `/reviews/create`,
														params: { appId: app?._id },
													})
													: router.push({ pathname: `/login` });
											}}
											theme="active"
										>
											<FontAwesome
												name="pencil-square-o"
												size={24}
												color="white"
											/>
										</Pressable>
									</XStack>
								</YStack>

								<ReviewsPreview reviews={reviews} setApp={setApp} appId={id} />
								<Button
									//borderColor={"$purple10Dark"}
									hoverStyle={{
										scale: 1.2,
									}}
									pressStyle={{
										scale: 0.9,
									}}

									animation="bouncy"
									elevation="$4"
									variant="outlined">
									<Pressable
										onPress={() => {
											handleReviewsPage();
										}}
									>
										<H6 color="$purple10Dark">See all</H6>
									</Pressable>
								</Button>
								<Separator marginVertical={15} />
								<View>
									{/* <RenderHtml contentWidth={width} source={app?.description} /> */}
								</View>
							</YStack>
						</Stack>
					</BlurView>
				</ImageBackground>
			</ScrollView>
		</View>
	);
}
