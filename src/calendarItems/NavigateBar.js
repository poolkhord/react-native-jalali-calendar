import React, { memo } from "react";
import { View, TouchableOpacity, StyleSheet, I18nManager } from "react-native";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import { colors } from "../assets";

const ArrowButton = memo(({ iconName, iconColor, onPress }) => (
  <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
    <Icon name={iconName} size={18} color={iconColor} />
  </TouchableOpacity>
));

export const NavigateBar = memo(({ style, onLeftPress, onRightPress }) => {
  return (
    <View style={[styles.arrowsContainer, style]}>
      <ArrowButton
        iconName={"arrow-right"}
        onPress={onLeftPress}
        iconColor={colors.arrows}
      />
      <ArrowButton
        iconName={"arrow-left"}
        onPress={onRightPress}
        iconColor={colors.arrows}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  arrowsContainer: {
    top: 16,
    left: 40,
    right: 40,
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
    position: "absolute",
    justifyContent: "space-between",
  },
});
