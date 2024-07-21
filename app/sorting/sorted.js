import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { LANGUAGE, getHouseMessages } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LanguageContext } from "../../store/language";

export default function SortedScreen() {
  const selectedLanguage = useContext(LanguageContext).language;
  const [sortedHouse, setSortedHouse] = useState("");

  useEffect(() => {
    // Retrieve user house from AsyncStorage on component mount
    const fetchHouseNameFromStorage = async () => {
      try {
        const houseName = await AsyncStorage.getItem("houseName");
        console.log("NAME STORED", houseName);
        houseName && setSortedHouse(houseName);
      } catch (error) {
        console.error("Error retrieving houseName:", error);
      }
    };

    fetchHouseNameFromStorage();
  }, []);
  const { house } = useLocalSearchParams();
  useEffect(() => {
    if (house) {
      setSortedHouse(house);
    }
  }, [house]);

  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const houseDetails = sortedHouse
    ? LANGUAGE[selectedLanguage].housesDetails[sortedHouse]
    : null;
  const houseMessagesToShow = sortedHouse
    ? getHouseMessages(selectedLanguage, sortedHouse)
    : [];
  console.log("And this is house?", useLocalSearchParams());

  useEffect(() => {
    if (sortedHouse) {
      // A typewriter effect
      if (currentIndex < houseMessagesToShow.length) {
        const timeout = setTimeout(() => {
          setTypedText(
            (prevTypedText) => prevTypedText + houseMessagesToShow[currentIndex]
          );
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 50);

        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, houseMessagesToShow, sortedHouse]);
  // if (!fontsLoaded) {
  //   return (
  //     <AppLoading />
  //   );
  // }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#171726",
        paddingHorizontal: 10,
      }}
    >
      <View style={styles.welcomeContainer}>
        <Text style={[styles.welcomeText, { fontFamily: "Harry-P" }]}>
          Welcome to Hogwarts School of Witchcraft and Wizardry!
        </Text>
      </View>
      {sortedHouse && houseDetails ? (
        <>
          <Image
            source={houseDetails.image}
            style={{
              width: 300,
              height: 300,
              marginBottom: 20,
              resizeMode: "contain",
            }}
          />
          <Animated.Text
            style={{ fontSize: 20, color: "#D9BF8F", fontWeight: "600" }}
          >
            {typedText}
          </Animated.Text>
          <Link href="/edit" asChild>
            <Pressable style={styles.createPhotoButton}>
              <Text style={styles.createPhotoButtonText}>
                Create a photo for this
              </Text>
            </Pressable>
          </Link>
        </>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 20, color: "#D9BF8F" }}>
            You haven't been sorted to the house , Go to Home to sort yourself.
          </Text>
          <Link
            href="/"
            style={{
              marginTop: 10,
              padding: 20,
              borderWidth: 2,
              borderColor: "#D9BF8F",
              color: "#D9BF8F",
              fontSize: 15,
            }}
          >
            Home
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 20, // Add some space below
  },
  welcomeText: {
    fontSize: 30, // Large font size
    // fontWeight: "bold", // Bold text for emphasis
    color: "#D9BF8F", // Adjust color as needed (Hogwarts blue)
    textShadowColor: "rgba(0, 0, 0, 0.2)", // Optional: Subtle text shadow
    textShadowOffset: { width: 1, height: 1 }, // Offset for the shadow
  },
  createPhotoButton: {
    backgroundColor: "#38B2AC",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  createPhotoButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // White text
  },
});
