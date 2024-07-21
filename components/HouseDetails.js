import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const HouseDetails = ({ houseData }) => {
  const { image, title, description } = houseData;

  return (
    <View style={{ alignItems: "center", marginVertical: 10 }}>
      <Image
        source={image}
        style={{ width: 150, height: 150, margin: 10, resizeMode: "contain" }}
      />
      <Text
        style={[
          { fontStyle: "italic", fontWeight: "700", fontSize: 20 },
          styles.text,
        ]}
      >
        {title}
      </Text>
      <Text style={[styles.text, { fontWeight: "500", fontSize: 15 }]}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#D9BF8F",
  },
});

export default HouseDetails;
