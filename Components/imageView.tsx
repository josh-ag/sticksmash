import { Dimensions, Image, StyleSheet } from "react-native";

const { width } = Dimensions.get("screen");

export const ImageViewer = ({ imageSource }: { imageSource: any }) => {
  return <Image source={imageSource} style={styles.image} resizeMode="cover" />;
};

const styles = StyleSheet.create({
  image: {
    width,
    height: 480,
    borderRadius: 18,
  },
});
