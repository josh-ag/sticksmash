import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button } from "./Components/Button";
import { ImageViewer } from "./Components/imageView";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { IconButton } from "./Components/iconButton";
import { CircleButton } from "./Components/circleButton";
import { EmojiPicker } from "./Components/emojiPicker";
import { EmojiList } from "./Components/emojiList";
import { EmojiSticker } from "./Components/emojiSticker";
const placeholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    console.log("[Result] Picking image:", result);
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }

    if (result.canceled) {
      console.debug("[Cancelled] Picking cancelled:", result);
    } else {
      console.log("You do not select any image");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };
  //@handle adding of sticker
  const onAddSticker = () => {
    //do something
    setIsModalVisible(true);
  };
  //@handle saving of image
  const onSaveImageAsync = async () => {
    //do something
  };
  //@handle closing of modal
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer imageSource={placeholderImage} />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>

        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton
                icon="save-alt"
                label="Save"
                onPress={onSaveImageAsync}
              />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button
              theme="primary"
              label="Choose a photo"
              onPress={pickImageAsync}
            />
            <Button
              label="Use this photo"
              onPress={() => setShowAppOptions(true)}
            />
          </View>
        )}

        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onCloseModal={onModalClose} onSelect={setPickedEmoji} />
        </EmojiPicker>
        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },

  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },

  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },

  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },

  footerContainer: {},
});
