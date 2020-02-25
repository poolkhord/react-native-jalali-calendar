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

function arrayPadEnd(arr, maxLength, fill) {
  const a = [...arr];

  a.length < maxLength && a.push(fill);

  return a.length < maxLength ? arrayPadEnd(a, maxLength, fill) : a;
}

const Week = memo(
  ({ days, style, month, year, currentMonth, currentYear, currentDay }) => {
    const [{ selected }] = Store.useStore();
    const daysPadded = arrayPadEnd(days, 7, null);

    return (
      <View style={[styles.mainContainer, style]}>
        {daysPadded.map((day, index) => {
          const isSelected =
            selected?.month === month &&
            selected?.year === year &&
            selected?.day === day;
          return (
            <Day
              key={String(day || `i${index}`)}
              isSelected={isSelected}
              year={year}
              month={month}
              day={day}
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
  ({ isSelected, year, month, day, currentYear, currentMonth, currentDay }) => {
    const { specialStyle } = getDayInfo(
      isSelected,
      year,
      month,
      day,
      currentYear,
      currentMonth,
      currentDay,
    );

    const onPress = useCallback(() => {
      Store.dispatch(select({ day, month, year }));
    }, [day, month, year]);

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
  isSelected,
  year,
  month,
  day,
  currentYear,
  currentMonth,
  currentDay,
) => {
  let selectableDays = false;
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

  function getStyle() {
    if (weekdays) return "weekdayText";
    if (isSelected) return "selectedDayText";

    if (selectableDays) return "selectableDays";

    return "previousDays";
  }

  const specialStyle = getStyle();

  return {
    specialStyle,
    isSelected,
    selectableDays,
  };
};

export default Week;
