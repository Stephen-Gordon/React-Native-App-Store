import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import axios from "axios";
import Animated from "react-native-reanimated";
import { AppInterface } from "../../../types";
import {
	YStack,
	Text,
	Card,
	H2,
	Paragraph,
	Image,
	XStack,
	Separator,
    View,
	H4,
	Button,
    H1,
} from "tamagui";

import ReviewsPreview from "../../../components/reviews/ReviewsPreview";
import { Pressable, SafeAreaView } from "react-native";
import { useRouter, Link } from "expo-router";
import { FlatList } from "react-native";

// Contexts
import { useSession } from "../../../contexts/AuthContext";

// Types
import { ReviewInterface } from "../../../types";

export default function Modal() {

	const session = useSession();

	const { id } = useLocalSearchParams();
	const [app, setApp] = useState<AppInterface | null>(null);
	const [reviews, setReviews] = useState<ReviewInterface | null>(null);

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


	const Item = ({ item }: ItemProps) => (
		<Card elevate bordered m="$2" space style={{ height: 300 }}>
			<Card.Header padded>
				<H2>{item.user}</H2>
				<Paragraph theme="alt2"></Paragraph>
			</Card.Header>
			<Paragraph theme="alt2">{item.content}</Paragraph>
		</Card>
	);

	return (
		<>
			<YStack flex={1} space="$2" padding="$2" mt="$20" justifyContent="center">
				<H1 textAlign="center"> {app?.averageRating}</H1>
				<H4 theme="alt1" textAlign="center">
					Out of 5
				</H4>
			</YStack>
			<SafeAreaView>
				<FlatList data={reviews} renderItem={Item} />
			</SafeAreaView>
		</>
	);
}
