import { Stack } from 'expo-router';
import { SessionProvider } from '../contexts/AuthContext'; 
import { TamaguiProvider, Theme } from 'tamagui';
import config from '../../tamagui.config';
export default function StackLayout() {
  return (
		<>
			<SessionProvider>
				<TamaguiProvider config={config}>
					<Theme name="dark">
						<Stack
							screenOptions={{
								contentStyle: { backgroundColor: "#151515" },
								headerStyle: {
									backgroundColor: '#151515',
								},
									headerTintColor: '#fff',
									headerTitleStyle: {
									fontWeight: 'bold',
								},
							}}
						>
							<Stack.Screen
								name="index"
								options={{ headerTitle: "Home" }}
							/>
							<Stack.Screen
								name="modal"
								options={{
								// Set the presentation mode to modal for our modal route.
								headerTitle: "Login or Sign Up",
								presentation: 'modal',
								}}
							/>
						</Stack>
					</Theme>
				</TamaguiProvider>
			</SessionProvider>
		</>
	);
}
