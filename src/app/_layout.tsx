import { Stack } from 'expo-router';
import { SessionProvider } from '../contexts/AuthContext'; 
import { TamaguiProvider, Theme } from 'tamagui';
import config from '../../tamagui.config';
export default function Layout() {
  return (
		<>
			<SessionProvider>
				<TamaguiProvider config={config}>
					<Theme name="dark">
						<Stack
							screenOptions={{
								headerStyle: {
									backgroundColor: "$background",
								},
								headerTintColor: "$background",
								headerTitleStyle: {
									fontWeight: "bold",
								},
							}}
						/>
					</Theme>
				</TamaguiProvider>
			</SessionProvider>
		</>
	);
}
