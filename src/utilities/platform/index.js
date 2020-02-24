import { Platform as RNPlatform } from "react-native";
import os from "./os";

/**
 * @typedef {'ios' | 'android' | 'desktop' | 'pwa' | 'web'} PlatformOSType
 */

/**
 * @template T
 * @param {{ [platform in PlatformOSType | 'default']?: T }} specifics
 * @return {T}
 */
function select(specifics) {
  return os.OS in specifics ? specifics.android : specifics.default;
}

export const Platform = {
  ...RNPlatform,
  isDesktop: false,
  isPwa: false,
  isWeb: false,
  isNative: false,
  ...os,
  select,
};
