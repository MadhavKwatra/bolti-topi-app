import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ImageViewer from "../../components/ImageViewer";
import Button from "../../components/Button";
import * as ImagePicker from "expo-image-picker";
import domtoimage from "dom-to-image";
import { useEffect, useRef, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import CircleButton from "../../components/CircleButton";
import IconButton from "../../components/IconButton";
import EmojiPicker from "../../components/StickerPicker";
import StickersList from "../../components/StickersList";
import Sticker from "../../components/Sticker";
const PlaceHolderImages = [
  require("../../assets/images/avatar-1.jpg"),
  require("../../assets/images/avatar-2.jpg"),
  require("../../assets/images/avatar-3.jpg"),
  require("../../assets/images/avatar-4.jpg"),
];
const frameImage = require("../../assets/frames/gryffindor-frame.png");
export default function EditScreen() {
  const imageRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stickers, setStickers] = useState([]);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  console.log(status, "Permission status", imageRef);
  const randomPlaceHolderImageIndex = Math.floor(Math.random() * 4);
  const [randomPlaceHolderImage, setRandomPlaceHolderImage] = useState(
    PlaceHolderImages[randomPlaceHolderImageIndex]
  );
  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result, "The Image user selected");
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setStickers([]);
  };
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onStickerSelect = (sticker) => {
    setStickers((prevStickers) => [...prevStickers, sticker]);
    setIsModalVisible(false);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) alert("Saved 🤘!");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImageSource={randomPlaceHolderImage}
            selectedImage={selectedImage}
          />
          {stickers.length > 0 &&
            stickers.map((stickerSource, index) => (
              <Sticker
                key={index}
                imageSize={40}
                stickerSource={stickerSource}
              />
            ))}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton label={"Reset"} icon="refresh" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              label="Save"
              icon="save-alt"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View styles={styles.footerContainer}>
          <Button
            label="Choose a Photo"
            theme={"primary"}
            onPress={pickImageAsync}
          />
          <Button
            label="Use this Photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker onClose={onModalClose} isVisible={isModalVisible}>
        <StickersList onSelect={onStickerSelect} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    // justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
