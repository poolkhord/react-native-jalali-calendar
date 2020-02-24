import React, { memo } from "react";
import { Container, Header, Month } from "./calendarItems";
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern" });

const CalendarItems = memo(
  ({ month, year, currentMonth, currentYear, currentDay }) => {
    let m = moment(`${year} ${month} 1`, "jYYYY jMM jD");

    const monthName = m.format("jMMMM");

    return (
      <Container>
        <Header month={monthName} year={year} />
        <Month
          month={month}
          year={year}
          currentMonth={currentMonth}
          currentYear={currentYear}
          currentDay={currentDay}
        />
      </Container>
    );
  },
);

export default CalendarItems;
