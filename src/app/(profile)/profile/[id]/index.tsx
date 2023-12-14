import { Text } from "tamagui";
import { useLocalSearchParams } from "expo-router";

export default function Page() {

	const { id } = useLocalSearchParams();

	return (
		<>
			<Text>Profile</Text>
			<Text>{id}</Text>
		</>
	);
}