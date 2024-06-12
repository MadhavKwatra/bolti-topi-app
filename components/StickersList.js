import { useState } from "react";
import { StyleSheet, FlatList, Image, Platform, Pressable } from "react-native";

export default function StickersList({ onSelect, onCloseModal }) {
  const [stickers] = useState([
    require("../assets/images/congrats.png"),
    require("../assets/images/congratulations.png"),
    require("../assets/images/congrats-1.png"),
    require("../assets/images/congrats-2.png"),
    require("../assets/images/gryffindor-crest.png"),
    require("../assets/images/ravenclaw-crest.png"),
    require("../assets/images/ravenclaw-crest-1.png"),
    require("../assets/images/ravenclaw-crest-2.png"),
    require("../assets/images/hufflepuff-crest.png"),
    require("../assets/images/hufflepuff-crest-1.png"),
    require("../assets/images/slytherin-crest.png"),
    require("../assets/images/hogwarts-crest.png"),
    require("../assets/images/sorting-hat.png"),
    require("../assets/images/sorting-hat-1.png"),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={stickers}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}
        >
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
