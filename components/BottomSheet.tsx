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
import { useCallback, useMemo, useRef, useEffect  } from "react";

// tamagui components
import { Button, Text } from 'tamagui'
import LoginForm from "./LoginForm";



export default function BottomSheet() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "90%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    handlePresentModalPress();
  }, []); 

  return (
          <BottomSheetModalProvider>
            <View>

              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
              >
                <View style={styles.contentContainer}>
                  <LoginForm/>
                </View>
              </BottomSheetModal>
            </View>
          </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});