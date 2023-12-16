
// React Native
import { FlatList, SafeAreaView, Pressable, Dimensions } from "react-native";

//React
import { useEffect, useState } from "react";

//Tamagui
import { Button, Card, H2, H3, Paragraph, Text, View, XStack } from "tamagui";

//Animated
import Animated from "react-native-reanimated";

//Router
import { Link, useRouter } from "expo-router";

// carousel
import Carousel from "react-native-snap-carousel";

//Rating
import { AirbnbRating } from "react-native-ratings";
//search params
import { useLocalSearchParams } from "expo-router";
// Session
import { useSession } from "../../contexts/AuthContext";
interface ReviewPreviewProps {
	setApp: (app: any) => void;
	appId: string;
	item: {
		_id: string;
		user: string;
		app: string;
		rating: number;
		content: string;
		__v: number;
	}
	reviews: {
		_id: string;
		user: string;
		app: string;
		rating: number;
		content: string;
		__v: number;
	};
}



export default function ReviewsPreview({ reviews, appId }: ReviewPreviewProps) {

	const { session } = useSession();
	const router = useRouter();

	const screenWidth = Dimensions.get('window').width;


	const CaroItem = ({ item, index }: any) => {
		return (

			<Pressable
				onPress={() => {
					router.push({
						pathname: `/reviews/id`,
						params: { id: item._id },
					});
				}}
			>
				<Card height={200} padding="$2" elevate bordered my="$2" space>
					<XStack>
						<H2>{item.rating}</H2>
						<AirbnbRating
							count={5}
							reviews={item?.rating}
							defaultRating={item?.rating}
							size={20}
						/>
					</XStack>
					<Paragraph numberOfLines={3} theme="alt2">{item.content}</Paragraph>
				</Card>
			</Pressable>
		);
	}


	return (
		<>
			<SafeAreaView style={{ flex: 1, justifyContent: "flex-start" }}>

				<Carousel
					inactiveSlideOpacity={0.5}
					data={reviews?.slice(0, 3).reverse()}
					renderItem={CaroItem}
					sliderWidth={screenWidth - 75}
					itemWidth={screenWidth - 125}
				/>

			</SafeAreaView>
		</>
	);
}

