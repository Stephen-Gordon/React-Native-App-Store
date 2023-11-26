
// tamagui config
/* import '@tamagui/core/reset.css' */
import { TamaguiProvider, ScrollView } from 'tamagui'
import config from '../tamagui.config'
// tamagui components
import { Button, Text, Theme } from 'tamagui'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link } from 'expo-router';
//components
import Apps from "../components/Apps"

import { SheetDemo } from '../components/Sheet';
import { useSession } from '../contexts/AuthContext';

export default function Page() {

    const { session, signOut } = useSession();


  return (
    <>
    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <Theme >
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
          { session }

          {(!session) ? <SheetDemo/> : (
            <>
              <Apps/> 
            </>
          )}

            
            
        
      </ScrollView>
      </Theme>
      
      </GestureHandlerRootView>
    </TamaguiProvider>
       

    </>
  )
}
