import { Tabs, useRouter } from "expo-router";
import { SessionProvider } from "../contexts/AuthContext";
import { Button, TamaguiProvider, Theme } from "tamagui";
import config from "../../tamagui.config";
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from "expo-blur";
import { StatusBar } from "react-native";
import { Ionicons } from '@expo/vector-icons';
export default function TabLayout() {
	const router = useRouter();

	return (
		<>
			<SessionProvider>

				<TamaguiProvider config={config}>
					<Theme name="dark">
						<Tabs
							screenOptions={{
								headerTitleStyle: {
									fontWeight: "bold",
								},

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
							}}

						>
							<Tabs.Screen name="(app)" options={{
								tabBarInactiveBackgroundColor: "rgba(21,21,21,0.6)",
								headerShown: false, headerTitle: "apps", tabBarLabel: "Apps", tabBarShowLabel: false, tabBarIcon: () => (
									<AntDesign
										on
										name="home"
										size={24}
										color="#bf7af0"
									/>
								),

							}} />
							<Tabs.Screen name="(profile)/profile" options={{
								headerShown: false, headerTitle: "apps", tabBarLabel: "Apps", tabBarShowLabel: false, tabBarIcon: () => (
									<Ionicons name="person" size={24} color="#bf7af0" />
								),
							}} />

						</Tabs>

					</Theme>
				</TamaguiProvider>

			</SessionProvider>
		</>
	);
}
