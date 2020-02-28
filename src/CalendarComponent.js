import React, { memo } from "react";
import { Container, Header, Month } from "./calendarItems";
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern" });

const CalendarItems = memo(
  ({ index, currentMonth, currentYear, currentDay }) => {
    return (
      <Container>
        <Header index={index} />
        <Month
          index={index}
          currentMonth={currentMonth}
          currentYear={currentYear}
          currentDay={currentDay}
        />
      </Container>
    );
  },
);

export default CalendarItems;
