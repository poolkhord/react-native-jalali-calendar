import React, { memo, useCallback } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import starkString from "starkstring";
import { colors } from "../assets";

export const Day = memo(
  ({ weekday, selectable, isSelected, isInRange, day, onPress }) => {
    const specialStyle = getDayInfo(isSelected, selectable);

    const _onPress = useCallback(() => {
      isInRange && onPress({ day, weekday });
    }, [isInRange, onPress, day, weekday]);

    return (
      <TouchableOpacity
        style={[styles.dayContainer, isSelected && styles.selectedDay]}
        activeOpacity={0.7}
        onPress={_onPress}
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

const getDayInfo = (isSelected, selectable) => {
  if (isSelected) return "selectedDayText";

  if (selectable) return "selectableDays";

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
