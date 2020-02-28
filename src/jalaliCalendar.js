import React, { useRef, memo, useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment-jalaali";
import { NavigateBar } from "./calendarItems";
import CalendarComponent from "./CalendarComponent";
import { colors } from "./assets";
import { ViewPage } from "./pager";
import { StoreCalendar, reducerTypes, addToSelectedYear } from "./store";
import { Provider } from "./storeModule";
import { StoreSelect } from "./storeSelect";

const Calendar = memo(({ onSelect }) => {
  const viewPager = useRef();
  const providerRef = useRef();

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

  const scrollIndex = useRef(Number(currentMoment.format("jM")));

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
        providerRef.current.dispatch(addToSelectedYear(1));
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
        providerRef.current.dispatch(addToSelectedYear(-1));
        viewPager.current.pageToIndex(12, false);
      }, 300);
    }
  };

  const dispatchListener = useCallback(
    ({ type, payload: { selected } = {} }) => {
      type === reducerTypes.SELECT && onSelect?.(selected);
    },
    [onSelect],
  );

  return (
    <Provider ref={providerRef} store={StoreCalendar}>
      <View style={styles.container}>
        <Provider dispatchListener={dispatchListener} store={StoreSelect}>
          <ViewPage
            ref={viewPager}
            initialIndex={scrollIndex.current}
            height={306}
          >
            {Array.from({ length: 14 }, (v, k) => k).map(index => {
              return (
                <CalendarComponent
                  key={index}
                  index={index}
                  currentMonth={currentMonth}
                  currentYear={currentYear}
                  currentDay={currentDay}
                />
              );
            })}
          </ViewPage>
        </Provider>
        <NavigateBar
          onRightPress={onNextMonth}
          onLeftPress={onPreviousMonth}
          canGoBack={true}
        />
      </View>
    </Provider>
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
