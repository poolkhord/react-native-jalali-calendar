import React, { memo } from "react";
import { View, StyleSheet, I18nManager } from "react-native";
import Week, { WeekNames } from "./Week";
import { StoreSelect } from "../storeSelect";

const Month = memo(
  ({ index: monthIndex, style, currentMonth, currentYear, currentDay }) => {
    const { selected } = StoreSelect.useState();
    return (
      <View style={[styles.daysContainer, style]}>
        <WeekNames />
        {Array.from({ length: 5 }, (v, k) => k).map(weekIndex => {
          return (
            <Week
              key={String(weekIndex)}
              weekIndex={weekIndex}
              monthIndex={monthIndex}
              currentMonth={currentMonth}
              currentYear={currentYear}
              currentDay={currentDay}
              {...(selected?.monthIndex === monthIndex &&
                selected?.weekIndex === weekIndex && { selected })}
            />
          );
        })}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  daysContainer: {
    paddingHorizontal: 30,
  },
});

export default Month;
