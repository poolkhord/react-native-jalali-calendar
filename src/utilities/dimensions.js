import { Dimensions } from "react-native";
export const dimensions = {
  get width() {
    return Dimensions.get("window").width;
  },
  get height() {
    return Dimensions.get("window").height;
  },
  get scale() {
    return Dimensions.get("window").scale;
  },
  get fontScale() {
    return Dimensions.get("window").fontScale;
  },
};
