import React, { memo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import { colors } from "../assets";

const ArrowButton = memo(({ iconName, iconColor, onPress }) => (
  <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
    <Icon name={iconName} size={18} color={iconColor} />
  </TouchableOpacity>
));

export const NavigateBar = memo(({ style, onPreviousMonth, onNextMonth }) => {
  return (
    <View style={[styles.arrowsContainer, style]}>
      <ArrowButton
        iconName="arrow-right"
        onPress={onPreviousMonth}
        iconColor={colors.arrows}
      />
      <ArrowButton
        iconName="arrow-left"
        onPress={onNextMonth}
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
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-between",
  },
});
