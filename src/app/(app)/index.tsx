// tamagui
import { TamaguiProvider, ScrollView, YStack, View, Stack, Button, Text, Card, H2, Paragraph, XStack } from "tamagui";

//react
import { useEffect, useCallback, useState } from "react";

//router
import { useRouter, Link } from "expo-router";

// auth
import { useSession } from "../../contexts/AuthContext";

// react native 
import { StyleSheet, SafeAreaView, FlatList, ActionSheetIOS, Pressable } from "react-native";
import { useFonts } from "expo-font";

//axios
import axios from "axios";

//animation
import Animated from "react-native-reanimated";

// delete
import { handleDelete } from "../../utils/handleDelete";

interface AppProps {
	item: AppInterface;
}


import { sharedElementTransition } from "../../utils/SharedElementTransition";
import { AppInterface } from "../../types";
import { placeholderImage } from "../../utils/placeholder";
export default function Page() {
	const [renderApps, setRenderApps] = useState(false);
	const [apps, setApps] = useState([]);


	const [loaded] = useFonts({
		Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
		InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
	});

	const { session, signOut, getUser } = useSession();
	const router = useRouter();
	const user = getUser();

	useEffect(() => {
		if (loaded) {
			if (!session) {
				// have to use set timeout becuase the app has to be rendered first
				setTimeout(() => {
					router.push("/login");
					setRenderApps(true);
				}, 300);
			} else {
				setRenderApps(true);
			}

			const getApps = async () => {
				try {

					const response = await axios.get('https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/apps');

					setApps(response.data);

				} catch (error) {
					console.error('Error:', error);
				}
			};

			getApps();
			getUser();


		}
	}, [loaded]);


	if (!loaded) {
		return null;
	}

	// check if user is admin to delete app
	const handlePress = (_appId: string, _user: string) => {
		console.log(user)
		if (session && user.role == 'admin') {
			ActionSheetIOS.showActionSheetWithOptions(
				{
					options: ['Cancel', 'Edit', 'Delete'],
					destructiveButtonIndex: 2,
					cancelButtonIndex: 0,
					userInterfaceStyle: 'dark',
				},
				buttonIndex => {

					if (buttonIndex === 0) {
						// cancel action
					} else if (buttonIndex === 1) {
						router.push({ pathname: `/edit`, params: { id: _appId } });
					} else if (buttonIndex === 2) {
						handleDelete("apps", _appId, session)
							.then((response) => {
								setApps(apps?.filter((app: AppInterface) => app._id !== _appId))
								console.log("Deleting app: ", _appId)
							})
							.catch((error) => {
								console.log(error);
							})

					}
				}

			);
		}


	}

	const colors: any = {
		"Games": "#556ee6",
		"Other": "#E66868",
		"Utilities": "#f78fb3",
		"Entertainment": "#3ec1d3",
		"Photo & Video": "#f5cd7a",
	}

	const Item = ({ item }: AppProps) => {
		let image = `https://ste-appstore.s3.eu-west-1.amazonaws.com/${item?.image_path}`

		return (
			<Pressable
				onLongPress={() => handlePress(item._id, user._id)}
				onPress={() => {
					router.push({
						pathname: `/id`,
						params: { id: item._id, image: image },
					});
				}}
			>
				<Card bordered m="$2" style={{ height: "auto", }}>
					<Stack>
						<Animated.Image
							sharedTransitionStyle={sharedElementTransition}
							sharedTransitionTag={`${item._id}`}
							resizeMode="cover"
							style={{ width: "100%", height: 300, }}
							alignSelf="center"
							source={{
								uri: item?.image_path
									? image
									: placeholderImage,
							}}
						/>
					</Stack>
					<Stack
						padding={"$4"}
						bg="$backgroundFocus"
					>
						<YStack>
							<H2 style={{ color: colors[item?.genre] }}>{item?.genre}</H2>
							<H2>{item.name}</H2>
						</YStack>
					</Stack>
				</Card>
			</Pressable>
		);
	}


	return (
		<>
			<SafeAreaView>
				<Stack>
					{session && <Text> {user?.full_name}</Text>}
					<Link asChild href="/create">
						<Button>Create</Button>
					</Link>

					{renderApps && (
						<>
							<FlatList data={apps} renderItem={Item} />
						</>
					)}
				</Stack>
			</SafeAreaView>
		</>
	);
}
