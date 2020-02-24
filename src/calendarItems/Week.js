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

function arrayPadEnd(arr, maxLength, fill) {
  const a = [...arr];

  a.length < maxLength && a.push(fill);

  return a.length < maxLength ? arrayPadEnd(a, maxLength, fill) : a;
}

const Week = memo(
  ({
    days,
    style,
    onChangeSelectedDay,
    selected,
    month,
    year,
    currentMonth,
    currentYear,
    currentDay,
  }) => {
    const daysPadded = arrayPadEnd(days, 7, null);

    return (
      <View style={[styles.mainContainer, style]}>
        {daysPadded.map((day, index) => {
          return (
            <Day
              key={String(day || `i${index}`)}
              selected={selected}
              year={year}
              month={month}
              day={day}
              currentYear={currentYear}
              currentMonth={currentMonth}
              currentDay={currentDay}
              onChangeSelectedDay={onChangeSelectedDay}
            />
          );
        })}
      </View>
    );
  },
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

const Day = memo(
  ({
    selected,
    year,
    month,
    day,
    currentYear,
    currentMonth,
    currentDay,
    onChangeSelectedDay,
  }) => {
    const { specialStyle, isSelected, selectableDays } = getDayInfo(
      selected,
      year,
      month,
      day,
      currentYear,
      currentMonth,
      currentDay,
    );

    const onPress = useCallback(() => {
      selectableDays && onChangeSelectedDay(day);
    }, [selectableDays, onChangeSelectedDay, day]);

    return (
      <TouchableOpacity
        style={[styles.dayContainer, isSelected && styles.selectedDay]}
        activeOpacity={0.7}
        onPress={onPress}
      >
        {day && (
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
  selected,
  year,
  month,
  day,
  currentYear,
  currentMonth,
  currentDay,
) => {
  let selectableDays = false;
  const isSelected = selected === day;
  const weekdays = typeof day === "string";

  if (currentYear < year) {
    selectableDays = true;
  } else if (currentYear > year) {
    selectableDays = false;
  } else if (month > currentMonth) {
    selectableDays = true;
  } else if (month === currentMonth && day >= currentDay) {
    selectableDays = true;
  }

  const specialStyle = weekdays
    ? "weekdayText"
    : selectableDays
    ? isSelected
      ? "selectedDayText"
      : "selectableDays"
    : "previousDays";

  return {
    specialStyle,
    isSelected,
    selectableDays,
  };
};

export default Week;
