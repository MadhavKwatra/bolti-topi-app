import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useFonts } from "expo-font";
import { useCallback, useContext, useEffect, useState } from "react";
import { SplashScreen } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NameModal from "../components/NameModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome6 } from "@expo/vector-icons";
import { LanguageContext, LanguageProvider } from "../store/language";
SplashScreen.preventAutoHideAsync();

function customDrawerContent(props) {
  const { language, setLanguage } = useContext(LanguageContext);
  console.log("language", language);
  const languageToSet = language === "english" ? "hinglish" : "english";
  const changeLanguageLabelText = `Switch to ${languageToSet.toUpperCase()}`;

  const handleFeedbackPress = () => {
    const subject = 'Feedback for Your Bolti Topi App'; 
    const email = 'madhav.kwat@gmail.com'; 
  
    const mailtoUrl = `mailto:${email}?subject=${subject}`;
  
    Linking.openURL(mailtoUrl)
      .catch((err) => console.error('Error opening email app:', err));
  };
  

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
        <DrawerItem
          label="Set Your Name"
          onPress={onClickSetName}
          labelStyle={{ marginLeft: -20 }}
          icon={({ size, color }) => {
            return <Ionicons name="create-outline" size={size} color={color} />;
          }}
        />
        <DrawerItem
          label={changeLanguageLabelText}
          onPress={() => {
            setLanguage(languageToSet);
          }}
          labelStyle={{ marginLeft: -20 }}
          icon={({ size, color }) => {
            return (
              <Ionicons name="language-outline" size={size} color={color} />
              );
              }}
              />
        <DrawerItem
          label="Share Feedback"
          labelStyle={{ marginLeft: -20 }}
          icon={({ size, color }) => {
            return (
              <Ionicons name="help-circle-outline" size={size} color={color} />
            );
          }}
          onPress={handleFeedbackPress}
        />
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
        <Text style={{ fontWeight: "bold" }}>
          👋 {studentName ? studentName : "Stranger"}!
        </Text>
        <Text style={{ fontWeight: "bold", textAlignVertical: "center" }}>
          Made with <Ionicons name="heart" size={18} style={{ color: "red" }} />
          (And some{" "}
          <Ionicons name="color-wand" size={18} style={{ color: "purple" }} /> i
          believe) By
          <TouchableOpacity
            onPress={() => Linking.openURL("https://github.com/MadhavKwatra")}
            style={{ textDecorationLine: "underline" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "thin" }}>Madhav</Text>
          </TouchableOpacity>
        </Text>
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
    <LanguageProvider>
      <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Drawer
          drawerContent={customDrawerContent}
          screenOptions={{
            // drawerHideStatusBarOnOpen: true,
            // Doesn't look good on my phone
            drawerActiveBackgroundColor: "#171726",
            drawerActiveTintColor: "#fff",
            drawerType: "slide",
            headerStyle: { backgroundColor: "#171726" },
            headerTintColor: "#D9BF8F",
            drawerLabelStyle: { marginLeft: -20 },
            drawerStyle: { backgroundColor: "#dde3fe" },
          }}
        >
          <Drawer.Screen
            name="index" //name of the page and must match the url from root
            options={{
              drawerLabel: "Home",

              title: "home",
              headerTitle: "Home",
              drawerIcon: ({ size, color }) => {
                return (
                  <Ionicons name="home-outline" size={size} color={color} />
                );
              },
            }}
          />
          <Drawer.Screen
            name="sorting/index"
            options={{
              drawerLabel: "Sorting",

              title: "sorting",
              headerTitle: "Sorting",
              drawerItemStyle: { height: 0 },
            }}
          />
          <Drawer.Screen
            name="sorting/sorted"
            options={{
              drawerLabel: "Sorted",
              title: "Sorted",
              headerTitle: "Sorted",
              drawerIcon: ({ size, color }) => {
                return (
                  <FontAwesome6 name="hat-wizard" size={size} color={color} />
                );
              },
            }}
          />
          <Drawer.Screen
            name="edit/index"
            options={{
              drawerLabel: "Edit Photo",
              title: "editPhoto",
              headerTitle: "Edit Photo",
              drawerIcon: ({ size, color }) => {
                return (
                  <Ionicons name="image-outline" size={size} color={color} />
                );
              },
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </LanguageProvider>
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
