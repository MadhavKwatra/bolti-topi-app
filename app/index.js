import { Link } from "expo-router";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LANGUAGE } from "../constants";
import HouseDetails from "../components/HouseDetails";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../store/language";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WelcomeScreen() {
  const selectedLanguage = useContext(LanguageContext).language;
  const { housesDetails, title, message } = LANGUAGE[selectedLanguage];

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
  console.log("lang", selectedLanguage, housesDetails, title, message);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#171726" }}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: 30,
            marginBottom: 20,
            fontWeight: "600",
            fontStyle: "italic",
          },
        ]}
      >
        {title}
      </Text>
      <Text style={[styles.text, { fontSize: 20, fontWeight: "600" }]}>
        {message}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        {["gryffindor", "ravenclaw"].map((house) => (
          <HouseDetails key={house} houseData={housesDetails[house]} />
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
          marginTop: 10,
        }}
      >
        {["hufflepuff", "slytherin"].map((house) => (
          <HouseDetails key={house} houseData={housesDetails[house]} />
        ))}
      </View>
      {!sortedHouse && (
        <Link style={styles.button} href="/sorting">
          <Text style={styles.buttonText}>Sort Yourself ✨</Text>
        </Link>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#D9BF8F",
  },
  button: {
    backgroundColor: "#6A1B9A", // Deep purple color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
