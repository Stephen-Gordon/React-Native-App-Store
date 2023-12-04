
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
import { Rating, AirbnbRating } from "react-native-ratings";
interface ReviewInterface {
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



export default function ReviewsPreview({ reviews } :ReviewInterface) {

    const router = useRouter();
    
	const Item = ({ item }: ReviewInterface) => (
		<Animated.View sharedTransitionTag={`${item._id}`}>
			<Pressable
				onPress={() => {
					router.push({ pathname: `/reviews/id`, params: { id: item._id } });
				}}
			>
				<Card elevate bordered m="$2" space style={{}}>
					<Card.Header padded>
						<H2>{item.rating}</H2>
						<Paragraph theme="alt2">{item.content}</Paragraph>
					</Card.Header>
				</Card>
			</Pressable>
		</Animated.View>
	);

    const CaraItem = ({item, index}: any) => {
        return (
					<Animated.View sharedTransitionTag={`${item._id}`}>
						<Pressable
							onPress={() => {
								router.push({
									pathname: `/reScrolls/id`,
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
					renderItem={CaraItem}
					sliderWidth={350} // Make sure sliderWidth and itemWidth are defined
					itemWidth={300}
				/>
				<Pressable bc={"$purple10"} onPress={() => {
                    router.push({ pathname: `/reviews/create` })
                }} size="$6" theme="active">
					<H3 color={"$purple10Dark"}>Create a Review</H3>
				</Pressable>
			</SafeAreaView>
		</>
	);
}

