// tamagui
import { H1, Stack, Text, XStack, Avatar, H3, H2, YStack, Card, Paragraph, Button, H6 } from "tamagui";
//router
import { useLocalSearchParams, router } from "expo-router";
// reaact
import { useEffect, useState } from "react";
// axios
import axios from "axios";
//session
import { useSession } from "../../../contexts/AuthContext";
// types
import { User } from "../../../types";
// react native
import { SafeAreaView, Pressable, FlatList, ScrollView } from "react-native";
// carousel
import Carousel from "react-native-snap-carousel";

//animated
import Animated from "react-native-reanimated";
//rating
import { AirbnbRating } from "react-native-ratings";

export default function Page() {

	//hooks
	const { getUser } = useSession();
	const userInStorage = getUser();


	//state
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const getApp = async () => {
			try {

				/* const response = await axios.get(`https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/users/${userInStorage?._id}`); */
				const response = await axios.get(`https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/users/655a39b1d03f57b2084e3fdf`);
				setUser(response.data);



			} catch (error) {
				console.error('Error:', error);
			}
		};

		getApp();

	}, [])






	return (
		<>
			<SafeAreaView >
				<ScrollView>
					<Stack padding="$4" space>
						<H1>Profile</H1>
						<XStack space="$2" alignItems="center">
							<Avatar circular size="$6" backgroundColor="$color.gray7Dark" >

							</Avatar>
							<YStack space="$1">
								<H3>{user?.full_name}</H3>
								<Text theme="alt1">Joined in 2023</Text>
							</YStack>


						</XStack>
						<H2 theme="alt1">Recent Reviews</H2>
						<Carousel
							data={user?.reviews}
							renderItem={ReviewItem}
							sliderWidth={350} // Make sure sliderWidth and itemWidth are defined
							itemWidth={300}
						/>
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
						<YStack>
							<H2 theme="alt1">Apps Downloaded</H2>
							<FlatList data={user?.appsDownloaded} renderItem={AppItem} />
						</YStack>
					</Stack>
				</ScrollView>
			</SafeAreaView>
		</>
	);
}


export function ReviewItem({ item, index }: any) {

	return (
		<Animated.View>
			<Pressable
				onPress={() => {
					router.push({
						pathname: `/reviews/id`,
						params: { id: item._id },
					});
				}}
			>
				<Card
					hoverStyle={{
						scale: 1.2,
					}}
					pressStyle={{
						scale: 0.9,
					}}
					animation="bouncy"
					elevate bordered m="$2" space style={{ height: 200 }}>

					<YStack padding="$4" alignItems="flex-start">
						<Paragraph theme="alt2">2023</Paragraph>
						<H2>{item?.name} </H2>
						<AirbnbRating

							count={5}
							showRating={false}
							reviews={item?.rating}
							defaultRating={item?.rating}
							size={20}
						/>
						<Paragraph mt="$4" theme="alt2">{item.content}</Paragraph>
					</YStack>


				</Card>
			</Pressable>
		</Animated.View>
	);
}

export function AppItem({ item, index }: any) {
	return (
		<Animated.View>
			<Pressable
				onPress={() => {
					router.push({
						pathname: `/reviews/id`,
						params: { id: item._id },
					});
				}}
			>
				<Card
					hoverStyle={{
						scale: 1.2,
					}}
					pressStyle={{
						scale: 0.9,
					}}
					animation="bouncy"
					elevate bordered m="$2" space style={{ height: 200 }}>

					<YStack padding="$4" alignItems="flex-start">
						<Paragraph theme="alt2">2023</Paragraph>
						<H2>{item?.name} </H2>
						<Avatar circular size="$10">
							<Avatar.Image
								accessibilityLabel="Cam"
								src={`https://ste-appstore.s3.eu-west-1.amazonaws.com/${item?.image_path}`}
							/>
							<Avatar.Fallback backgroundColor="$blue10" />
						</Avatar>

						<Paragraph mt="$4" theme="alt2">{item.genre}</Paragraph>
					</YStack>


				</Card>
			</Pressable>
		</Animated.View>
	);
}