import { Text } from "tamagui";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
export default function Page() {
    const router = useRouter();

	return (
		<>
			<Pressable onPress={() => router.push("/reviews/create")}>
				<Text>Edit</Text>
			</Pressable>
		</>
	);
}
