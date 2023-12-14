import { Stack, useRouter } from "expo-router";


export default function StackLayout() {
	const router = useRouter();
	return (
		<>

			<Stack
				screenOptions={{
					contentStyle: { backgroundColor: "#151515" },
					headerStyle: {
						backgroundColor: "#151515",
					},
					headerShown: false,
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			>

			</Stack>

		</>
	);
}
