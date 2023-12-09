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
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			>
				{/* <Stack.Screen name="index" options={{ headerTitle: "Review Home" }} />

	 */}
				

				{/* modal" | "transparentModal" | "containedModal" | "containedTransparentModal" | "fullScreenModal" | "formSheet" | "card"  */}
			</Stack>
					
		</>
	);
}
