import { Tabs, useRouter } from "expo-router";
import { SessionProvider } from "../contexts/AuthContext";
import { Button, TamaguiProvider, Theme } from "tamagui";
import config from "../../tamagui.config";
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from "expo-blur";
import { StatusBar } from "react-native";
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
								showLabel: false,
								lazy: true,
								tabBarStyle: {
									backgroundColor: "rgba(21,21,21,0.8)",
									borderTopColor: "transparent",
									position: "absolute",
									bottom: 0,
									left: 0,
									right: 0,
									height: 80,
								},
								headerShown: false,
								tabBarInactiveBackgroundColor: "rgba(21,21,21,0.8)",
								tabBarActiveBackgroundColor: "rgba(21,21,21,0.8)",
								tabBarBackground: () => <BlurView tint="dark" intensity={0} style={{ flex: 1, backgroundColor: "rgba(21,21,21,0.8)" }} />,
								/* headerBlurEffect: "systemUltraThinMaterial", */
							}}

						>
							{/* <Tabs.Screen name="(app)" options={{ headerShown: false, headerTitle: "apps" }} />
							<Tabs.Screen name="(profile)" options={{ headerShown: false, headerTitle: "profile" }} /> */}






						</Tabs>

					</Theme>
				</TamaguiProvider>

			</SessionProvider>
		</>
	);
}
