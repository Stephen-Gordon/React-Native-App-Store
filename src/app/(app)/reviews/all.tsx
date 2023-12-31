import { useEffect } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import axios from "axios";
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { AppInterface } from "../../../types";
import { H3 } from "tamagui";
import { useRouter } from "expo-router";
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
	H1,
	Avatar,
	Stack,
	ScrollView
} from "tamagui";

// react native
import { Pressable, SafeAreaView, ActionSheetIOS, View } from "react-native";
import { FlatList } from "react-native";

// rating
import { AirbnbRating } from "react-native-ratings";

// Contexts
import { useSession } from "../../../contexts/AuthContext";

// Types
import { ReviewInterface } from "../../../types";

// delete
import { handleDelete } from "../../../utils/handleDelete";


export default function Modal() {

	const { session, signOut, getUser } = useSession();

	const user = getUser();

	const { id } = useLocalSearchParams();

	const [app, setApp] = useState<AppInterface | null>(null);
	// fix ts error on filter
	const [reviews, setReviews] = useState<ReviewInterface | null | any>(null);

	const router = useRouter();

	useEffect(() => {
		const getApp = async () => {
			try {
				const response = await axios.get(
					`https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/apps/${id}`
				);
				setApp(response.data);
			} catch (error) {
				console.error("Error:", error);
			}
		};

		const getReviews = async () => {
			try {
				const response = await axios.get(
					`https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/reviews/${id}`
				);
				setReviews(response.data);
			} catch (error) {
				console.error("Error:", error);
			}
		}

		getApp();
		getReviews();
	}, []);

	const handlePress = (_reviewIdToDelete: string, _userId: string) => {
		if (user.role == 'admin' || user._id == _userId) {
			ActionSheetIOS.showActionSheetWithOptions(
				{
					options: ['Cancel', 'Delete'],
					destructiveButtonIndex: 1,
					cancelButtonIndex: 0,
					userInterfaceStyle: 'dark',
				},
				buttonIndex => {

					if (buttonIndex === 0) {
						// cancel action
					} else if (buttonIndex === 1) {
						handleDelete("reviews", _reviewIdToDelete, session)
							.then((response) => {
								setReviews(reviews?.filter((review: ReviewInterface) => review._id !== _reviewIdToDelete))
							})
							.catch((error) => {
								console.log(error);
							})

					}
				}

			);
		}


	}


	const Item = ({ item }: ItemProps) => {

		return (
			<Animated.View
				key={item._id}
				entering={FadeIn}
				exiting={FadeOut}
				layout={Layout.delay(100)}
			>

				<Stack
					pressStyle={{
						scale: 0.9,
					}}
					onLongPress={() => handlePress(item._id, item.user._id)}
					animation={"bouncy"}
					px="$3.5" my="$3.5" alignItems="flex-start">
					<XStack space="$2" alignItems="center">
						<Avatar circular size="$3" backgroundColor="$color.gray7Dark" >

						</Avatar>

						{item.user._id == user._id ? (
							<Text color="$purple10Dark" theme="alt1">{item.user.full_name}</Text>
						) : (
							<Text theme="alt1">{item.user.full_name}</Text>
						)}

					</XStack>
					<XStack my="$2" >
						<AirbnbRating

							count={5}
							defaultRating={item.rating}
							size={16}
							showRating={false}

						/>
					</XStack>

					<Paragraph >{item.content}</Paragraph>
					{console.log(item.user._id, user)}
					{item.user._id == user._id || user.role == 'admin' && (
						<Button bc="$red10Dark">Delete</Button>
					)}

				</Stack>

			</Animated.View>
		)
	}

	return (
		<>

			<ScrollView>

				<H1 mt="$10" textAlign="center"> {app?.averageRating}</H1>
				<H4 mb="$6" theme="alt1" textAlign="center">
					Out of 5
				</H4>


				<SafeAreaView>
					<FlatList data={reviews} renderItem={Item} />
				</SafeAreaView>
			</ScrollView>
		</>
	);
}
