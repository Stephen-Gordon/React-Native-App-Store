// tamagui
import { H1, Stack, Text, XStack, Avatar, H3, H2, YStack, Card, Paragraph, Button, H6, Separator, H4, SizableText } from "tamagui";
//router
import { useLocalSearchParams, router } from "expo-router";
// reaact
import { useEffect, useState } from "react";
// axios
import axios from "axios";
//session
import { useSession } from "../../../contexts/AuthContext";
// types
import { User, AppInterface } from "../../../types";
// react native
import { SafeAreaView, Pressable, FlatList, ScrollView, Dimensions, ActionSheetIOS } from "react-native";
// carousel
import Carousel from "react-native-snap-carousel";
//animated
import Animated from "react-native-reanimated";

//rating
import { AirbnbRating } from "react-native-ratings";

// placeholder image
import { placeholderImage } from "../../../utils/placeholder";

import { handleDelete } from "../../../utils/handleDelete";

export default function Page() {

	//hooks
	const { session, getUser, signOut } = useSession();
	const userInStorage = getUser();

	const screenWidth = Dimensions.get('window').width;

	//state
	const [user, setUser] = useState<any | null>(null);

	useEffect(() => {

		if (!userInStorage) {
			router.push({ pathname: `/login` })
		} else {
			const getApp = async () => {
				try {

					//const response = await axios.get(`https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/users/${userInStorage?._id}`);
					const response = await axios.get(`https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/users/655a39b1d03f57b2084e3fdf`);
					setUser(response.data);

				} catch (error) {
					console.error('Error:', error);
				}
			};

			getApp();
		}



	}, [])



	const AppItem = ({ item, index }: any) => {



		const handleLongPress = (_appId: string, _user: string) => {
			console.log(_appId, _user)
			if (userInStorage.role == 'admin' || userInStorage._id == _user) {
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
							handleDelete("apps", _appId, session)
							setUser(prevState => ({
								...prevState,
								appsDownloaded: prevState?.appsDownloaded.filter((app: AppInterface) => app._id !== _appId)

							}))


						}
					}

				);
			}
		}

		return (
			<Animated.View>
				<Pressable
					onLongPress={() => handleLongPress(item?._id, userInStorage?._id)}
					onPress={() => {
						router.push({
							pathname: `/id`,
							params: { id: item._id },
						});
					}}
				>
					<Stack px="$3.5" my="$3.5" alignItems="flex-start">
						<XStack space="$2" alignItems="center">
							<Avatar size="$5">
								<Avatar.Image
									accessibilityLabel="Cam"
									src={{
										uri: item?.image_path
											? `https://ste-appstore.s3.eu-west-1.amazonaws.com/${item?.image_path}`
											: placeholderImage,
									}}
								/>
								<Avatar.Fallback backgroundColor="$blue10" />
							</Avatar>
							<SizableText numberOfLines={1} size={"$5"}>{item?.name} </SizableText>


						</XStack>

					</Stack>
					<Separator marginVertical={15} />

				</Pressable>
			</Animated.View>
		);
	}

	const deleteAccount = async () => {
		try {
			const response = await axios.delete(`https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/users/${userInStorage?._id}`);
			signOut();
			router.push({ pathname: `/login` });
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<>
			<SafeAreaView >
				<ScrollView>
					{!userInStorage ? (

						<>
							<Stack padding="$4">
								<H2>Please Login</H2>
								<Button
									mt="$4"
									bc={"$purple10"}
									onPress={() => {
										router.push({ pathname: `/login` });
									}}
									size="$6"
									theme="active"
								>
									Sign in
								</Button>
							</Stack>

						</>
					) : (
						<>
							<Stack >
								<Stack space padding="$4" >
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
								</Stack>
								<Carousel
									inactiveSlideOpacity={0.5}
									data={user?.reviews}
									renderItem={ReviewItem}
									sliderWidth={screenWidth}
									itemWidth={screenWidth - 30}
								/>
								<Stack space padding="$4">
									<H2 theme="alt1">Apps Downloaded</H2>
									<FlatList data={user?.appsDownloaded} renderItem={AppItem} />

								</Stack>
							</Stack >
							<YStack padding="$4">
								<Button onPress={() => {
									signOut();
									router.push({ pathname: `/login` });
									console.log(userInStorage)
								}}>Sign Out</Button>
							</YStack>
							<YStack padding="$4">
								<Button onPress={deleteAccount}>Delete Account </Button>
							</YStack>
						</>

					)
					}

				</ScrollView >
			</SafeAreaView >
		</>
	);
}


export function ReviewItem({ item, index }: any) {

	return (
		<Animated.View>
			<Pressable
				onPress={() => {
					router.push({
						pathname: `/reviews/all`,
						params: { id: item.app._id },
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
						<H4 numberOfLines={1}>{item?.app.name} </H4>
						<AirbnbRating
							count={5}
							showRating={false}
							reviews={item?.rating}
							defaultRating={item?.rating}
							size={20}
						/>
						<Paragraph numberOfLines={3} mt="$4" theme="alt2">{item.content}</Paragraph>

					</YStack>



				</Card>
			</Pressable>
		</Animated.View>
	);
}

