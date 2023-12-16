import { Stack, useRouter } from "expo-router";
import { SessionProvider } from "../../contexts/AuthContext";
import { Button, TamaguiProvider, Theme } from "tamagui";
import config from "../../../tamagui.config";
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from "expo-blur";
export default function StackLayout() {
	const router = useRouter();
	return (
		<>
			<SessionProvider>
				<Stack
					screenOptions={{
						contentStyle: { backgroundColor: "#151515" },
						headerTitleStyle: {
							fontWeight: "bold",
						},
						headerTransparent: true,
						headerStyle: { backgroundColor: "rgba(21,21,21,0.1)" },
						/* headerBlurEffect: "systemUltraThinMaterial", */
					}}
				>

					<Stack.Screen name="index" options={{
						headerTransparent: true,
						headerShown: true,
						/* contentStyle: { backgroundColor: "rgba(21,21,21,0.8)" }, */
						headerStyle: {

							backgroundColor: "rgba(21,21,21,0.1)",
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
							height: 80,
						},

						headerRight: () => (
							<AntDesign
								onPress={() => {
									router.push('/create');
								}}
								on
								name="pluscircle"
								size={24}
								color="grey"
							/>
						),
						headerTitle: ""

					}} />

					<Stack.Screen
						name="login"
						options={{
							headerTitle: "Login or Sign Up",
							presentation: "modal",
						}}
					/>
					<Stack.Screen
						name="id"
						options={{
							headerTransparent: true,
							headerShown: true,
							presentation: "fullScreenModal",
							headerTitle: "",
							headerLeft: () => (
								<AntDesign
									onPress={() => {
										router.back();
									}}
									on
									name="closecircleo"
									size={24}
									color="grey"
								/>
							),
						}}
					/>
					<Stack.Screen
						name="create"
						options={{
							headerTransparent: true,
							headerTitle: "",
							headerLeft: () => (
								<AntDesign
									onPress={() => {
										router.back();
									}}
									on
									name="closecircleo"
									size={24}
									color="grey"
								/>
							),
						}}
					/>
					{/* <Stack.Screen
						name="review"
						options={{
							// Set the presentation mode to modal for our modal route.
							headerTitle: "Reviews",
							presentation: "fullScreenModal",
							animation: "fade",
							headerLeft: () => (
								<AntDesign
									onPress={() => {
										router.back();
									}}
									on
									name="closecircleo"
									size={24}
									color="grey"
								/>
							),
						}}
					/> */}
					<Stack.Screen
						name="reviews/create"
						options={{
							// Set the presentation mode to modal for our modal route.
							headerTitle: "Write Your Review",
							presentation: "modal",
							headerLeft: () => (
								<AntDesign
									onPress={() => {
										router.back();
									}}
									on
									name="closecircleo"
									size={24}
									color="grey"
								/>
							),
						}}
					/>
					<Stack.Screen
						name="reviews/edit"
						options={{
							// Set the presentation mode to modal for our modal route.
							headerTitle: "Reviews",
							presentation: "fullScreenModal",
							animation: "fade",
							headerLeft: () => (
								<AntDesign
									onPress={() => {
										router.back();
									}}
									on
									name="closecircleo"
									size={24}
									color="grey"
								/>
							),
						}}
					/>
					<Stack.Screen
						name="reviews/all"
						options={{
							// Set the presentation mode to modal for our modal route.
							headerTitle: "",
							presentation: "modal",
						}}
					/>

					{/* modal" | "transparentModal" | "containedModal" | "containedTransparentModal" | "fullScreenModal" | "formSheet" | "card"  */}
				</Stack>
			</SessionProvider>
		</>
	);
}
