import React, { memo } from "react";
import { View, Text, StyleSheet, I18nManager } from "react-native";
import starkString from "starkstring";
import { colors } from "../assets";
import { Day } from "./day";

const Week = memo(
  ({
    weekIndex,
    monthIndex,
    selected,
    style,
    currentMonth,
    currentYear,
    currentDay,
  }) => {
    return (
      <View style={[styles.mainContainer, style]}>
        {Array.from({ length: 7 }, (v, k) => k + 1).map((weekday, index) => {
          return (
            <Day
              key={String(index)}
              weekIndex={weekIndex}
              monthIndex={monthIndex}
              weekday={weekday}
              currentYear={currentYear}
              currentMonth={currentMonth}
              currentDay={currentDay}
              {...(selected?.monthIndex === monthIndex &&
                selected?.weekIndex === weekIndex &&
                selected?.weekday === weekday && { selected })}
            />
          );
        })}
      </View>
    );
  },
);

export const WeekNames = memo(
  () => {
    return (
      <View style={[styles.mainContainer]}>
        {["ش", "ی", "د", "س", "چ", "پ", "ج"].map(day => {
          return (
            <View key={day} style={styles.dayContainer}>
              <Text style={[styles.day, styles.weekdayText]}>
                {starkString(day)
                  .persianNumber()
                  .toString()}
              </Text>
            </View>
          );
        })}
      </View>
    );
  },
  () => true,
);

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
  },
  dayContainer: {
    flex: 1,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  day: {
    fontSize: 16,
    fontFamily: "IRANYekanMobileFN",
  },
  weekdayText: {
    color: colors.weekItems,
  },
});

export default Week;
