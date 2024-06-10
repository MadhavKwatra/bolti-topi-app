import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, router } from "expo-router";
import { LANGUAGE } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
const sortingHatImage = require("../../assets/images/sorting-hat.png");
export default function SortingScreen() {
  const houseDetails = LANGUAGE.hinglish.housesDetails;
  // Make this global or something

  const thinkingMessages = [
    "The Sorting Hat is pondering your fate...",
    "Hmm, a difficult choice...",
    "Let's see where you belong...",
  ];
  const [thinkingMessageIndex, setThinkingMessageIndex] = useState(0);
  const thinkingMessageToShow = thinkingMessages[thinkingMessageIndex];

  const storeHouseName = async (houseName) => {
    try {
      await AsyncStorage.setItem("houseName", houseName);
    } catch (error) {
      console.error("Error storing houseName:", error);
    }
  };

  useEffect(() => {
    const messageTimeout = setTimeout(() => {
      // Navigate to sorted Screen after person got selected after a delay
      if (thinkingMessageIndex === thinkingMessages.length - 1) {
        // Nothing Magical , Just a Random Function 😑
        // const randomIndex = (Math.random() * 10) / 4;

        const randomIndex = Math.floor(
          Math.random() * Object.keys(houseDetails).length
        );
        console.log(randomIndex, "RandomeIndex for sorting");
        const houseSortedIn = Object.keys(houseDetails)[randomIndex];
        storeHouseName(houseSortedIn)
          .then(() => {
            router.navigate({
              pathname: "sorting/sorted",
              params: {
                house: houseSortedIn,
              },
            });
          })
          .catch((err) => {
            console.log("Some error occurred", err);
          });
      }
      setThinkingMessageIndex(thinkingMessageIndex + 1);
    }, 500);

    return () => clearTimeout(messageTimeout); // Cleanup on unmount
  });
  return (
    <View>
      <Image
        source={sortingHatImage}
        style={{ width: 100, height: 100, marginBottom: 20 }}
      />
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>
        {thinkingMessageToShow}
      </Text>
    </View>
  );
}
