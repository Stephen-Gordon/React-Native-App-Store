import { Stack, useRouter } from "expo-router";
import { SessionProvider } from "../../contexts/AuthContext";
import { Button, TamaguiProvider, Theme } from "tamagui";
import config from "../../../tamagui.config";
import { AntDesign } from '@expo/vector-icons'; 

export default function StackLayout() {
  const router = useRouter();
  return (
		<>
			<SessionProvider>
				<Stack
					screenOptions={{
						/* contentStyle: { backgroundColor: "#151515" }, */
						headerStyle: {
							backgroundColor: "#151515",
						},
						headerTintColor: "#fff",
						headerTitleStyle: {
							fontWeight: "bold",
						},
					}}
				>
					<Stack.Screen name="index" options={{ headerTitle: "Home" }} />

					<Stack.Screen
						name="login"
						options={{
							// Set the presentation mode to modal for our modal route.
							headerTitle: "Login or Sign Up",
							presentation: "modal",
						}}
					/>
					<Stack.Screen

						name="id"
						options={{
							// Set the presentation mode to modal for our modal route.
							headerTitle: "Id",
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
							presentation: "transparentModal",
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
						name="reviews/index"
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

					{/* modal" | "transparentModal" | "containedModal" | "containedTransparentModal" | "fullScreenModal" | "formSheet" | "card"  */}
				</Stack>
			</SessionProvider>
		</>
	);
}
