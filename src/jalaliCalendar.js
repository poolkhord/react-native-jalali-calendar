import React, { useState, useRef, memo, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment-jalaali";
import { NavigateBar } from "./calendarItems";
import CalendarComponent from "./CalendarComponent";
import { colors } from "./assets";
import { ViewPage } from "./pager";

const createMonthsList = currentYear => {
  return Array.from({ length: 14 }, (v, i) => {
    let month = 13 - i;
    let year = currentYear;

    if (month === 13) {
      month = 1;
      year = currentYear + 1;
    } else if (month === 0) {
      month = 12;
      year = currentYear - 1;
    }

    return {
      month,
      year,
    };
  }).reverse();
};

const Calendar = memo(({ navigation }) => {
  const {
    currentMoment,
    currentMonth,
    currentYear,
    currentDay,
  } = useMemo(() => {
    const current = moment();
    return {
      currentMoment: current,
      currentMonth: Number(current.format("jM")),
      currentYear: Number(current.format("jYYYY")),
      currentDay: Number(current.format("jD")),
    };
  }, []);

  const viewPager = useRef();
  const [selectedYear, setSelectedYear] = useState(
    Number(currentMoment.format("jYYYY")),
  );
  const scrollIndex = useRef(Number(currentMoment.format("jM")));
  const months = createMonthsList(selectedYear);

  const gotNext = index => {
    scrollIndex.current = index;
    viewPager.current.pageToIndex(index, true);
  };

  const onNextMonth = () => {
    const newIndex = scrollIndex.current + 1;
    if (newIndex <= 13) {
      gotNext(newIndex);
    }

    if (newIndex >= 13) {
      setTimeout(() => {
        scrollIndex.current = 1;
        setSelectedYear(selectedYear + 1);
        viewPager.current.pageToIndex(1, false);
      }, 300);
    }
  };

  const onPreviousMonth = () => {
    const newIndex = scrollIndex.current - 1;
    if (newIndex >= 0) {
      gotNext(newIndex);
    }

    if (newIndex <= 0) {
      setTimeout(() => {
        scrollIndex.current = 12;
        setSelectedYear(selectedYear - 1);
        viewPager.current.pageToIndex(12, false);
      }, 300);
    }
  };

  return (
    <View style={styles.container}>
      <ViewPage ref={viewPager} initialIndex={scrollIndex.current} height={306}>
        {months.map((item, index) => {
          return (
            <CalendarComponent
              key={String(index)}
              month={item.month}
              year={item.year}
              currentMonth={currentMonth}
              currentYear={currentYear}
              currentDay={currentDay}
            />
          );
        })}
      </ViewPage>
      <NavigateBar
        onRightPress={onNextMonth}
        onLeftPress={onPreviousMonth}
        canGoBack={true}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    width: 306,
    height: 330,
    borderRadius: 4,
    overflow: "hidden",
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 15,
    elevation: 5,
  },
});

export default Calendar;
