// expo
import { useLocalSearchParams, useRouter, Link } from "expo-router";

// react
import { useState, useEffect } from "react";

//axios
import axios from "axios";

// animation
import Animated from "react-native-reanimated";

// types
import { AppInterface, ReviewInterface } from "../../types";

// animation
import { sharedElementTransition } from "../../utils/SharedElementTransition";
// react native
import { ScrollView, ImageBackground, Touchable, useWindowDimensions, Pressable, SafeAreaView } from "react-native";

//placeholder image
import { placeholderImage } from "../../utils/placeholder";

import Markdown from 'react-native-markdown-display';


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


// Contexts
import { useSession } from "../../contexts/AuthContext";
// html viewer
import RenderHtml from 'react-native-render-html';



export default function Modal() {

	const { id, reviewToAdd } = useLocalSearchParams();
	const { session } = useSession();


	const [app, setApp] = useState<AppInterface | null>(null);
	const [reviews, setReviews] = useState<ReviewInterface | null>(null);
	const [html, setHtml] = useState<any | null>(null);

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
		setHtml(app?.description);

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
	}, [reviewToAdd, html])


	const handleReviewsPage = () => {

		if (!session) {
			router.push("/login");
		} else {
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
						uri: app?.image_path
							? `https://ste-appstore.s3.eu-west-1.amazonaws.com/${app?.image_path}`
							: placeholderImage,
					}}
				>
					<BlurView intensity={100} tint="dark">
						<Stack style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
							<Animated.View sharedTransitionStyle={sharedElementTransition} sharedTransitionTag={`${id}`}>
								<Animated.Image
									resizeMode="cover"
									alignSelf="center"
									style={{ width: "100%", height: 500 }}
									source={{
										uri: app?.image_path
											? `https://ste-appstore.s3.eu-west-1.amazonaws.com/${app?.image_path}`
											: placeholderImage,
									}}
								/>

								<Stack
									style={{ backgroundColor: 'rgba(0,0,0,0.7)', position: 'absolute', bottom: 10, width: '90%', alignSelf: 'center', borderRadius: 20 }}
								>
									<BlurView style={{ overflow: 'hidden', borderRadius: 20 }} intensity={30}>
										<YStack padding={"$4"}>
											<H2 style={{ color: colors[app?.genre] }}>{app?.genre}</H2>
											<H2>{app?.name}</H2>
										</YStack>
									</BlurView>
								</Stack>

							</Animated.View>

							<YStack >


								<YStack mb="$4" >
									<BlurView intensity={30} tint="dark">
										<Stack >
											<Stack padding="$4">
												<H2>Reviews</H2>
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
											</Stack>
											<Stack alignItems="flex-start" mb="$4">
												<ReviewsPreview reviews={reviews} setApp={setApp} appId={id} />
											</Stack>

											<Stack padding="$4">
												<Button
													onPress={() => {
														handleReviewsPage();
													}}

													//borderColor={"$purple10Dark"}
													width={"100%"}
													elevation="$4"

													backgroundColor={"$purple10Dark"}
													variant="outlined">
													See All Reviews

												</Button>
											</Stack>

										</Stack>
									</BlurView>

								</YStack>


								<Separator marginVertical={15} />
								<View padding="$4">
									<H3>Description</H3>


									<SafeAreaView>
										<ScrollView
											contentInsetAdjustmentBehavior="automatic"
											style={{ height: '100%' }}
										>
											<Markdown style={{
												paragraph: { color: 'white', fontSize: 16, backgroundColor: 'rgba(21,21,21,0.7)', padding: 20, borderRadius: 20, lineHeight: 25 },
											}}>
												{app?.description}
											</Markdown>
										</ScrollView>
									</SafeAreaView>
								</View>
							</YStack>
						</Stack>
					</BlurView>
				</ImageBackground>
			</ScrollView>
		</View>
	);
}
