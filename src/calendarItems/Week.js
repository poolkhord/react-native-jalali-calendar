import React, { memo, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  I18nManager,
} from "react-native";
import starkString from "starkstring";
import { colors } from "../assets";
import { Store, select } from "../store";

import moment from "moment-jalaali";

const Week = memo(
  ({ weekIndex, monthIndex, style, currentMonth, currentYear, currentDay }) => {
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
            />
          );
        })}
      </View>
    );
  },
);

const Day = memo(
  ({
    monthIndex,
    weekIndex,
    weekday,
    currentYear,
    currentMonth,
    currentDay,
  }) => {
    const dispatch = Store.useDispatch();
    const { months, selected } = Store.useState();
    const { year, month } = months[monthIndex];

    let m = moment(`${year} ${month} 1`, "jYYYY jMM jD");
    const monthDaysLength = moment.jDaysInMonth(year, month - 1);
    const monthStartWeekDay = m.weekday();

    const day = weekIndex * 7 + weekday - monthStartWeekDay;
    const isInRange = day <= monthDaysLength && day > 0;

    const isSelected =
      isInRange &&
      selected?.month === month &&
      selected?.year === year &&
      selected?.day === day;

    const specialStyle = getDayInfo(
      isSelected,
      year,
      month,
      isInRange && day,
      currentYear,
      currentMonth,
      currentDay,
    );

    const onPress = useCallback(() => {
      isInRange && dispatch(select({ day, month, year }));
    }, [isInRange, day, dispatch, month, year]);

    return (
      <TouchableOpacity
        style={[styles.dayContainer, isSelected && styles.selectedDay]}
        activeOpacity={0.7}
        onPress={onPress}
      >
        {isInRange && (
          <Text style={[styles.day, styles[specialStyle]]}>
            {starkString(day)
              .persianNumber()
              .toString()}
          </Text>
        )}
      </TouchableOpacity>
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

const getDayInfo = (
  isSelected,
  year,
  month,
  day,
  currentYear,
  currentMonth,
  currentDay,
) => {
  let selectableDays = false;

  if (currentYear < year) {
    selectableDays = true;
  } else if (currentYear > year) {
    selectableDays = false;
  } else if (month > currentMonth) {
    selectableDays = true;
  } else if (month === currentMonth && day >= currentDay) {
    selectableDays = true;
  }

  if (isSelected) return "selectedDayText";

  if (selectableDays) return "selectableDays";

  return "previousDays";
};

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
  selectedDay: {
    borderRadius: 19,
    backgroundColor: colors.primary,
  },
  day: {
    fontSize: 16,
    fontFamily: "IRANYekanMobileFN",
  },
  weekdayText: {
    color: colors.weekItems,
  },
  previousDays: {
    color: colors.previousDays,
  },
  selectableDays: {
    color: colors.onBackground,
  },
  selectedDayText: {
    color: colors.onPrimary,
  },
});

export default Week;
