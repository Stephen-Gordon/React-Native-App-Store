import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import axios from "axios";
import Animated from "react-native-reanimated";
import { AppInterface } from "../../types";
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

import ReviewsPreview from "../../components/reviews/ReviewsPreview";
import { Pressable } from "react-native";
import { useRouter, Link } from "expo-router";

export default function Modal() {
	const { id } = useLocalSearchParams();
	const [app, setApp] = useState<AppInterface | null>(null);
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

		getApp();
	}, []);
	return (
		<>
			<XStack flex={1} space="$2" padding="$2" mt="$20" justifyContent="center">
				<H1 textAlign="center"> {app?.averageRating}</H1>
			</XStack>
		</>
	);
}
