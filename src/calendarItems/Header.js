import React, { memo } from "react";
import { Text, View, StyleSheet, I18nManager } from "react-native";
import starkString from "starkstring";
import { colors } from "../assets";
import { StoreCalendar } from "../store";
import moment from "moment-jalaali";

const Header = memo(({ index, style }) => {
  const { months } = StoreCalendar.useState();
  const { month, year } = months[index];
  let m = moment(`${year} ${month} 1`, "jYYYY jMM jD");

  const monthName = m.format("jMMMM");
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}> {monthName} </Text>
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
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
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
