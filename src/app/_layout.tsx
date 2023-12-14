import { Tabs, useRouter } from "expo-router";
import { SessionProvider } from "../contexts/AuthContext";
import { Button, TamaguiProvider, Theme } from "tamagui";
import config from "../../tamagui.config";
import { AntDesign } from '@expo/vector-icons';

export default function TabLayout() {
	const router = useRouter();
	return (
		<>
			<SessionProvider>

				<TamaguiProvider config={config}>
					<Theme name="dark">
						<Tabs
							screenOptions={{
								contentStyle: { backgroundColor: "#151515" },
								headerTitleStyle: {
									fontWeight: "bold",
								},

								/* headerBlurEffect: "systemUltraThinMaterial", */
							}}
							screenOptions={{
								headerShown: false,
								headerTransparent: true,


							}}
						>
							<Tabs.Screen name="(app)" options={{ headerShown: false, headerTitle: "apps" }} />
							<Tabs.Screen name="(profile)" options={{ headerShown: false, headerTitle: "profile" }} />






						</Tabs>
					</Theme>
				</TamaguiProvider>

			</SessionProvider>
		</>
	);
}
