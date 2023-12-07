
// React Native
import { FlatList, SafeAreaView, Pressable } from "react-native";

//React
import { useEffect, useState } from "react";

//Tamagui
import { Button, Card, H2, H3, Paragraph, Text, View, XStack } from "tamagui";

//Animated
import Animated from "react-native-reanimated";

//Router
import { useRouter } from "expo-router";

// carousel
import Carousel from "react-native-snap-carousel";

//Rating
import {  AirbnbRating } from "react-native-ratings";

// Session
import { useSession } from "../../contexts/AuthContext";
interface ReviewInterface {
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



export default function ReviewsPreview({ reviews, appId } :ReviewInterface) {
	
	const { session } = useSession();
    const router = useRouter();

    const CaroItem = ({item, index}: any) => {
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
			<SafeAreaView style={{ flex: 1 }}>
				<Carousel
					data={reviews}
					renderItem={CaroItem}
					sliderWidth={350} // Make sure sliderWidth and itemWidth are defined
					itemWidth={300}
				/>
				<Pressable bc={"$purple10"} onPress={() => {
					session ? router.push({ pathname: `/reviews/create`, params: {appId: appId} }) : router.push({ pathname: `/login` })
                }} size="$6" theme="active">
					<H3 color={"$purple10Dark"}>Create a Review</H3>
				</Pressable>
			</SafeAreaView>
		</>
	);
}

