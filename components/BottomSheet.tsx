import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
// React native
import {
  StyleSheet,
  View,
} from "react-native";

// modal
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

// React
import { useRef, useState } from "react";

// tamagui components
import { Button, Text } from 'tamagui'
import LoginForm from "./LoginForm";


export default function BottomSheet () {

    const [isOpen, setIsOpen] = useState(false);

    const bottomSheetModalRef = useRef(null);

    const snapPoints = ["25%", "48%", "75%"];

    function handlePresentModal() {
        bottomSheetModalRef.current?.present();
        setTimeout(() => {
        setIsOpen(true);
        }, 100);
    }

    return (
        <>
           
                <BottomSheetModalProvider>
                    <View
                    style={[
                        styles.container,
                        { backgroundColor: isOpen ? "gray" : "white" },
                    ]}
                    >
                    <Button  onPress={handlePresentModal} />
                    <Button>Lorem ipsum</Button>
                    <StatusBar style="auto" />
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        backgroundStyle={{ borderRadius: 50 }}
                        onDismiss={() => setIsOpen(false)}
                    >
                        <View style={styles.contentContainer}>
                        <Text
                            // can add theme values
                            color="$white"
                            // or just use direct values
                            fontSize={20}
                            hoverStyle={{
                            color: '$colorHover',
                            }}
                        >
                            Login
                        </Text>
                        <LoginForm/>

                        </View>
                    </BottomSheetModal>
                    </View>
                </BottomSheetModalProvider>
    
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  subtitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
});