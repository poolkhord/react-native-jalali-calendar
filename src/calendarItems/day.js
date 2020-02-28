import React, { memo, useCallback } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import starkString from "starkstring";
import { colors } from "../assets";
import { StoreCalendar } from "../store";

import moment from "moment-jalaali";
import { StoreSelect, select } from "../storeSelect";

export const Day = memo(
  ({
    monthIndex,
    weekIndex,
    weekday,
    currentYear,
    currentMonth,
    currentDay,
    selected,
  }) => {
    const dispatch = StoreSelect.useDispatch();
    const { months } = StoreCalendar.useState();
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
      isInRange &&
        dispatch(select({ day, month, year, monthIndex, weekIndex, weekday }));
    }, [isInRange, day, dispatch, month, year, monthIndex, weekIndex, weekday]);

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
