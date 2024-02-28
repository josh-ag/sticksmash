import { StatusBar } from "expo-status-bar";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";
import * as MediaLibrary from "expo-media-library";
import { Button } from "./Components/Button";
import { ImageViewer } from "./Components/imageView";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import { IconButton } from "./Components/iconButton";
import { CircleButton } from "./Components/circleButton";
import { EmojiPicker } from "./Components/emojiPicker";
import { EmojiList } from "./Components/emojiList";
import { EmojiSticker } from "./Components/emojiSticker";
const placeholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [status, requestPermissions] = MediaLibrary.usePermissions();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  const imageRef = useRef();
  if (status !== null) {
    requestPermissions();
  }
  // console.debug("[PermissionStatus] ", status);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    console.log("[ResultPicked] image:", result);
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
    if (Platform.OS !== "web") {
      try {
        const localUrl = await captureRef(imageRef, {
          quality: 1,
          width: 440,
        });

        //@save to local
        await MediaLibrary.saveToLibraryAsync(localUrl);

        if (localUrl) {
          Alert.alert("Saved!");
        }
      } catch (error) {
        //@handle error
        console.error("[ScreenShotError] ", error);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        const link = document.createElement("a");
        link.download = "StickerMash.jpg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        //@handle error
        console.error("[ScreenShotError] ", e);
      }
    }
  };
  //@handle closing of modal
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer imageSource={placeholderImage} />
            {pickedEmoji && (
              <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
            )}
          </View>
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
        <StatusBar style="light" />
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
