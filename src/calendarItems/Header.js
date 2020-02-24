import React, { memo } from "react";
import { Text, View, StyleSheet } from "react-native";
import starkString from "starkstring";

import { colors } from "../assets";

const Header = memo(({ style, month, year }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}> {month} </Text>
      <Text style={styles.title}>
        {starkString(year)
          .persianNumber()
          .toString()}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 18,
  },
  title: {
    color: colors.onBackground,
    fontSize: 20,
    fontFamily: "IRANYekanMobileFN",
  },
});

export default Header;
