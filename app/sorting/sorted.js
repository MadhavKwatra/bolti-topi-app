import { View, Text, Image, Animated, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { LANGUAGE, getHouseMessages } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SortedScreen(whatsThis) {
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

    // return () => {
    //   second
    // }
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
    ? LANGUAGE.english.housesDetails[sortedHouse]
    : {};
  const houseMessagesToShow = sortedHouse
    ? getHouseMessages("english", sortedHouse)
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
            style={{ width: 300, height: 300, marginBottom: 20 }}
          />
          <Animated.Text style={{ fontSize: 18, color: "#D9BF8F" }}>
            {typedText}
          </Animated.Text>
        </>
      ) : (
        <View>
          <Text style={{ fontSize: 20 }}>
            You haven't been sorted to the house , Go to Home to sort yourself.
          </Text>
          <Link href="/">Home</Link>
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
});
