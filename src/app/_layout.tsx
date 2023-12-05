import { Stack, useRouter } from "expo-router";
import { SessionProvider } from "../contexts/AuthContext";
import { Button, TamaguiProvider, Theme } from "tamagui";
import config from "../../tamagui.config";
import { AntDesign } from '@expo/vector-icons'; 

export default function StackLayout() {
  const router = useRouter();
  return (
		<>
			<SessionProvider>
				<TamaguiProvider config={config}>
					<Theme name="dark">
						<Stack
							screenOptions={{
								contentStyle: { backgroundColor: "#151515" },
								headerStyle: {
									backgroundColor: "#151515",
								},
								headerTintColor: "#fff",
								headerTitleStyle: {
									fontWeight: "bold",
								},
							}}
						>
							<Stack.Screen name="(app)" options={{ headerTitle: "Home" }} />

							<Stack.Screen
								name="(reviews)"
								options={{ headerTitle: "reviews", title: "reviews" }}
							/>
			

							

							{/* modal" | "transparentModal" | "containedModal" | "containedTransparentModal" | "fullScreenModal" | "formSheet" | "card"  */}
						</Stack>
					</Theme>
				</TamaguiProvider>
			</SessionProvider>
		</>
	);
}
