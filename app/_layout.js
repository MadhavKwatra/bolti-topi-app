import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { SplashScreen } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NameModal from "../components/NameModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { debounce } from "lodash";
SplashScreen.preventAutoHideAsync();

function customDrawerContent(props) {
  const debouncedNameChange = useCallback(
    debounce((text) => {
      // onChangeSName(text);
      // Should use some other request to debounce
    }, 500),
    []
  );

  useEffect(() => {
    // Retrieve user studentName from AsyncStorage on component mount
    const fetchNameFromStorage = async () => {
      try {
        const nameFromLocalStorage = await AsyncStorage.getItem("studentName");
        console.log("NAME STORED", nameFromLocalStorage);
        !nameFromLocalStorage && setIsModalVisible(true);
        nameFromLocalStorage && onChangeSName(nameFromLocalStorage);
      } catch (error) {
        console.error("Error retrieving studentName:", error);
      }
    };

    fetchNameFromStorage();
  }, []);

  const storeName = async () => {
    try {
      await AsyncStorage.setItem("studentName", studentName);
      onModalClose();
    } catch (error) {
      console.error("Error storing studentName:", error);
    }
  };

  const { top, bottom } = useSafeAreaInsets();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [studentName, onChangeSName] = useState("");
  console.log(studentName, "Student");
  const onClickSetName = () => {
    setIsModalVisible(true);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: "#dde3fe" }}
      >
        <DrawerItemList {...props} />
        <DrawerItem label="Set Your Name" onPress={onClickSetName} />
      </DrawerContentScrollView>
      <NameModal isVisible={isModalVisible} onClose={onModalClose}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeSName}
            value={studentName}
            autoComplete="name"
            autoFocus={true}
          />
          <Pressable style={styles.pressable} onPress={storeName}>
            <Text style={styles.title}>Update Name</Text>
          </Pressable>
        </View>
      </NameModal>
      <View
        style={{
          borderTopColor: "#dde3fe",
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,
        }}
      >
        <Text>Hi {studentName ? studentName : "Stranger"}!</Text>
        <Text>Made with Love(And some magic i believe) By Madhav</Text>
      </View>
    </View>
  );
}
export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    "Harry-P": require("../assets/fonts/Harry-P.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Drawer
        drawerContent={customDrawerContent}
        screenOptions={{
          // drawerHideStatusBarOnOpen: true,
          // Doesn't look good on my phone
          drawerActiveBackgroundColor: "#5363df",
          drawerActiveTintColor: "#fff",drawerType:"slide",
          headerStyle:{backgroundColor:"red"}
        }}
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "home",
            headerTitle: "Home",
            drawerIcon: ({ size, color }) => {
              return <Ionicons name="home-outline" size={size} color={color} />;
            },
          }}
        />
        <Drawer.Screen
          name="sorting/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Sorting",
            title: "sorting",
            headerTitle: "Home",

          }}
        />
        <Drawer.Screen
          name="sorting/sorted" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Sorted",
            title: "Sorted",
            headerTitle: "Home",
          }}
        />
        <Drawer.Screen
          name="edit/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Edit Photo",
            title: "editPhoto",
            headerTitle: "Edit Photo",
          }}
        />
        <Drawer.Screen
          name="feedback/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Feedback",
            title: "feedback",
            headerTitle: "Share your feedback",

          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 4,
    width: "80%",
    color: "#333333",
    fontSize: 24,
  },
  pressable: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 4,
    marginHorizontal: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
