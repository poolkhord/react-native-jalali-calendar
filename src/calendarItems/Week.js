import React, { memo, useCallback } from "react";
import { View, Text, StyleSheet, I18nManager } from "react-native";
import starkString from "starkstring";
import { colors } from "../assets";
import { Day } from "./day";
import { StoreCalendar } from "../store";
import moment from "moment-jalaali";
import { StoreSelect, select } from "../storeSelect";

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
    const dispatch = StoreSelect.useDispatch();
    const { months } = StoreCalendar.useState();
    const { year, month } = months[monthIndex];

    let m = moment(`${year} ${month} 1`, "jYYYY jMM jD");
    const monthDaysLength = moment.jDaysInMonth(year, month - 1);

    const monthStartWeekDay = m.weekday();

    const onPress = useCallback(
      ({ day, weekday }) => {
        dispatch(select({ day, month, year, monthIndex, weekIndex, weekday }));
      },
      [dispatch, month, year, monthIndex, weekIndex],
    );

    return (
      <View style={[styles.mainContainer, style]}>
        {Array.from({ length: 7 }, (v, k) => k + 1).map((weekday, index) => {
          const day = weekIndex * 7 + weekday - monthStartWeekDay;
          const isInRange = day <= monthDaysLength && day > 0;

          const isSelected =
            isInRange &&
            selected?.month === month &&
            selected?.year === year &&
            selected?.day === day;

          let selectable = false;

          if (currentYear < year) {
            selectable = true;
          } else if (currentYear > year) {
            selectable = false;
          } else if (month > currentMonth) {
            selectable = true;
          } else if (month === currentMonth && day >= currentDay) {
            selectable = true;
          }
          return (
            <Day
              key={String(index)}
              selectable={selectable}
              weekday={weekday}
              isSelected={isSelected}
              isInRange={isInRange}
              day={day}
              onPress={onPress}
            />
          );
        })}
      </View>
    );
  },
);

export const WeekNames = memo(() => {
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
});

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
