
// tamagui config
/* import '@tamagui/core/reset.css' */
import { TamaguiProvider, ScrollView } from 'tamagui'
import config from '../tamagui.config'
// tamagui components
import { Button, Text, Theme } from 'tamagui'
import { GestureHandlerRootView } from "react-native-gesture-handler";

//components
import Apps from "../components/Apps"
import BottomSheet from '../components/BottomSheet'

export default function Page() {
  return (
    <>
    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <Theme name="dark">
        
        <BottomSheet/>
        <ScrollView>
            <Text
            color="$white"
            fontSize={20}
            hoverStyle={{
                color: '$colorHover',
            }}
        >
        App Store
        </Text>
        <Apps/>
      </ScrollView>
      </Theme>
      
      </GestureHandlerRootView>
    </TamaguiProvider>
       

    </>
  )
}
