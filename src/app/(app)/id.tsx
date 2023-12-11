import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import axios from "axios";
import Animated from "react-native-reanimated";
import { AppInterface, ReviewInterface } from "../../types";
import { sharedElementTransition } from "../../utils/SharedElementTransition";

import {
	YStack,
	Text,
	Card,
	H2,
	Paragraph,
	Image,
	XStack,
	Separator,
	H4,
	Button,
} from "tamagui";



import ReviewsPreview from "../../components/reviews/ReviewsPreview";
import { Pressable, SafeAreaView } from "react-native";
import { useRouter, Link } from "expo-router";

// Contexts
import { useSession } from "../../contexts/AuthContext";

export default function Modal() {

	const { id, message, reviewToAdd } = useLocalSearchParams();
	const [app, setApp] = useState<AppInterface | null>(null);
	const [reviews, setReviews] = useState<ReviewInterface | null>(null);
	const router = useRouter();
	const { session } = useSession();

	useEffect(() => {
		const getApp = async () => {
			try {
				const response = await axios.get(`https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/apps/${id}`);
				setApp(response.data);

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
	}, [reviews, reviewToAdd])


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
		"Games": "#2b2b2b",
		"Other": "#00FF00",
		"Utilities": "#0000FF",
		"Entertainment": "#FFFF00",
		"Photo & Video": "#FF00FF",
	}

	return (
		<SafeAreaView>
			<Animated.ScrollView sharedTransitionStyle={sharedElementTransition} sharedTransitionTag={`${id}`} style={{ backgroundColor: '#151515' }}>
				<Card>
					{/* <Image
						source={{
							uri: `https://ste-appstore.s3.eu-west-1.amazonaws.com/${app?.image_path}`,
						}}
					/> */}

					<Image
						resizeMode="contain"
						alignSelf="center"
						source={{
							width: 300,
							height: 300,
							uri: `https://ste-appstore.s3.eu-west-1.amazonaws.com/${app?.image_path}`,
						}}
					/>
					<Card.Header padded>
						<H2 style={{ color: colors[app?.genre] }}>{app?.genre}</H2>
						<Paragraph theme="alt2"></Paragraph>
					</Card.Header>
					<Card.Footer borderRadius={"$10"} padded bg="$backgroundStrong">
						<YStack>
							<H2>{app?.name}</H2>
							<Separator marginVertical={15} />
							<XStack justifyContent="space-between" alignItems="center">
								<H2>Reviews</H2>
								<Pressable
									onPress={() => {
										handleReviewsPage();
									}}
								>
									<H4 color="$purple10Dark">See all</H4>
								</Pressable>
							</XStack>
							<ReviewsPreview reviews={reviews} setApp={setApp} appId={id} />
							<Separator marginVertical={15} />
							<Paragraph>{app?.description}</Paragraph>
						</YStack>
					</Card.Footer>
					<Card.Background></Card.Background>
				</Card>
			</Animated.ScrollView>
		</SafeAreaView>
	);
}
