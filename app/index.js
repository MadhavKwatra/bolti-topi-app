import { Link } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { LANGUAGE } from "../constants";
import HouseDetails from "../components/HouseDetails";
import { useState } from "react";

export default function WelcomeScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("english"); // Initial language
  const { housesDetails, title, message } = LANGUAGE[selectedLanguage];
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
  };
  console.log("lang", selectedLanguage, housesDetails, title, message);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{ fontSize: 30, marginBottom: 20, paddingHorizontal: "200px" }}
      >
        {title}
      </Text>
      <Text>{message}</Text>
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
      <Link style={styles.button} href="/sorting">
        <Text style={styles.buttonText}>Sort Yourself ✨</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
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
