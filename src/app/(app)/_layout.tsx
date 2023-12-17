import { Stack, useRouter } from "expo-router";
import { SessionProvider, useSession } from "../../contexts/AuthContext";
import { Button, TamaguiProvider, Theme } from "tamagui";
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from "expo-blur";
export default function StackLayout() {

	const router = useRouter();

	const { session } = useSession();

	const CreateHeader = () => {
		return (
			session && (
				<>
					<AntDesign
						onPress={() => {
							router.push('/create');
						}}
						on
						name="pluscircle"
						size={24}
						color="grey"
					/>
				</>
			)
		)

	}

	return (
		<>
			<SessionProvider>
				<Stack
					screenOptions={{
						contentStyle: { backgroundColor: "#151515" },
						headerTitleStyle: {
							fontWeight: "bold",
							color: "grey",
						},
						headerTransparent: true,
						headerStyle: { backgroundColor: "rgba(21,21,21,0.1)" },
					}}
				>

					<Stack.Screen name="index" options={{
						headerTransparent: true,
						headerShown: true,
						headerStyle: {

							backgroundColor: "rgba(21,21,21,0.1)",
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
							height: 80,
						},

						headerRight: () => (
							<CreateHeader />
						),
						headerTitle: ""

					}} />

					<Stack.Screen
						name="login"
						options={{
							headerTitle: "",
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

					<Stack.Screen
						name="reviews/create"
						options={{
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
