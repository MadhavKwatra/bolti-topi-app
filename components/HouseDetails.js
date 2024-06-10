import { View, Text, Image } from "react-native";
import React from "react";

const HouseDetails = ({ houseData }) => {
  const { image, title, description } = houseData;

  return (
    <View style={{ alignItems: "center", marginVertical: 10 }}>
      <Image source={image} style={{ width: 100, height: 100, margin: 10 }} />
      <Text>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
};

export default HouseDetails;
