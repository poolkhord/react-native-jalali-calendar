import { Platform } from "react-native";
/**
 * @typedef {'ios' | 'android' | 'desktop' | 'pwa' | 'web'} PlatformOSType
 */

const OS = {
  /**@type {PlatformOSType} */
  OS: Platform.OS,
  isAndroid: Platform.OS === "android",
  isiOS: Platform.OS === "ios",
  isNative: true,
};

export default OS;
