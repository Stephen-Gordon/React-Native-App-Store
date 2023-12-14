// tamagui
import { H1, Stack, Text, XStack, Avatar, H3, H2, YStack, Card, Paragraph } from "tamagui";
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
import { SafeAreaView, Pressable } from "react-native";
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
		console.log(userInStorage)
		const getApp = async () => {
			try {
				const response = await axios.get(`https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/users/${userInStorage?._id}`);
				setUser(response.data);


			} catch (error) {
				console.error('Error:', error);
			}
		};

		getApp();

	}, [])

	const CaroItem = ({ item, index }: any) => {
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
					<Card elevate bordered m="$2" space style={{}}>
						<Card.Header padded>
							<XStack>
								<H2>{item.rating}</H2>
								<AirbnbRating
									count={5}
									reviews={item?.rating}
									defaultRating={item?.rating}
									size={20}
								/>
							</XStack>
							<Paragraph theme="alt2">{item.content}</Paragraph>
						</Card.Header>
					</Card>
				</Pressable>
			</Animated.View>
		);
	}

	return (
		<>
			<SafeAreaView >
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
						renderItem={CaroItem}
						sliderWidth={350} // Make sure sliderWidth and itemWidth are defined
						itemWidth={300}
					/>
				</Stack>
			</SafeAreaView>
		</>
	);
}