import React, { memo, useMemo } from "react";
import { View, StyleSheet, I18nManager } from "react-native";
import Week from "./Week";
import moment from "moment-jalaali";
import { Store } from "../store";

function arrySplit(arr) {
  const a = [...arr];
  let result = a.splice(0, 7);
  return a.length > 0 ? [result, ...arrySplit(a)] : [result];
}

function arrayPadStart(arr, length) {
  let notInThisMonthDays = Array.from({ length }, (v, i) => null);

  return [...notInThisMonthDays, ...arr];
}

const Month = memo(
  ({ index, style, currentMonth, currentYear, currentDay }) => {
    const { months } = Store.useState();
    const { month, year } = months[index];

    const items = useMemo(() => {
      let m = moment(`${year} ${month} 1`, "jYYYY jMM jD");

      const monthDaysLength = moment.jDaysInMonth(year, month - 1);
      const monthStartWeekDay = m.weekday();
      const MonthDays = Array.from(
        { length: monthDaysLength },
        (v, i) => i + 1,
      );
      const days = arrayPadStart(MonthDays, monthStartWeekDay);
      return arrySplit(days);
    }, [month, year]);

    return (
      <View style={[styles.daysContainer, style]}>
        <WeekNames />
        {items.map((day, index1) => {
          return (
            <Week
              key={String(index1)}
              days={day}
              month={month}
              year={year}
              currentMonth={currentMonth}
              currentYear={currentYear}
              currentDay={currentDay}
            />
          );
        })}
      </View>
    );
  },
);

const WeekNames = memo(
  () => {
    return new Array(["ش", "ی", "د", "س", "چ", "پ", "ج"]).map(day => {
      return <Week style={styles.weekdaysContainer} key={day} days={day} />;
    });
  },
  () => true,
);

const styles = StyleSheet.create({
  weekdaysContainer: {
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
    alignItems: "center",
    marginBottom: 20,
  },
  daysContainer: {
    paddingHorizontal: 30,
  },
});

export default Month;
