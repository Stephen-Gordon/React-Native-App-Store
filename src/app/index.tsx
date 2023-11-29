
// tamagui config
/* import '@tamagui/core/reset.css' */
import { TamaguiProvider, ScrollView, YStack } from 'tamagui'
import config from '../../tamagui.config'
// tamagui components
import { Button, Text, Theme } from 'tamagui'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link } from 'expo-router';
//components
import Apps from "../components/Apps"
import { useEffect } from 'react'
import { useRouter } from 'expo-router';
import { useSession } from '../contexts/AuthContext';
import { Pressable } from 'react-native';

export default function Page() {

    const { session, signOut, getUser } = useSession();
	const router = useRouter()
	const user = getUser();
	console.log(user)

	useEffect(() => {
		if(!session){

			// have to use set timeout becuase the app has to be rendered first 
			setTimeout(() => {
				router.push('/modal')
			}, 300)
		}
	}, [])
	

  return (
		<>
			<TamaguiProvider config={config}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<Theme name="dark">
						<ScrollView bg="$background">
							<Text
								color="$white"
								fontSize={20}
								hoverStyle={{
									color: "$colorHover",
								}}
							>
								App Store
							</Text>
							<Link href="/modal">Present modal</Link>

							{!session ? (
								<></>
							) : (
								<>
									
									{user.full_name}
									<Apps />
								</>
							)}
						</ScrollView>
					</Theme>
				</GestureHandlerRootView>
			</TamaguiProvider>
		</>
	);
}
