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
    Avatar,
    Stack,
    ScrollView
} from "tamagui";

// react native
import { Pressable, SafeAreaView } from "react-native";
import { FlatList } from "react-native";

// rating
import {  AirbnbRating } from "react-native-ratings";

// Contexts
import { useSession } from "../../../contexts/AuthContext";

// Types
import { ReviewInterface } from "../../../types";

// hold menu

export default function Modal() {

	const { session, signOut, getUser } = useSession();
    
    const user = getUser();

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

    const handleDelete = () => {
        console.log("delete")
    }


	const Item = ({ item }: ItemProps) => (
		
            <Stack px="$3.5" my="$3.5" alignItems="flex-start">
                <XStack space="$2" alignItems="center">
                    <Avatar circular size="$3" backgroundColor="$color.gray7Dark" >
                        
                    </Avatar>

                    <Text theme="alt1">{item.user.full_name}</Text>
                       
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
                {item.user._id == user._id || item.user.role == 'admin' && (
                    <Button bc="$red10Dark"  onPress={handleDelete}>Delete</Button>
                )}
               
            </Stack>
	
	);

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
