import moment from "moment-jalaali";
import { createMonthsList } from "../utils";

const currentYear = Number(moment().format("jYYYY"));

export default {
  selectedYear: currentYear,
  months: createMonthsList(currentYear),
};
