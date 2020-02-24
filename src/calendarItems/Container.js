import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

const Container = memo(({ children, onPreviousMonth, onNextMonth, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
});

const styles = StyleSheet.create({
  container: {
    width: 306,
    height: 327,
  },
});

export default Container;
